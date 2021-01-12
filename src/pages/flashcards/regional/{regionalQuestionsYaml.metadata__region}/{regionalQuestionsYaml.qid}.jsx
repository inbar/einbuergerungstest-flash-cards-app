import React, {Fragment} from 'react';
import {QUESTION_TYPES, useQuestion} from "../../../../hooks/useQuestion";
import MetaTags from "../../../../components/MetaTags";
import Card, {interactionModes} from "../../../../components/cards/Card";
import {Link} from "gatsby";
import useRegion from "../../../../hooks/useRegion";
import {getRegionPrettyName} from "../../../../hooks/useRegions";

function SingleRegionalQuestionPage(props) {
    const qid = props.params.qid;
    const regionName = props.params.metadata__region;
    const regionPrettyName = getRegionPrettyName(regionName);
    const question = useQuestion(qid, QUESTION_TYPES.REGIONAL, regionName);
    const region = useRegion(regionName);
    return (
        <Fragment>
            <MetaTags location={props.location}
                titleSuffix={`Learn | Regional Questions | ${regionPrettyName} | Q${qid}`}
                description='Quickly learn for the german Einbürgerungstest using interactive flash cards.'
            />
            <header className="uk-margin-small-bottom">
                <h1 className="uk-heading-bullet uk-text-light">
                    Flash Cards <span
                    className="page__header__secondary marker uk-text-meta uk-text-large uk-text-light">Regional Questions | {regionPrettyName} | Q{qid}</span>
                </h1>
                <Link to={region.regionPathFlashCards} className="uk-link-text"><span uk-icon="arrow-left"></span>All Questions <small><b>(Regional: {regionPrettyName})</b></small></Link>
            </header>

            <section className="single-question__section uk-flex uk-flex-center">
                <Card
                    key={question.qid}
                    question={question}
                    interactionMode={interactionModes.PRESS}
                    infoBoxContent={question.qid}
                    questionText={question.question.text}
                    showExpandButton={false}
                />
            </section>
        </Fragment>
    )
}

export default SingleRegionalQuestionPage;