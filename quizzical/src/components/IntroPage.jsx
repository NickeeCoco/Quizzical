import Button from "./Button"
import "./IntroPage.css"

function IntroPage(props) {
    return (
        <>
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">Test your knowledge with fun quizzes!</p>
            <Button text="Start quiz" handleClick={props.handleClick} />
        </>
    )
}

export default IntroPage