import { useEffect } from "react"
import "./Answer.css"

function Answer(props) {
    const {answer, handleClick, showAnswers, setFinalScore } = props

    let backgroundColor = () => {
        if(showAnswers && answer.isCorrect) {
            return "#94D7A2"
        } else if(showAnswers && !answer.isCorrect && answer.isSelected) {
            return "#F8BCBC"
        } else if(answer.isSelected) {
            return "#D6DBF5"
        } else {
            return "white"
        }
    }

    let borderColor = () => {
        if(showAnswers && answer.isCorrect) {
            return "#94D7A2"
        } else if(showAnswers && !answer.isCorrect && answer.isSelected) {
            return "#F8BCBC"
        } else if(answer.isSelected) {
            return "#D6DBF5"
        } else {
            return "#4D5B9E"
        }
    }

    useEffect(() => {
        if(!showAnswers) {
            setFinalScore(0)
        } else if(answer.isCorrect && answer.isSelected) {
            setFinalScore(prevScore => prevScore + 1)
        }
    }, [showAnswers])

    const styles = {
        backgroundColor: backgroundColor(),
        borderColor: borderColor(),
        opacity: showAnswers && !answer.isCorrect ? ".4" : "1"
    }

    return <div className="answer" style={styles} onClick={!showAnswers ? handleClick : undefined}>{answer.text}</div>
}

export default Answer