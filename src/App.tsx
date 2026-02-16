import './App.css'
import { assistantConfig, resumeData, suggestedQuestions } from './modules/constants'
import AIAssistant from './pages/AIAssistant/AIAssistant'
import Resume from './pages/Resume/Resume'

function App() {
  return (
    <main className="page">
      <Resume resumeData={resumeData} />
      <AIAssistant
        resumeData={resumeData}
        suggestedQuestions={suggestedQuestions}
        assistantConfig={assistantConfig}
      />
    </main>
  )
}

export default App
