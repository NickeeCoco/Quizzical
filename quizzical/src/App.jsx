import { useState } from 'react'

import IntroPage from "./components/IntroPage"
import QuizPage from "./components/QuizPage"

import './App.css'

function App() {
  const [questions, setQuestions] = useState([])

  function createNewQuiz() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(response => response.json())
      .then(data => setQuestions(data.results))
  }

  return (
    <main>
      {questions.length > 0 ? 
        <QuizPage questions={questions} handleClick={createNewQuiz} /> :
        <IntroPage handleClick={createNewQuiz} />
      }
    </main>
  )
}

export default App
