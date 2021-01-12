import React, {useState} from 'react'
import Answer from "./Answer";
import Image from "./image";
import {enterOrSpace} from "../../utils/Accessibility";
import {isRightAnswer} from "../../utils/Questions";
import {Link} from "gatsby"

export const interactionModes = {
  SELECT: 0,
  PRESS: 1  
};

function calculateCategoryColor(category) {
    switch (category) {
        case "Politik in der Demokratie":
            return "#b94a3e";
        case "Geschichte und Verantwortung":
            return "#ab44ab";
        case "Mensch und Gesellschaft":
            return " #aaaaaa";
        default:
            return "#121b22";
    }
}

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
        answerPointerOutHandler,
        showExpandButton
    } = props;

    const isShowExpandButton = showExpandButton === undefined ? true : showExpandButton;
    
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
        <article>
            <div className="uk-card unselectable uk-card-default uk-card-small">
                
                {/*Toolbar*/}
                <div className="uk-width-expand uk-grid uk-grid-collapse uk-flex-middle" data-uk-grid="masonry: true">
                    <div className="card__info-box__question-id">
                        <span className="uk-text-middle uk-text-center uk-text-bold">
                            {infoBoxContent}
                        </span>
                    </div>
                    {/*<span className="card__toolbar__icon uk-icon-link" data-uk-icon="star"/>*/}
                    <div className="uk-width-expand"/>
                    {
                        question.metadata.topic &&
                        <span 
                            className="card__toolbar__badge" 
                            style={{backgroundColor: calculateCategoryColor(question.metadata.category)}}
                            data-uk-tooltip={`title: ${question.metadata.category}; pos: bottom`}
                        >{question.metadata.topic}</span>
                    }
                    
                    {
                        isShowExpandButton && 
                        <Link to={question.path} className="card__toolbar__icon uk-icon-link" data-uk-icon="expand"/>
                    }
                </div>

                
                {/*Card content*/}
                <div className="uk-padding-small">
                    {/* Renders question image if exists and nothing otherwise. */}
                    <Image question={question}/>


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