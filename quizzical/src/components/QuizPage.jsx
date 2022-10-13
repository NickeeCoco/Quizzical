function QuizPage(props) {
    const questionElements = props.questions.map(question => {
        return (<div className="question">
            <h2>{question.question}</h2>
            <p>{question.correct_answer}</p>
        </div>)
    })

    return <div className="quiz">{questionElements}</div>
}

export default QuizPage