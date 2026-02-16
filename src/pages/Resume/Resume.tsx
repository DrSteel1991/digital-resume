import type { ResumeData } from '../../modules/types'
import styles from './Resume.module.css'

type ResumeProps = {
  resumeData: ResumeData
}

function Resume({ resumeData }: ResumeProps) {
  return (
    <section className={styles.resume}>
      <header className={styles.resumeHeader}>
        <h1>{resumeData.name}</h1>
        <p className={styles.subtitle}>{resumeData.title}</p>
        <p className={styles.contact}>{resumeData.contact}</p>
        <p className={styles.contact}>
          Date of birth: {resumeData.dateOfBirth} | Nationality:{' '}
          {resumeData.nationality}
        </p>
      </header>

      <section className={styles.section}>
        <h2>About</h2>
        <p>{resumeData.about}</p>
      </section>

      <section className={styles.section}>
        <h2>Experience</h2>
        {resumeData.experiences.map((experience) => (
          <article className={styles.item} key={`${experience.company}-${experience.period}`}>
            <div className={styles.itemHeader}>
              <h3>
                {experience.role} - {experience.company}
              </h3>
              <span>
                {experience.period} | {experience.location}
              </span>
            </div>
            <ul>
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {resumeData.projects.length > 0 && (
        <section className={styles.section}>
          <h2>Projects</h2>
          {resumeData.projects.map((project) => (
            <article className={styles.item} key={project.name}>
              <div className={styles.itemHeader}>
                <h3>{project.name}</h3>
              </div>
              <p>{project.description}</p>
            </article>
          ))}
        </section>
      )}

      <section className={styles.section}>
        <h2>Skills</h2>
        <ul className={styles.skills}>
          {resumeData.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Education</h2>
        {resumeData.education.map((item) => (
          <article className={styles.item} key={`${item.school}-${item.period}`}>
            <div className={styles.itemHeader}>
              <h3>{item.degree}</h3>
              <span>
                {item.period} | {item.location}
              </span>
            </div>
            <p>{item.school}</p>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2>Languages</h2>
        <ul className={styles.skills}>
          {resumeData.languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </section>
    </section>
  )
}

export default Resume
