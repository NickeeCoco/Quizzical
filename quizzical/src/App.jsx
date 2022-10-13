import { useState, useEffect } from 'react'

import IntroPage from "./components/IntroPage"
import QuizzPage from "./components/QuizzPage"

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
      {questions.length === 0 ? 
        <IntroPage handleClick={createNewQuiz} /> :
        <QuizzPage />
      }
    </main>
  )
}

export default App
