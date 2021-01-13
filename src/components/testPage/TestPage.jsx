import React, {useState, useMemo} from 'react'
import ScoreBoard from "./ScoreBoard";
import Card, {interactionModes} from "../cards/Card";
import Timer from "./Timer";
import {isRightAnswer} from "../../utils/Questions";
import {getRegionPrettyName} from "../../hooks/useRegions";


function TestPage(props) {

    const {
        region,
        generalQuestions,
        regionalQuestions,
    } = props;


    const timer = useMemo(() => new Timer(3600, timer => setRemainingTime(timer.timerRemainingSec)), []);
    
    const [randomGeneralQuestions, setRandomGeneralQuestions] = useState(randomSlice(generalQuestions, 30));
    const [randomRegionalQuestions, setRandomRegionalQuestions] = useState(randomSlice(regionalQuestions, 3));
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [revealAll, setRevealAll] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(timer.isRunning);
    const [remainingTime, setRemainingTime] = useState(timer.originalSetTimeSec);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    function startClock() {
        timer.start(timer => setIsTimerRunning(timer.isRunning));
    }

    function pauseClock() {
        timer.pause(timer => setIsTimerRunning(timer.isRunning));
    }

    function resetClock() {
        timer.reset(timer => {
            setIsTimerRunning(timer.isRunning);
            setRemainingTime(timer.timerRemainingSec);
        });
        setRevealAll(false);
        setIsTestFinished(false);
    }

    function handleFinishTest() {
        pauseClock();
        setIsTestFinished(true);
        setRevealAll(true);
        setCorrectAnswersCount(countCorrectAnswers());
    }

    function handleClearTest() {
        resetClock();
        setAnsweredQuestionsCount(0);
        setAnsweredQuestions({});
    }

    function handleAnswerClick(question, answerId) {
        const selectedAnswer = getSelectedAnswer(question);
        const wasSelected = selectedAnswer !== undefined;
        const isDeselected = selectedAnswer === answerId;
        answeredQuestions[buildAnsweredQuestionKey(question)] = {
            selectedAnswer: isDeselected ? undefined : answerId,
            question: question
        };
        if (isDeselected) {
            setAnsweredQuestionsCount(answeredQuestionsCount - 1);
        } else {
            setAnsweredQuestionsCount(wasSelected ? answeredQuestionsCount : answeredQuestionsCount + 1);
        }

        setAnsweredQuestions(prevState => {
            return {...prevState, ...answeredQuestions}
        });
    }

    function newTestHandler() {
        setAnsweredQuestionsCount(0);
        setAnsweredQuestions({});
        setRevealAll(false);
        setRandomGeneralQuestions(randomSlice(generalQuestions, 30));
        setRandomRegionalQuestions(randomSlice(regionalQuestions, 3));
        resetClock();
    }

    function getSelectedAnswer(question) {
        const answerData = answeredQuestions[buildAnsweredQuestionKey(question)];
        return answerData ? answerData.selectedAnswer : undefined;
    }

    function countCorrectAnswers() {
        const countCorrectAnswers = (sum, answerData) => {
            return isRightAnswer(answerData.question, answerData.selectedAnswer) ? sum + 1 : sum;
        };

        return Object.values(answeredQuestions).reduce(countCorrectAnswers, 0);
    }

    const pageSecondaryTitle = getRegionPrettyName(region);
    console.log(region);
    const totalQuestionsCount = randomGeneralQuestions.length + randomRegionalQuestions.length;

    return (
        <React.Fragment>
            <header>
                <div>
                    <h1 className="uk-heading-bullet uk-text-light uk-display-inline-block uk-margin-small-right">Test</h1>
                    <h2 className="page__header__secondary marker uk-text-meta uk-text-large uk-text-light uk-margin-remove uk-margin-small-right uk-margin-remove-top">{pageSecondaryTitle}</h2>
                    <h2 className="uk-display-inline-block uk-margin-remove-top"
                        data-uk-tooltip="title: Get new questions; pos: bottom">
                        <a className="uk-icon-link" onClick={newTestHandler}
                           data-uk-icon="icon: refresh; ratio: 1.4"/>
                    </h2>
                    <p className="uk-text-meta uk-margin-remove-top">
                        Start the clock when ready. There's no consequence except the clock starts ticking.<br/>
                        The clock can be paused/reset. Clicking <em>Finish Test</em> reveals all the answers while
                        keeping the original selection for comparison.
                    </p>
                </div>
                <hr/>
            </header>

            {/*Scoreboard*/}
            <aside>
                <ScoreBoard
                    answeredQuestionsCount={answeredQuestionsCount}
                    totalQuestionsCount={totalQuestionsCount}
                    finishTestHandler={handleFinishTest}
                    clearTestHandler={handleClearTest}
                    isTestFinished={isTestFinished}
                    correctAnswersCount={correctAnswersCount}
                    clock={{
                        start: startClock,
                        reset: resetClock,
                        pause: pauseClock,
                        isRunning: isTimerRunning,
                        timerRemainingSec: remainingTime
                    }}
                    foo={timer.timerRemainingSec}
                />
            </aside>

            <section>
                <h3><u>General Questions</u></h3>
                <div className="uk-child-width-1-2@l uk-grid-small uk-margin-medium-bottom"
                     data-uk-grid="masonry: true">
                    {
                        randomGeneralQuestions.map((q, index) =>
                            (
                                <Card
                                    key={`general_${q.qid}`}
                                    interactionMode={interactionModes.SELECT}
                                    question={q}
                                    infoBoxContent={++index}
                                    questionText={`${q.qid}. ${q.question.text}`}
                                    revealAll={revealAll}
                                    selectedAnswer={getSelectedAnswer(q)}
                                    answerClickHandler={handleAnswerClick}
                                    showExpandButton={false}
                                />
                            )
                        )
                    }
                </div>
            </section>

            <section>
                <h3><u>Regional Questions</u></h3>
                <div className="uk-child-width-1-2@l uk-grid-small uk-margin-medium-bottom"
                     data-uk-grid="masonry: true">
                    {
                        randomRegionalQuestions.map((q, index) =>
                            (
                                <Card
                                    key={`regional_$${q.qid}`}
                                    interactionMode={interactionModes.SELECT}
                                    question={q}
                                    infoBoxContent={index}
                                    questionText={`${q.qid}. ${q.question.text}`}
                                    revealAll={revealAll}
                                    selectedAnswer={getSelectedAnswer(q)}
                                    answerClickHandler={handleAnswerClick}
                                    showExpandButton={false}
                                />
                            )
                        )
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

function buildAnsweredQuestionKey(question) {
    return `${question.type}_${question.qid}`;
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

export default TestPage;