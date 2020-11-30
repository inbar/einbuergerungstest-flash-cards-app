import React, {useState} from 'react'
import Answer from "./Answer";
import {isRightAnswer} from "../../Questions";
import Image from "./image";
import {enterOrSpace} from "../../Accessibility";

export const interactionModes = {
  SELECT: 0,
  PRESS: 1  
};

export default function Card(props) {
    
    const {
        interactionMode,
        question,
        infoBoxContent,
        questionText,
        revealAll,
        selectedAnswer,
        answerClickHandler,
        answerPointerDownHandler,
        answerPointerUpHandler,
        answerPointerOutHandler
    } = props;


    const [isRevealAnswer, setIsRevealAnswer] = useState(false);
    const [isPointerDown, setIsPointerDown] =  useState(false);

    function handleButtonPointerDown() {
        setIsRevealAnswer(true);
        setIsPointerDown(true);
    }

    function handleButtonPointerUp() {
        setIsRevealAnswer(false);
        setIsPointerDown(false);
    }

    function handleButtonPointerOut() {
        if (isPointerDown) {
            setIsRevealAnswer(false);
        }
    }
    
    return (
        <article onKeyDown={enterOrSpace(handleButtonPointerDown)}
                 onKeyUp={enterOrSpace(handleButtonPointerUp)}
            >
            <div className="uk-card unselectable uk-card-default uk-padding-small uk-card-small">
                
                {/* Renders question image if exists and nothing otherwise. */}
                <Image question={question}/>

                <div className="card__info-box__question-id uk-position-top-left uk-position-absolute">
                        <span className="uk-text-middle uk-text-center uk-text-bold">
                            {infoBoxContent}
                        </span>
                </div>

                <div className="uk-card-header">
                    <p className="card__question-text">{questionText}</p>
                </div>
                <div className="uk-card-body">
                    <ul className="uk-padding-remove-left">
                        {
                            question.answers.map((answer, index) => {
                                return (
                                    <Answer
                                        key={index}
                                        interactionMode={interactionMode}
                                        answer={answer}
                                        answerId={index}
                                        isRightAnswer={isRightAnswer(question, index)}
                                        revealAnswer={isRevealAnswer || revealAll}
                                        isSelected={selectedAnswer !== undefined && selectedAnswer === index}
                                        clickHandler={callWithArgs(optionalHandler(answerClickHandler), [question, index])}
                                        pointerDownHandler={callWithArgs(optionalHandler(answerPointerDownHandler), [question, index])}
                                        pointerUpHandler={callWithArgs(optionalHandler(answerPointerUpHandler), [question, index])}
                                        pointerOutHandler={callWithArgs(optionalHandler(answerPointerOutHandler), [question, index])}
                                    />
                                )
                            })
                        
                        }
                    </ul>
                </div>
                <div className="uk-card-footer">
                    <button
                        className="uk-button card__footer__reveal-button uk-button-primary uk-width-1-1"
                        onPointerDown={handleButtonPointerDown}
                        onPointerUp={handleButtonPointerUp}
                        onPointerOut={handleButtonPointerOut}
                        onKeyDown={enterOrSpace(handleButtonPointerDown)}
                        onKeyUp={enterOrSpace(handleButtonPointerUp)}
                    >
                        Reveal
                    </button>
                </div>
            </div>
        </article>
    )
}

function optionalHandler(handleFn) {
    if (handleFn) {
        return handleFn;
    }
    
    return () => {};
}

function callWithArgs(fn, argsArr) {
    return (e) => fn.apply(null, [...argsArr, e]);
}