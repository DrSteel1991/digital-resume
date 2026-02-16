import type { ResumeData } from '../types'

type ResumeProps = {
  resumeData: ResumeData
}

function Resume({ resumeData }: ResumeProps) {
  return (
    <section className="resume">
      <header className="resume-header">
        <h1>{resumeData.name}</h1>
        <p className="subtitle">{resumeData.title}</p>
        <p className="contact">{resumeData.contact}</p>
        <p className="contact">
          Date of birth: {resumeData.dateOfBirth} | Nationality:{' '}
          {resumeData.nationality}
        </p>
      </header>

      <section>
        <h2>About</h2>
        <p>{resumeData.about}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {resumeData.experiences.map((experience) => (
          <article className="item" key={`${experience.company}-${experience.period}`}>
            <div className="item-header">
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
        <section>
          <h2>Projects</h2>
          {resumeData.projects.map((project) => (
            <article className="item" key={project.name}>
              <div className="item-header">
                <h3>{project.name}</h3>
              </div>
              <p>{project.description}</p>
            </article>
          ))}
        </section>
      )}

      <section>
        <h2>Skills</h2>
        <ul className="skills">
          {resumeData.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        {resumeData.education.map((item) => (
          <article className="item" key={`${item.school}-${item.period}`}>
            <div className="item-header">
              <h3>{item.degree}</h3>
              <span>
                {item.period} | {item.location}
              </span>
            </div>
            <p>{item.school}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Languages</h2>
        <ul className="skills">
          {resumeData.languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </section>
    </section>
  )
}

export default Resume
