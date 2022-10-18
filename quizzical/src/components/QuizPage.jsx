import { useState, useEffect } from "react"
import {nanoid} from "nanoid"
import Answer from "./Answer"

import "./QuizPage.css"

function QuizPage(props) {
    const [isAnswersShown, setIsAnswersShow] = useState(false)

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
        setIsAnswersShow(true)
    }

    const questionElements = props.questions.map(item => {
        const {question, correct_answer, incorrect_answers} = item

        const wrongAnswers = incorrect_answers.map(item => generateAnswerObject(item, false))
        const answersArray = [generateAnswerObject(correct_answer, true), ...wrongAnswers]

        const [allAnswers, setAllAnswers] = useState(randomizeAnwsers(answersArray))

        function selectAnswer(id) {
            setAllAnswers(prevAnswers => prevAnswers.map(answer => {
                    return answer.id === id ? 
                        {...answer, isSelected: true} :
                        {...answer, isSelected: false}
                })
            )
        }

        // Fisher-Yates algorithm
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function randomizeAnwsers(answersArray) {
            
            // if true/false answers, arrange answers in the order True / False
            if(answersArray.length === 2) {                
                if(answersArray[0].text === "True") {
                    return [answersArray[0], answersArray[1]]
                } else {
                    return [answersArray[1], answersArray[0]]
                }
            }

            let currentIndex = answersArray.length
            let randomIndex

            while(currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--

                [answersArray[currentIndex], answersArray[randomIndex]] = [answersArray[randomIndex], answersArray[currentIndex]]
            }

            return answersArray
        }

        const answersElements = allAnswers.map(answer => 
            <Answer 
                key={answer.id} 
                answer={answer} 
                handleClick={() => selectAnswer(answer.id)} 
                showAnswer={isAnswersShown} />)

        return (<div className="question-container">
            <h2 className="question">{htmlDecode(question)}</h2>
            <div className="answers">
                {answersElements}
            </div>
        </div>)
    })

    

    return (<div className="quiz">
            {questionElements}
            <button onClick={checkAnswers}>Check answers</button>
        </div>)
}

export default QuizPage