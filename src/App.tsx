import './App.css'
import { resumeData, suggestedQuestions } from './constants'
import AIAssistant from './pages/AIAssistant'
import Resume from './pages/Resume'

function App() {
  return (
    <main className="page">
      <Resume resumeData={resumeData} />
      <AIAssistant resumeData={resumeData} suggestedQuestions={suggestedQuestions} />
    </main>
  )
}

export default App
