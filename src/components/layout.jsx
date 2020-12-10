import React, {Fragment, useEffect, useState} from 'react';
import './../styles/main.less'
import {CookieConsentContextWrapper} from "./CookieConsentContext";
import Headroom from "react-headroom";
import CookieConsentBanner from "./CookieConsentBanner";
import Sidebar from "./sidebar";
import {Link} from "gatsby"
import useRegions, {getRegionPrettyName} from "./../hooks/RegionHooks";
import {useLocation} from "@reach/router";
import {ScrollToTop, doScrollToTop} from "./ScrollToTop";

export const PATHS = {
    home: "/home",
    impressum: "/policies/Impressum",
    privacyPolicy: "/policies/PrivacyPolicy",
    cookiePolicy: "/policies/CookiePolicy",
    disclaimer: "/policies/Disclaimer",
    privacySettings: "/policies/PrivacySettings",
    flashcards: {
        base: "flashcards",
        general: "/flashcards/general",
        regional: "/flashcards/regional",
    },
    test: {
        base: "test",
        general: "/test/general",
        regional: "/test/regional",
    },
};


function Layout(props) {

    useEffect(() => {
        const UIkit = require('uikit/dist/js/uikit');
        const Icons = require('uikit/dist/js/uikit-icons');
        UIkit.use(Icons);
    });
    
    return (
        <Fragment>
            <ScrollToTop location={props.location}/>
            <CookieConsentContextWrapper>
                <div className="container" data-uk-height-viewport="expand=true">
                    {/*Header*/}
                    <Headroom disableInlineStyles className="headroom">
                        <div className="uk-grid uk-padding-small uk-flex-middle">
                            <div className="uk-width-expand">
                                <h1 className="headroom__title uk-text-center@l">Deutscher Einbürgerungstest<span
                                    className="headroom_title__dot">.</span></h1>
                                <h2 className="headroom__subtitle uk-text-uppercase uk-margin-remove uk-text-center@l">Learn
                                    With Flash Cards</h2>
                            </div>
                            <a href="#" className="uk-hidden@l headroom__menu-icon uk-icon-link uk-width-auto uk-text-middle"
                               data-uk-toggle="target: #side-bar" aria-label="open menu"><span data-uk-icon="icon: menu; ratio: 2.3"/></a>
                        </div>
                    </Headroom>

                    <div className="content-wrapper uk-grid uk-grid-collapse" data-uk-grid>
                        <CookieConsentBanner>
                            <p>
                                This site uses Cookies to analyze traffic, remember your preferences, and optimize your
                                experience. <Link className="cookie-consent__link uk-link-text"
                                                  to={PATHS.cookiePolicy}>Learn More</Link>
                            </p>
                        </CookieConsentBanner>
                        <nav location={props.location} className="sidebar__container uk-width-auto">
                            <Sidebar>
                                <Nav {...props} />
                            </Sidebar>
                        </nav>

                        <section className="uk-margin-medium-top uk-width-1-1 uk-width-expand@l">
                            <main id="main"
                                  className="main-container uk-container uk-container-large uk-margin-medium-bottom">
                                {props.children}
                            </main>
                        </section>
                    </div>

                    {/*Footer*/}
                    <footer className="footer uk-padding-small uk-column-1-2@m">
                        <p className="uk-text-left@m uk-text-center">
                            <Link to={PATHS.impressum} className="uk-link-text">Impressum</Link> | <Link
                            to={PATHS.privacyPolicy} className="uk-link-text">Privacy Policy</Link> | <Link
                            to={PATHS.cookiePolicy} className="uk-link-text">Cookie Policy</Link> | <Link
                            to={PATHS.disclaimer} className="uk-link-text">Disclaimer</Link> | <Link
                            to={PATHS.privacySettings} className="uk-link-text">Privacy Settings</Link>

                        </p>
                        <div className="uk-text-right@m uk-text-center">
                            Made with <span role="img" aria-label="love">❤️</span>️️ in <a href="https://www.berlin.de" target="_blank" rel="noreferrer"><img
                            alt="berlin"
                            className="footer_berlin_logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/77/Berliner_Baer.svg"
                            data-uk-svg="true"/></a>
                        </div>
                    </footer>
                </div>
                <div role="button" className="scroll-to-top clickable uk-visible@l"
                     onClick={doScrollToTop}
                     onPointerDown={doScrollToTop}
                     onKeyDown={doScrollToTop}>
                    <span className="scroll-to-top__icon" data-uk-icon="icon: chevron-up; ratio: 1.6"/>
                </div>
            </CookieConsentContextWrapper>
        </Fragment>
    )
}

function NavLink(props) {
    return (
        <Link to={props.to} activeClassName="sidebar__link__active" partiallyActive={true}>
            {props.children}
        </Link>
    )
}

function Nav(props) {
    const regions = useRegions();
    const location = useLocation();

    const testOpen = strContains(location.pathname, PATHS.test.base);
    const flashCardsOpen = strContains(location.pathname, PATHS.flashcards.base);

    return (
        <Fragment>
            <ul className="uk-nav uk-nav-default main-nav" data-uk-nav>
                <li><NavLink to={PATHS.home} path={location.pathname}>Home</NavLink></li>

                <li className={`uk-parent ${flashCardsOpen ? 'uk-open' : ''}`}>
                    <a href="#">Flash Cards ></a>
                    <ul className="uk-nav-sub" hidden={!flashCardsOpen}>
                        <li><NavLink to={PATHS.flashcards.general} path={location.pathname}>General Questions</NavLink>
                        </li>
                        {
                            regions.map(region => {
                                return (
                                    <li key={region.region}>
                                        <NavLink
                                            to={region.regionPathFlashCards}>{getRegionPrettyName(region.region)}</NavLink>
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
                            regions.map(region => {
                                return (
                                    <li key={region.region}>
                                        <NavLink
                                            to={region.regionPathTest}>{getRegionPrettyName(region.region)}</NavLink>
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

export default Layout;