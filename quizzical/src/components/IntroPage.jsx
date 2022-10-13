import Button from "./Button"
import "./IntroPage.css"

function IntroPage() {
    return (
        <>
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">Test your knowledge with fun quizzes!</p>
            <Button text="Start quiz" />
        </>
    )
}

export default IntroPage