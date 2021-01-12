import React, {Fragment} from 'react';
import MetaTags from "./../components/MetaTags";
import useRegions, {getRegionPrettyName} from "./../hooks/useRegions";
import {Link} from "gatsby";

export default function TestIndexPage(props) {
    const regions = useRegions();
    return (
        <Fragment>
            <MetaTags location={props.location}
                titleSuffix={'Take a Test'}
                description={'Take a test simulation! Are you ready for the Einbürgerunstest?'}
            />
            <header className="uk-margin-small-bottom">
                <h1 className="uk-heading-bullet uk-text-light">
                    Take a Test <span className="page__header__secondary marker uk-text-meta uk-text-large uk-text-light">region list</span>
                </h1>
            </header>
            <section>
                <p>
                    Take a practice test. Choose one of the following regions:
                </p>
                <ul>
                    {
                        regions.map(region => {
                            return (
                                <li key={region.region}>
                                    <Link className="uk-link-text" to={region.regionPathTest}>{getRegionPrettyName(region.region)}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </Fragment>
    )
}