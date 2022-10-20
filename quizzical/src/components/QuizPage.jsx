import { useState } from "react"
import QuestionBlock from "./QuestionBlock"

import "./QuizPage.css"

function QuizPage(props) {
    const [isAnswersShown, setIsAnswersShown] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    console.log(finalScore)

    function newGame() {
        props.handleClick()
        setIsAnswersShown(false)
    }

    function checkAnswers() {
        setIsAnswersShown(true)
    }

    const questionElements = props.questions.map(item => {
        return <QuestionBlock 
                    question={item} 
                    key={item.question}
                    isAnswersShown={isAnswersShown}
                    setFinalScore={setFinalScore} />
    })


    return (<div className="quiz">
            {questionElements}
            <div className="results">
                { isAnswersShown && <p>You scored {finalScore}/5 correct answers</p>}
                { isAnswersShown ? 
                    <button onClick={newGame}>Play again</button> :
                    <button onClick={checkAnswers}>Check answers</button> }
            </div>
        </div>)
}

export default QuizPage