import React, {Fragment} from 'react';
import {QUESTION_TYPES, useQuestions} from "./../../../hooks/QuestionHooks";
import FlashCardPage from "./../../../components/FlashCardPage";
import MetaTags from "../../../components/MetaTags";
import {getRegionPrettyName} from "../../../hooks/RegionHooks";

export default function RegionalFlashCardsPage(props) {
    const region = props.params.region;
    const regionPrettyName = getRegionPrettyName(region);
    const questions = useQuestions(QUESTION_TYPES.REGIONAL, region);
    return (
        <Fragment>
            <MetaTags location={props.location}
                titleSuffix={`Learn | Regional Questions | ${regionPrettyName}`}
                description='Quickly learn for the german Einbürgerungstest using interactive flash cards.'
            />
            <FlashCardPage questions={questions} pageType={QUESTION_TYPES.REGIONAL} region={region}/>
        </Fragment>
    )
}