import { useState } from "react"
import {nanoid} from "nanoid"
import Answer from "./Answer"

import "./QuizPage.css"

function QuizPage(props) {
    // This function was found on stack overflow, used to remove HTML codes from questions & answers
    // https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
    function htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html")
        return doc.documentElement.textContent
    }

    function generateAnswerObject(text, isCorrect) {
        return {
            text: htmlDecode(text),
            isCorrect,
            isSelected: false,
            id: nanoid()
        }
    }

    function checkAnswers() {

    }

    const questionElements = props.questions.map(item => {
        const {question, correct_answer, incorrect_answers} = item

        const wrongAnswers = incorrect_answers.map(item => generateAnswerObject(item, false))
        const [allAnswers, setAllAnswers] = useState([generateAnswerObject(correct_answer, true), ...wrongAnswers])

        function selectAnswer(id) {
            setAllAnswers(prevAnswers => prevAnswers.map(answer => {
                    return answer.id === id ? 
                        {...answer, isSelected: true} :
                        {...answer, isSelected: false}
                })
            )
        }

        const answersElements = allAnswers.map(answer => 
            <Answer key={answer.id} answer={answer} handleClick={() => selectAnswer(answer.id)} />)

        return (<div className="question-container">
            <h2 className="question">{htmlDecode(question)}</h2>
            <div className="answers">
                {answersElements}
            </div>
        </div>)
    })

    

    return (<div className="quiz">
            {questionElements}
            <button>Check answers</button>
        </div>)
}

export default QuizPage