import React, {Fragment, useState} from 'react';
import './styles/main.less'
import {Route, Switch, Link, Redirect, useLocation, useHistory} from "react-router-dom"
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import FlashCardPage from "./pages/FlashCardPage";
import Sidebar from "./components/sidebar"
import regions from "./resources/data/regions.yml"
import {QUESTION_TYPES as PAGE_TYPES} from "./Questions";
import ImpressumPage from "./pages/legal/ImpressumPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/legal/CookiePolicyPage";
import DisclaimerPage from "./pages/legal/DisclamerPage";
import CookieConsentBanner from "./CookieConsentBanner";
import PrivacySettingsPage from "./pages/legal/PrivacySettingsPage";
import {CookieConsentContextWrapper} from "./CookieConsentContext";
import Headroom from "react-headroom";

export const PATHS = {
    home: "home",
    flashCards: "flashcards",
    test: "test",
    impressum: "policies/impressum",
    privacyPolicy: "policies/privacy",
    cookiePolicy: "policies/cookie",
    disclaimer: "policies/disclaimer",
    privacySettings: "policies/settings"
};

function App() {
    const history = useHistory();

    return (
        <CookieConsentContextWrapper>
            <div className="container" data-uk-height-viewport="expand=true">
                <Headroom className="headroom">
                    <div className="uk-grid uk-padding-small uk-flex-middle">
                        <div className="uk-width-expand clickable" onClick={() => history.push(PATHS.home)}>
                            <h1 className="headroom__title uk-text-center@l">Deutscher Einbürgerungstest<span className="headroom_title__dot">.</span></h1>
                            <h2 className="headroom__subtitle uk-text-uppercase uk-margin-remove uk-text-center@l">Learn With Flash Cards</h2>
                        </div>
                        <a className="uk-hidden@l headroom__menu-icon uk-icon-link uk-width-auto uk-text-middle"
                           data-uk-icon="icon: menu; ratio: 2.3" data-uk-toggle="target: #side-bar"/>
                    </div>
                </Headroom>
                <div className="content-wrapper uk-grid uk-grid-collapse" data-uk-grid>
                    <CookieConsentBanner>
                        <p>
                            This site uses Cookies to analyze traffic, remember your preferences, and optimize your
                            experience. <Link className="cookie-consent__link uk-link-text"
                                              to={`/${PATHS.cookiePolicy}`}>Learn More</Link>
                        </p>
                    </CookieConsentBanner>
                    <nav className="sidebar__container uk-width-auto">
                        <Sidebar>
                            <Nav/>
                        </Sidebar>
                    </nav>

                    <section className="main-container uk-margin-medium-top uk-width-auto">
                        {/*Header*/}
                        <main id="main" className="uk-container uk-container-large uk-margin-medium-bottom">
                            <Switch>
                                <Route path={`/${PATHS.home}`}>
                                    <HomePage/>
                                </Route>
                                <Route path={`/${PATHS.flashCards}/${PAGE_TYPES.GENERAL}`}
                                       render={routeProps =>
                                           <FlashCardPage {...routeProps} type={PAGE_TYPES.GENERAL}/>
                                       }/>
                                <Route path={`/${PATHS.flashCards}/${PAGE_TYPES.REGIONAL}/:region?`}
                                       render={routeProps =>
                                           <FlashCardPage {...routeProps} type={PAGE_TYPES.REGIONAL}/>
                                       }/>
                                <Route path={`/${PATHS.test}/:region?`} component={TestPage}/>

                                <Route path={`/${PATHS.impressum}`}>
                                    <ImpressumPage/>
                                </Route>

                                <Route path={`/${PATHS.privacyPolicy}`}>
                                    <PrivacyPolicyPage/>
                                </Route>

                                <Route path={`/${PATHS.cookiePolicy}`}>
                                    <CookiePolicyPage/>
                                </Route>

                                <Route path={`/${PATHS.disclaimer}`}>
                                    <DisclaimerPage/>
                                </Route>

                                <Route path={`/${PATHS.privacySettings}`}>
                                    <PrivacySettingsPage/>
                                </Route>

                                <Route path="/">
                                    <Redirect to={`/${PATHS.home}`}/>
                                </Route>
                            </Switch>
                        </main>
                    </section>
                </div>
                {/*Footer*/}
                <footer className="footer uk-padding-small uk-column-1-2@m">
                    <p className="uk-text-left@m uk-text-center">
                        <Link to={`/${PATHS.impressum}`} className="uk-link-text">Impressum</Link> | <Link
                        to={`/${PATHS.privacyPolicy}`} className="uk-link-text">Privacy Policy</Link> | <Link
                        to={`/${PATHS.cookiePolicy}`} className="uk-link-text">Cookie Policy</Link> | <Link
                        to={`/${PATHS.disclaimer}`} className="uk-link-text">Disclaimer</Link> | <Link
                        to={`/${PATHS.privacySettings}`} className="uk-link-text">Privacy Settings</Link>

                    </p>
                    <div className="uk-text-right@m uk-text-center">
                        Made with ❤️️ in <a href="https://www.berlin.de" target="_blank"><img
                        alt="berlin"
                        className="footer_berlin_logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Berliner_Baer.svg"
                        data-uk-svg="true"/></a>
                    </div>
                </footer>
            </div>
        </CookieConsentContextWrapper>
    )
}

function NavLink(props) {
    return (
        <Link to={props.to}>
             <span className={props.to.toLowerCase() === props.path.toLowerCase() ? "sidebar__link__active" : ''}>
                {props.children}
            </span>
        </Link>
    )
}

function Nav() {
    const location = useLocation();

    const testOpen = strContains(location.pathname, PATHS.test);
    const flashCardsOpen = strContains(location.pathname, `${PATHS.flashCards}/${PAGE_TYPES.REGIONAL}`);

    return (
        <Fragment>
            <ul className="uk-nav uk-nav-default main-nav" data-uk-nav>
                <li><NavLink to={`/${PATHS.home}`} path={location.pathname}>Home</NavLink></li>

                <li className={`uk-parent ${flashCardsOpen ? 'uk-open' : ''}`}>
                    <a href="#">Flash Cards ></a>
                    <ul className="uk-nav-sub" hidden={!flashCardsOpen}>
                        <li><NavLink to={`/${PATHS.flashCards}/general`} path={location.pathname}>General
                            Questions</NavLink></li>
                        {
                            regions.list.map(e => {
                                return (
                                    <li key={e.short}>
                                        <NavLink to={`/${PATHS.flashCards}/regional/${e.short}`}
                                                 path={location.pathname}>{e.readable}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>

                <li className={`uk-parent ${testOpen ? 'uk-open' : ''}`}>
                    <a href="#">Test ></a>
                    <ul className="uk-nav-sub" hidden={!testOpen}>
                        {
                            regions.list.map(region => {
                                return (
                                    <li key={region.short}>
                                        <NavLink to={`/${PATHS.test}/${region.short}`}
                                                 path={location.pathname}>{region.readable}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
            </ul>

        </Fragment>
    );
}

function strContains(str, subStr) {
    return str.indexOf(subStr) !== -1;
}

export default App;