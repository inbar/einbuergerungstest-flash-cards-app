import React, {Fragment} from 'react';
import {QUESTION_TYPES, useQuestion} from "../../../hooks/QuestionHooks";
import MetaTags from "../../../components/MetaTags";
import Card, {interactionModes} from "../../../components/cards/Card";

function SingleGeneralQuestionPage(props) {
    const qid = props.params.qid;
    const question = useQuestion(qid, QUESTION_TYPES.GENERAL);
    return (
        <Fragment>
            <MetaTags location={props.location}
                titleSuffix={`Learn | General Questions | Q${qid}`}
                description={question.question.text}
            />
            <header className="uk-margin-small-bottom">
                <h1 className="uk-heading-bullet uk-text-light">
                    Flash Cards <span
                    className="page__header__secondary marker uk-text-meta uk-text-large uk-text-light">General Questions | Question {qid}</span>
                </h1>
            </header>
            
            <section className="single-question__section uk-flex uk-flex-center">
                <Card
                    key={question.qid}
                    question={question}
                    interactionMode={interactionModes.PRESS}
                    infoBoxContent={question.qid}
                    questionText={question.question.text}
                />
            </section>
        </Fragment>
    )
}

export default SingleGeneralQuestionPage;