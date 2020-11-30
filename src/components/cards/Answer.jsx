import {useState} from 'react'
import React from 'react'
import {interactionModes} from "./Card";
import {enterOrSpace} from "../../Accessibility";

const neutralAnswerStyle = getAnswerNeutralStyle();

export default function Answer(props) {


    function isSelectMode() {
        return props.interactionMode === interactionModes.SELECT;
    }

    function isPressMode() {
        return props.interactionMode === interactionModes.PRESS;
    }

    function computeListElementStyle(revealAnswer, isInteractedWith, isRightAnswer) {
        if (revealAnswer) {
            if (isInteractedWith) {
                return selectedAndRevealedAnswerStyle;
            }

            if (isRightAnswer) {
                return indicatorAnswerStyle;
            }
        }
        
        if (isInteractedWith) {
            if (isSelectMode()) {
                return selectedAnswerStyle;
            }

            if (isPressMode()) {
                return pressedAnswerStyle;
            }
        }
        
        return neutralAnswerStyle;
    }
    
    const [isPressed, setIsPressed] = useState(false);

    const indicatorAnswerStyle = getAnswerIndicatorStyle(props.isRightAnswer);
    const selectedAnswerStyle = getAnswerSelectedStyle(props.interactionMode);
    const pressedAnswerStyle = getAnswerPressedStyle(props.isRightAnswer);
    const selectedAndRevealedAnswerStyle = getAnswerSelectedAndRevealedStyle(props.interactionMode);
    const indicatorIconType = props.isRightAnswer ? 'check' : 'close';
    const indicatorIcon = <span data-uk-icon={`icon: ${indicatorIconType}; ratio: 2`}/>;
    const answerPrettyName = String.fromCharCode(props.answerId + 65) + '.';
    const reveal = isPressed || (props.revealAnswer && (props.isRightAnswer || props.isSelected));
    const leftGutterContent = reveal ? indicatorIcon : answerPrettyName;
    const isInteractedWith = props.isSelected || isPressed;
    const listElementStyle = computeListElementStyle(props.revealAnswer, isInteractedWith, props.isRightAnswer);

    function handlePointerDown() {
        if (isPressMode()) {
            setIsPressed(true);
        }

        props.pointerDownHandler && props.pointerDownHandler();
    }

    function handlePointerUp() {
        if (isPressMode()) {
            setIsPressed(false);
        }

        props.pointerUpHandler && props.pointerUpHandler();
    }


    function handlePointerOut() {
        if (isPressMode()) {
            setIsPressed(false);
        }

        props.pointerOutHandler && props.pointerOutHandler();
    }
    
    return (
        <li className="uk-grid uk-grid-small uk-grid-match" data-uk-grid>
            <div className="card__answers__answer-id-gutter uk-padding-remove-left">
                <div></div>
                <span className="uk-text-middle uk-text-center uk-text-uppercase">
                    {leftGutterContent}
                </span>
            </div>
            <div className="uk-width-expand">
                <div role="button" className={listElementStyle}
                     onPointerDown={handlePointerDown}
                     onPointerOut={handlePointerOut}
                     onPointerUp={handlePointerUp}
                     onClick={props.clickHandler}
                     onKeyDown={enterOrSpace(isPressMode() ? handlePointerDown : props.clickHandler)}
                     onKeyUp={enterOrSpace(handlePointerUp)}
                >
                    {props.answer}
                </div>
            </div>
        </li>
    )

}

const rightAnswerStyle = 'card__answers__item__right-answer';
const wrongAnswerStyle = 'card__answers__item__wrong-answer';
const selectedStyle = 'card__answers__item__selected';

function baseStyle() {
    return [
        'uk-tile',
        'card__answers__item',
        'uk-tile-muted'
    ];
}

function getAnswerNeutralStyle() {
    return baseStyle().join(' ');
}

function baseIndicatorStyle(isRightAnswer) {
    return baseStyle().concat(isRightAnswer ? rightAnswerStyle : wrongAnswerStyle);
}

function getAnswerIndicatorStyle(isRightAnswer) {
    return baseIndicatorStyle(isRightAnswer).join(' ');
}

function getAnswerSelectedStyle() {
    return baseStyle().concat(selectedStyle).join(' ');
}

function getAnswerPressedStyle(isRightAnswer) {
    return getAnswerIndicatorStyle(isRightAnswer);
}

function getAnswerSelectedAndRevealedStyle() {
    return baseIndicatorStyle().concat(selectedStyle).join(' ');
}