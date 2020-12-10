import React, {Fragment} from 'react';
import MetaTags from "../../components/MetaTags";
import FlashCardsIndexPage from "../../components/FlashCardsIndexPage";

export default function RegionalFlashCardsIndexPage(props) {
    return (
        <Fragment>
            <MetaTags location={props.location}
                titleSuffix={'Learn | Regional Questions'}
                description='Quickly learn for the german Einbürgerungstest using interactive flash cards.'
            />
            <FlashCardsIndexPage/>
        </Fragment>
    )
}