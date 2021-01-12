import {useQuestions} from "./useQuestions";

function useQuestion(qid, type, region) {
    const questions = useQuestions(type, region);
    // Convert both qid to string
    return questions.find(question => `${question.qid}` ===`${qid}`);
}

export {
    useQuestion
}