import "./Answer.css"

function Answer(props) {
    const {answer, handleClick} = props
    return <div className={`answer ${answer.isSelected ? "selected" : ""}`} onClick={handleClick}>{answer.text}</div>
}

export default Answer