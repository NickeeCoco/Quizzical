import "./Answer.css"

function Answer(props) {
    const {answer, handleClick, showAnswer} = props

    let backgroundColor = () => {
        if(showAnswer && answer.isCorrect) {
            return "#94D7A2"
        } else if(showAnswer && !answer.isCorrect && answer.isSelected) {
            return "#F8BCBC"
        } else if(answer.isSelected) {
            return "#D6DBF5"
        } else {
            return "white"
        }
    }

    let borderColor = () => {
        if(showAnswer && answer.isCorrect) {
            return "#94D7A2"
        } else if(showAnswer && !answer.isCorrect && answer.isSelected) {
            return "#F8BCBC"
        } else if(answer.isSelected) {
            return "#D6DBF5"
        } else {
            return "#4D5B9E"
        }
    }

    const styles = {
        backgroundColor: backgroundColor(),
        borderColor: borderColor(),
        opacity: showAnswer && !answer.isCorrect ? ".4" : "1"
    }

    return <div className="answer" style={styles} onClick={!showAnswer ? handleClick : undefined}>{answer.text}</div>
}

export default Answer