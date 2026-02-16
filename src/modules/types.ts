export type Message = {
  role: 'assistant' | 'user'
  text: string
}

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  highlights: string[]
}

export type Project = {
  name: string
  description: string
}

export type Education = {
  degree: string
  school: string
  period: string
  location: string
}

export type ResumeData = {
  name: string
  title: string
  contact: string
  dateOfBirth: string
  nationality: string
  about: string
  experiences: Experience[]
  projects: Project[]
  skills: string[]
  education: Education[]
  languages: string[]
}

export type AssistantMode = 'mock' | 'http'

export type AssistantConfig = {
  mode: AssistantMode
  endpoint: string
  requestTimeoutMs: number
  mockDelayMs: number
}

export type AssistantAskParams = {
  question: string
  resumeData: ResumeData
}

export type AssistantClient = {
  ask: (params: AssistantAskParams) => Promise<string>
}
