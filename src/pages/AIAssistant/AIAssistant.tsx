import { useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import styles from './AIAssistant.module.css'
import type { AssistantConfig, Message, ResumeData } from '../../modules/types'
import { createAssistantClient } from '../../services/assistant'

type AIAssistantProps = {
  resumeData: ResumeData
  suggestedQuestions: string[]
  assistantConfig: AssistantConfig
}

const renderAssistantMessage = (text: string) => {
  const paragraphs = text.split('\n\n')

  return paragraphs.map((paragraph, paragraphIndex) => {
    const lines = paragraph
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    if (lines.length === 0) {
      return null
    }

    const bulletLines = lines.filter((line) => line.startsWith('- '))
    if (bulletLines.length === lines.length) {
      return (
        <ul key={`list-${paragraphIndex}`} className={styles.messageList}>
          {bulletLines.map((line, lineIndex) => (
            <li key={`list-item-${paragraphIndex}-${lineIndex}`}>{line.slice(2)}</li>
          ))}
        </ul>
      )
    }

    const firstBulletIndex = lines.findIndex((line) => line.startsWith('- '))
    if (firstBulletIndex > 0) {
      const heading = lines.slice(0, firstBulletIndex).join(' ')
      const bullets = lines.slice(firstBulletIndex)
      return (
        <div key={`mixed-${paragraphIndex}`} className={styles.messageBlock}>
          <p className={styles.messageParagraph}>{heading}</p>
          <ul className={styles.messageList}>
            {bullets.map((line, lineIndex) => (
              <li key={`mixed-item-${paragraphIndex}-${lineIndex}`}>{line.slice(2)}</li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <p key={`paragraph-${paragraphIndex}`} className={styles.messageParagraph}>
        {lines.join(' ')}
      </p>
    )
  })
}

function AIAssistant({
  resumeData,
  suggestedQuestions,
  assistantConfig,
}: AIAssistantProps) {
  const assistantClient = useMemo(
    () => createAssistantClient(assistantConfig),
    [assistantConfig]
  )
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [failedQuestion, setFailedQuestion] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const chatWindowRef = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Hi! I am ${resumeData.name}'s resume assistant. Ask me about experience, projects, skills, or contact info.`,
    },
  ])

  const sendQuestion = async (value: string, options?: { appendUserMessage?: boolean }) => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) {
      return
    }

    const shouldAppendUser = options?.appendUserMessage ?? true
    if (shouldAppendUser) {
      setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    }

    setErrorMessage(null)
    setFailedQuestion(null)
    setQuestion('')
    setIsLoading(true)

    try {
      const reply = await assistantClient.ask({ question: trimmed, resumeData })
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch (error) {
      const fallbackError =
        error instanceof Error
          ? error.message
          : 'Assistant request failed. Please try again.'
      setErrorMessage(fallbackError)
      setFailedQuestion(trimmed)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit: NonNullable<ComponentProps<'form'>['onSubmit']> = (event) => {
    event.preventDefault()
    void sendQuestion(question)
  }

  const onRetry = () => {
    if (!failedQuestion) {
      return
    }

    void sendQuestion(failedQuestion, { appendUserMessage: false })
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'assistant') {
      return
    }

    const chatWindow = chatWindowRef.current
    if (!chatWindow) {
      return
    }

    chatWindow.scrollTo({
      top: chatWindow.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus()
    }
  }, [isLoading])

  return (
    <aside className={styles.assistant}>
      <h2>Resume Chat Assistant</h2>
      <p className={styles.assistantIntro}>
        Ask questions about the resume and get instant answers.
      </p>

      <div className={styles.suggestions}>
        {suggestedQuestions.map((sample) => (
          <button
            key={sample}
            type="button"
            className={styles.suggestionBtn}
            onClick={() => {
              void sendQuestion(sample)
            }}
            disabled={isLoading}
          >
            {sample}
          </button>
        ))}
      </div>

      {isLoading && <p className={styles.assistantStatus}>Assistant is thinking...</p>}
      {errorMessage && (
        <div className={styles.assistantError} role="alert">
          <span>{errorMessage}</span>
          {failedQuestion && (
            <button type="button" className={styles.retryBtn} onClick={onRetry}>
              Retry
            </button>
          )}
        </div>
      )}

      <div ref={chatWindowRef} className={styles.chatWindow} aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`${styles.message} ${
              message.role === 'assistant' ? styles.messageAssistant : styles.messageUser
            }`}
          >
            <strong>{message.role === 'assistant' ? 'Assistant' : 'You'}:</strong>{' '}
            {message.role === 'assistant' ? renderAssistantMessage(message.text) : message.text}
          </div>
        ))}
      </div>

      <form className={styles.chatForm} onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about experience, skills, or projects..."
          aria-label="Ask a question about the resume"
        />
        <button className={styles.sendButton} type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </aside>
  )
}

export default AIAssistant
