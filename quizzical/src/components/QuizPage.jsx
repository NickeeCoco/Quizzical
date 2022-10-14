import Button from "./Button"

import "./QuizPage.css"

function QuizPage(props) {

    // This function was found on stack overflow
    // https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
    function htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html")
        return doc.documentElement.textContent
    }

    const questionElements = props.questions.map(question => {
        return (<div className="question-container">
            <h2 className="question">{htmlDecode(question.question)}</h2>
            <div className="answers">
                <p className="answer">{question.correct_answer}</p>
                {question.incorrect_answers.map(answer => <p className="answer">{answer}</p>)}
            </div>
        </div>)
    })

    return (<div className="quiz">
            {questionElements}
            <Button text="Check answers" />
        </div>)
}

export default QuizPage