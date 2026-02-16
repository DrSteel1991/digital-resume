import { useState } from 'react'
import type { Message, ResumeData } from '../types'

type AIAssistantProps = {
  resumeData: ResumeData
  suggestedQuestions: string[]
}

const createAssistantReply = (question: string, resumeData: ResumeData): string => {
  const q = question.toLowerCase()

  if (q.includes('about') || q.includes('summary') || q.includes('who')) {
    return resumeData.about
  }

  if (q.includes('experience') || q.includes('work') || q.includes('job')) {
    return resumeData.experiences
      .map(
        (item) =>
          `${item.role} at ${item.company} in ${item.location} (${item.period}). Key work: ${item.highlights.join(
            ' '
          )}`
      )
      .join(' ')
  }

  if (q.includes('project') || q.includes('built') || q.includes('portfolio')) {
    if (resumeData.projects.length === 0) {
      return 'No dedicated projects section is listed in this resume yet.'
    }

    return resumeData.projects
      .map((project) => `${project.name}: ${project.description}`)
      .join(' ')
  }

  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('tools')
  ) {
    return `Core skills include ${resumeData.skills.join(', ')}.`
  }

  if (q.includes('education') || q.includes('study') || q.includes('degree')) {
    return resumeData.education
      .map(
        (item) =>
          `${item.degree} from ${item.school}, ${item.location} (${item.period}).`
      )
      .join(' ')
  }

  if (q.includes('language') || q.includes('speak')) {
    return `${resumeData.name} speaks ${resumeData.languages.join(', ')}.`
  }

  if (q.includes('nationality')) {
    return `${resumeData.name}'s nationality is ${resumeData.nationality}.`
  }

  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('reach')
  ) {
    return `You can reach ${resumeData.name} at ${resumeData.contact}.`
  }

  if (q.includes('location') || q.includes('where')) {
    return `${resumeData.name} is based in Bsaba, Baabda, Lebanon.`
  }

  return `I can help with questions about ${resumeData.name}'s profile, experience, skills, education, languages, and contact details.`
}

function AIAssistant({ resumeData, suggestedQuestions }: AIAssistantProps) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Hi! I am ${resumeData.name}'s resume assistant. Ask me about experience, projects, skills, or contact info.`,
    },
  ])

  const askQuestion = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }

    const reply = createAssistantReply(trimmed, resumeData)
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: reply },
    ])
    setQuestion('')
  }

  const onSubmit: NonNullable<React.ComponentProps<'form'>['onSubmit']> = (
    event
  ) => {
    event.preventDefault()
    askQuestion(question)
  }

  return (
    <aside className="assistant">
      <h2>Resume Chat Assistant</h2>
      <p className="assistant-intro">
        Ask questions about the resume and get instant answers.
      </p>

      <div className="suggestions">
        {suggestedQuestions.map((sample) => (
          <button
            key={sample}
            type="button"
            className="suggestion-btn"
            onClick={() => askQuestion(sample)}
          >
            {sample}
          </button>
        ))}
      </div>

      <div className="chat-window" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`message message-${message.role}`}>
            <strong>{message.role === 'assistant' ? 'Assistant' : 'You'}:</strong>{' '}
            {message.text}
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={onSubmit}>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about experience, skills, or projects..."
          aria-label="Ask a question about the resume"
        />
        <button type="submit">Send</button>
      </form>
    </aside>
  )
}

export default AIAssistant
