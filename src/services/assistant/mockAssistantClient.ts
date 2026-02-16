import type { AssistantClient } from '../../modules/types'
import { createRuleBasedReply } from './ruleBasedReply'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createMockAssistantClient = (mockDelayMs: number): AssistantClient => ({
  ask: async ({ question, resumeData }) => {
    await delay(mockDelayMs)
    return createRuleBasedReply(question, resumeData)
  },
})
