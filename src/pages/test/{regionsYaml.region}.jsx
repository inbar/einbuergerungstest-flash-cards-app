import React, {Fragment} from 'react';
import TestPage from "./../../components/testPage/TestPage";
import {QUESTION_TYPES, useQuestions} from "../../hooks/QuestionHooks";
import MetaTags from "../../components/MetaTags";
import {getRegionPrettyName} from "../../hooks/RegionHooks";

export default function TestPageWrapper(props) {
    const region = props.params.region;
    const regionPrettyName = getRegionPrettyName(region);
    const generalQuestions = useQuestions(QUESTION_TYPES.GENERAL);
    const regionalQuestions = useQuestions(QUESTION_TYPES.REGIONAL, region);
    return (
        <Fragment>
            <MetaTags location={props.location}
                titleSuffix={`Take a Test | ${regionPrettyName}`}
                description={`Take a test simulation for ${regionPrettyName}! Are you ready for the Einbürgerunstest?`}
            />
            <TestPage region={region} generalQuestions={generalQuestions} regionalQuestions={regionalQuestions}/>
        </Fragment>
    )
}