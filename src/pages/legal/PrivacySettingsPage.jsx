import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PATHS} from "../../App";
import {CookieConsentContext} from "./../../CookieConsentContext"


function PrivacySettingsPage() {

    const {
        hasCookieConsent,
        declinedCookieConsent,
        acceptHandler,
        declineHandler,
        revokeHandler
    } = useContext(CookieConsentContext);

    const cookiePolicyAcceptedOrDeclined = hasCookieConsent || declinedCookieConsent;

    const text = cookiePolicyAcceptedOrDeclined ?
        `You have ${hasCookieConsent ? 'accepted' : 'declined'} our Cookie policy.`
        : 'You have not yet accepted or declined our Cookie policy.';


    const AcceptButton = () => {
        return (
            <button onClick={acceptHandler} className="uk-button uk-button-secondary uk-margin-small-left">
                Accept Cookie policy
            </button>
        )
    };

    const RevokeButton = () => {
        return (
            <button onClick={revokeHandler} className="uk-button uk-button-secondary uk-margin-small-left">
                Revoke Cookie consent
            </button>
        )
    };

    const DeclineButton = () => {
        return (
            <button onClick={declineHandler} className="uk-button uk-button-default uk-margin-small-left">
                Decline Cookie policy
            </button>
        )
    };

    return (
        <React.Fragment>
            <h1 className="uk-heading-divider uk-heading-small">Privacy Settings</h1>
            <h2 className="uk-heading-divider uk-heading-bullet">Cookies</h2>
            <p>
                This site uses Cookies to analyze traffic, remember your preferences, and optimize your
                experience. <Link className="cookie-consent__link uk-link-text" to={`/${PATHS.cookiePolicy}`}>Learn
                More</Link>
            </p>
            <div className="uk-grid uk-grid-small" data-uk-grid>
                <p className="uk-width-auto">
                        {text}
                </p>
                <div>
                    {
                        cookiePolicyAcceptedOrDeclined ?
                            hasCookieConsent ?
                                <RevokeButton/>
                                : <AcceptButton/>
                            :
                            <React.Fragment>
                                <AcceptButton/>
                                <DeclineButton/>
                            </React.Fragment>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default PrivacySettingsPage