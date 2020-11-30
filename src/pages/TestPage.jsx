import React, {useState, useMemo, useEffect} from 'react'
import {getRegionPrettyName, isLegalRegion} from "./../Regions";
import {Redirect, Link} from "react-router-dom";
import generalAnswers from "../resources/data/answers/general.yml";
import ScoreBoard from "./ScoreBoard";
import Card, {interactionModes} from "../components/cards/Card";
import Timer from "./Timer";
import {getRandomGeneralQuestionsSlice, getRandomRegionalQuestionsSlice, isRightAnswer} from "../Questions";


function TestPage(props) {
    
    const hasRegion = !!props.match.params.region;
    const region = props.match.params.region;

    if (!hasRegion || hasRegion && !isLegalRegion(region)) {
        return <Redirect to="/take-test/BE"/>;
    }

    const timer = useMemo(() => new Timer(3600, timer => setRemainingTime(timer.timerRemainingSec)), []);
    
    const [randomGeneralQuestions, setRandomGeneralQuestions] = useState(getRandomGeneralQuestionsSlice(30));
    const [randomRegionalQuestions, setRandomRegionalQuestions] = useState(getRandomRegionalQuestionsSlice(region, 3));
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [revealAll, setRevealAll] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(timer.isRunning);
    const [remainingTime, setRemainingTime] = useState(timer.originalSetTimeSec);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    useEffect(() => {
        setRandomGeneralQuestions(getRandomGeneralQuestionsSlice(30));
        setRandomRegionalQuestions(getRandomRegionalQuestionsSlice(region, 3));
        return () => {
            resetClock();
        }
    }, [region]);


    function startClock() {
        console.log("startClock");
        timer.start(timer => setIsTimerRunning(timer.isRunning));
    }

    function pauseClock() {
        console.log("pauseClock");
        timer.pause(timer => setIsTimerRunning(timer.isRunning));
    }

    function resetClock() {
        console.log("resetClock");
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
        setCorrectAnswersCount(countCorrectAnswers(answeredQuestions, generalAnswers));
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
            selectedAnswer : isDeselected ? undefined : answerId,
            question : question
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
        setRandomGeneralQuestions(getRandomGeneralQuestionsSlice(30));
        setRandomRegionalQuestions(getRandomRegionalQuestionsSlice(region, 3));
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
    const totalQuestionsCount = randomGeneralQuestions.length + randomRegionalQuestions.length;

    return (
        <React.Fragment>
            <header>
                <div>
                    <h1 className="uk-heading-bullet uk-text-light uk-display-inline-block uk-margin-small-right">Test</h1>
                    <h2 className="page__header__secondary marker uk-text-meta uk-text-large uk-text-light uk-margin-remove uk-margin-small-right uk-margin-remove-top">{pageSecondaryTitle}</h2>
                    <h2 className="uk-display-inline-block uk-margin-remove-top" data-uk-tooltip="title: Get new questions; pos: bottom">
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
                                    key={`general_${q.id}`}
                                    interactionMode={interactionModes.SELECT}
                                    question={q}
                                    infoBoxContent={++index}
                                    questionText={`${q.id}. ${q.question.text}`}
                                    revealAll={revealAll}
                                    selectedAnswer={getSelectedAnswer(q)}
                                    answerClickHandler={handleAnswerClick}
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
                                    key={`regional_$${q.id}`}
                                    interactionMode={interactionModes.SELECT}
                                    question={q}
                                    infoBoxContent={index}
                                    questionText={`${q.id}. ${q.question.text}`}
                                    revealAll={revealAll}
                                    selectedAnswer={getSelectedAnswer(q)}
                                    answerClickHandler={handleAnswerClick}
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
    return `${question.type}_${question.id}`;
} 

export default TestPage;