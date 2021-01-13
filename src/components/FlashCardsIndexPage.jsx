import useRegions, {getRegionPrettyName} from "../hooks/useRegions";
import React, {Fragment} from "react";
import {Link} from "gatsby";
import {PATHS} from "./layout";

export default function FlashCardsIndexPage() {
    const regions = useRegions();
    return (
        <Fragment>
            <header className="uk-margin-small-bottom">
                <h1 className="uk-heading-bullet uk-text-light">
                    Flash Cards <span className="page__header__secondary marker uk-text-meta uk-text-large uk-text-light">region list</span>
                </h1>
            </header>
            <section>
                <p>
                    Learn using flash cards. Choose one of the following regions:
                </p>
                <ul>
                    <li>
                        <Link className="uk-link-text" to={PATHS.flashcards.general}>General</Link>
                    </li>
                    {
                        regions.map(region => {
                            return (
                                <li key={region.region}>
                                    <Link className="uk-link-text" to={region.regionPathFlashCards}>{getRegionPrettyName(region.region)}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </Fragment>
    )
}