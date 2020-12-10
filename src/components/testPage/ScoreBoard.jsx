import React from 'react'

function ScoreBoard(props) {
    return (
        <div
            className="uk-position-relative uk-grid uk-grid-medium uk-width-3-4@l uk-child-width-1-1@s uk-align-center">
            <div className="uk-card uk-card-default uk-padding-small uk-card-body" data-uk-sticky>
                <div className="uk-grid uk-grid-collapse uk-child-width-1-2 uk-flex-middle"
                     data-uk-grid="masonry: true">
                    {
                        props.isTestFinished ?
                            <div className="uk-text-center">
                                <h1 className="uk-text-lead uk-text-light uk-margin-remove-bottom">{props.correctAnswersCount >= 17 ? 'Pass! 👍' : 'Fail 👎'}</h1>
                                <h2 className="uk-text-small uk-text-light uk-margin-remove">{props.correctAnswersCount} Correct
                                    answers ({props.answeredQuestionsCount} questions answered)</h2>
                            </div>
                            :
                            <div className="uk-text-center">
                                <h1 className="uk-text-lead uk-text-light uk-margin-remove-bottom">{props.answeredQuestionsCount} out
                                    of {props.totalQuestionsCount}</h1>
                                <h2 className="uk-text-small uk-text-light uk-margin-remove uk-visible@l">Answered</h2>
                            </div>
                    }
                    <div className="uk-text-center">
                        <div className="uk-text-lead">{humanReadableRemainingTime(props.clock.timerRemainingSec)}</div>
                        {/*Controls on large screen*/}
                        <div className="uk-visible@l">
                            <Controls {...props}/>
                        </div>
                    </div>
                </div>
                {/*Controls on small screen*/}
                <div className="score-board__controls__small_screen uk-hidden@l uk-margin-small-top uk-text-center">
                    <Controls {...props}/>
                </div>
            </div>
        </div>
    )
}

const Controls = (props) => {
    if (props.clock.isRunning) {
        return (
            <div className="uk-grid uk-grid-small uk-child-width-auto uk-flex-center">
                <div><ControlLink handler={props.clock.pause}>Pause Clock</ControlLink></div>
                <div><ControlLink handler={props.clock.reset}>Reset Clock</ControlLink></div>
                <div><ControlLink handler={props.clearTestHandler}>Clear Test</ControlLink></div>
                <div><ControlLink handler={props.finishTestHandler}>Finish Test</ControlLink></div>
            </div>
        )
    }

    if (props.isTestFinished) {
        return <div><ControlLink handler={props.clearTestHandler}>Clear Test</ControlLink></div>;
    }

    return <div><ControlLink handler={props.clock.start}>Start Test</ControlLink></div>;
};

const ControlLink = (props) => {
    return (
        <a role="button" className="uk-link-text uk-text-emphasis"
           onClick={props.handler}
           onKeyDown={props.handler}
           onPointerDown={props.handler}
        >
            {props.children}
        </a>
    )
};

function humanReadableRemainingTime(timerRemainingSec) {
    const hours = Math.floor(timerRemainingSec / 3600);
    const minutes = Math.floor((timerRemainingSec - hours * 3600) / 60);
    const seconds = timerRemainingSec - minutes * 60 - hours * 3600;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return ("" + number).padStart(2, '0');
}


export default ScoreBoard;