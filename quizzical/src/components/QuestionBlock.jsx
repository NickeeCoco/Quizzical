import { useState, useEffect } from "react"
import Answer from "./Answer"
import "./QuestionBlock.css"
import { nanoid } from "nanoid"


function Question(props) {
    const { question, isAnswersShown, setFinalScore } = props

    const [allAnswers, setAllAnswers] = useState(randomizeAnswers(generateAnswersArray()))

    // This function was found on stack overflow, used to remove HTML codes from questions & answers
    // https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
    function htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html")
        return doc.documentElement.textContent
    }

    // create answer object, containing additional data
    function generateAnswerObject(text, isCorrect) {
        return {
            text: htmlDecode(text),
            isCorrect,
            isSelected: false,
            id: nanoid()
        }
    }

    function generateAnswersArray() {
        const wrongAnswers = question.incorrect_answers.map(item => generateAnswerObject(item, false))

        return [generateAnswerObject(question.correct_answer, true), ...wrongAnswers]
    }

    // Fisher-Yates algorithm
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function randomizeAnswers(answersArray) {

        // if true/false answers, arrange answers in the order True / False
        if (answersArray.length === 2) {
            if (answersArray[0].text === "True") {
                return [answersArray[0], answersArray[1]]
            } else {
                return [answersArray[1], answersArray[0]]
            }
        }

        let currentIndex = answersArray.length
        let randomIndex

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [answersArray[currentIndex], answersArray[randomIndex]] = [answersArray[randomIndex], answersArray[currentIndex]]
        }

        return answersArray
    }

    // generate new answers when the question changes
    useEffect(() => {
        setAllAnswers(randomizeAnswers(generateAnswersArray()))
    }, [question])

    function selectAnswer(id) {
        setAllAnswers(prevAnswers => prevAnswers.map(answer => {
            return answer.id === id ? 
                {...answer, isSelected: true} :
                {...answer, isSelected: false}
        }))
    }

    const answersElements = allAnswers.map(answer =>
        <Answer
            key={answer.id}
            answer={answer}
            handleClick={() => selectAnswer(answer.id)}
            showAnswers={isAnswersShown}
            setFinalScore={setFinalScore} />)

    return (
        <div className="question-container">
            <h2 className="question">{htmlDecode(question.question)}</h2>
            <div className="answers">
                {answersElements}
            </div>
        </div>
    )
}

export default Question