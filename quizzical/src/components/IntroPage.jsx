import "./IntroPage.css"

function IntroPage(props) {
    return (
        <>
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">Test your knowledge with fun quizzes!</p>
            <button onClick={props.handleClick}>Start quiz</button>
        </>
    )
}

export default IntroPage