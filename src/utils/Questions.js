function isRightAnswer(question, answerId) {
    return question.metadata.rightAnswer === answerId;
}

export {
    isRightAnswer
}