import type { ResumeData } from '../../modules/types'

export const createRuleBasedReply = (question: string, resumeData: ResumeData): string => {
  const q = question.toLowerCase()
  const resumeNameTokens = resumeData.name
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(Boolean)

  const mentionedNameMatch = q.match(
    /\b(?:about|for|of)\s+([a-z][a-z'-]{1,})(?:'s)?\b/
  )
  if (
    mentionedNameMatch &&
    !resumeNameTokens.includes(mentionedNameMatch[1]) &&
    mentionedNameMatch[1] !== 'me'
  ) {
    return `I only have resume details for ${resumeData.name}. Ask me about ${resumeData.name}'s experience, skills, education, or contact details.`
  }

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
