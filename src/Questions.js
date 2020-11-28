import generalQuestions from "./resources/data/questions/general.yml";
import regionalQuestions from "./resources/data/questions/regional.yml";
import generalAnswers from "./resources/data/answers/general.yml";
import regionalAnswers from "./resources/data/answers/regional.yml";

const QUESTION_TYPES = {
    GENERAL: 'general',
    REGIONAL: 'regional'
};

generalQuestions.forEach(question => question.type = QUESTION_TYPES.GENERAL);

for (const [region, questions] of Object.entries(regionalQuestions)) {
    questions.forEach(question => {
       question.type = QUESTION_TYPES.REGIONAL;
       question.region = region;
    });
}

function getAllGeneralQuestions() {
    return generalQuestions;
}

function getAllRegionalQuestions(region) {
    return regionalQuestions[region];
}

function getRandomGeneralQuestionsSlice(size) {
    return randomSlice(generalQuestions, size);
}

function getRandomRegionalQuestionsSlice(region, size) {
    return randomSlice(regionalQuestions[region], size);
}

function isGeneralQuestion(question) {
    return question.type === QUESTION_TYPES.GENERAL;
}

function isRegionalQuestion(question) {
    return question.type === QUESTION_TYPES.REGIONAL;
}

function randomSlice(arr, maxSize) {
    const sliceSize = Math.min(arr.length, maxSize);
    const randomNumbers = [];
    let count = 0;
    do {
        const randomNumber = Math.ceil(Math.random() * (arr.length - 1));
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
            count = ++count;
        }
    } while (count < sliceSize);

    return randomNumbers.map(r => arr[r]);
}

function isRightAnswer(question, answerId) {
    if (isGeneralQuestion(question)) {
        return answerId === generalAnswers[question.id];
    }
    
    if (isRegionalQuestion(question)) {
        return answerId === regionalAnswers[question.region][question.id];
    }
    
    return false;
}

export {
    getAllGeneralQuestions,
    getAllRegionalQuestions,
    getRandomGeneralQuestionsSlice,
    getRandomRegionalQuestionsSlice,
    isGeneralQuestion,
    isRegionalQuestion,
    isRightAnswer,
    QUESTION_TYPES
}