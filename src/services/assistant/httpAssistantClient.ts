import type { AssistantClient } from '../../modules/types'

type HttpClientOptions = {
  endpoint: string
  requestTimeoutMs: number
}

type ChatApiResponse = {
  answer?: string
}

export const createHttpAssistantClient = ({
  endpoint,
  requestTimeoutMs,
}: HttpClientOptions): AssistantClient => ({
  ask: async ({ question, resumeData }) => {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({ question, resumeData }),
      })

      if (!response.ok) {
        throw new Error(`Assistant API request failed (${response.status})`)
      }

      const data = (await response.json()) as ChatApiResponse
      if (!data.answer) {
        throw new Error('Assistant API did not return an answer.')
      }

      return data.answer
    } finally {
      window.clearTimeout(timeoutId)
    }
  },
})
