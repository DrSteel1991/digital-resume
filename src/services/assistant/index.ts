import type { AssistantClient, AssistantConfig } from '../../modules/types'
import { createHttpAssistantClient } from './httpAssistantClient'
import { createMockAssistantClient } from './mockAssistantClient'

export const createAssistantClient = (config: AssistantConfig): AssistantClient => {
  if (config.mode === 'http') {
    return createHttpAssistantClient({
      endpoint: config.endpoint,
      requestTimeoutMs: config.requestTimeoutMs,
    })
  }

  return createMockAssistantClient(config.mockDelayMs)
}
