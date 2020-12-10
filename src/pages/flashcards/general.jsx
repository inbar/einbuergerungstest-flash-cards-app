import React, {Fragment} from 'react';
import FlashCardPage from "../../components/FlashCardPage";
import {QUESTION_TYPES, useQuestions} from "../../hooks/QuestionHooks";
import MetaTags from "../../components/MetaTags";

export default function GeneralFlashCardsPage(props) {
    const questions = useQuestions(QUESTION_TYPES.GENERAL);
    return (
        <Fragment>
            <MetaTags location={props.location}
                titleSuffix={'Learn | General Questions'}
                description='Quickly learn for the german Einbürgerungstest using interactive flash cards.'
            />
            <FlashCardPage questions={questions} pageType={QUESTION_TYPES.GENERAL}/>
        </Fragment>
    )
}