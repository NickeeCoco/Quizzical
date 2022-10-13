import { useState, useEffect } from 'react'

import IntroPage from "./components/IntroPage"

import './App.css'

function App() {
  const [questions, setQuestions] = useState([])

  function createNewQuiz() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(response => response.json())
      .then(data => setQuestions(data.results))
  }

  console.log(questions)

  return (
    <main>
      <IntroPage handleClick={createNewQuiz} />
    </main>
  )
}

export default App
