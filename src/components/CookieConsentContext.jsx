import React, {useState} from 'react'
import Cookies from "js-cookie";
const CONSENT_COOKIE_NAME = "consent_cookie";
const DECLINE_COOKIE_NAME = "decline_cookie";

Cookies.defaults = {
    sameSite: 'strict',
    expires: 365
};

const CookieConsentContext = React.createContext({hasCookieConsent: false});

function CookieConsentContextWrapper(props) {

    const [hasConsentCookie, setHasConsentCookie] = useState(isConsentCookieSet());
    const [hasDeclinedCookie, setHasDeclinedCookie] = useState(isDeclinedCookieSet());

    function cookieConsentAcceptHandler() {
        setAcceptCookie();
        removeDeclinedCookie();
        setHasConsentCookie(true);
    }

    function cookieConsentDeclineHandler() {
        removeAcceptCookie();
        setDeclinedCookie();
        setHasConsentCookie(false);
        setHasDeclinedCookie(true);
    }

    function cookieConsentRevokeHandler() {
        removeAcceptCookie();
        removeDeclinedCookie();
        setHasConsentCookie(false);
        setHasDeclinedCookie(false);
    } 
    
    return (
        <CookieConsentContext.Provider
            value={{
                hasCookieConsent: hasConsentCookie,
                declinedCookieConsent: hasDeclinedCookie,
                acceptHandler: cookieConsentAcceptHandler,
                declineHandler: cookieConsentDeclineHandler,
                revokeHandler: cookieConsentRevokeHandler
            }}>
            {props.children}
        </CookieConsentContext.Provider>
                
    )
}

function isConsentCookieSet() {
    return Cookies.get(CONSENT_COOKIE_NAME) !== undefined;
}

function isDeclinedCookieSet() {
    return Cookies.get(DECLINE_COOKIE_NAME) !== undefined;
}

function setAcceptCookie() {
    Cookies.set(CONSENT_COOKIE_NAME, true);
}

function setDeclinedCookie() {
    Cookies.set(DECLINE_COOKIE_NAME, true);
}

function removeDeclinedCookie() {
    Cookies.remove(DECLINE_COOKIE_NAME);
}

function removeAcceptCookie() {
    Cookies.remove(CONSENT_COOKIE_NAME);
}

export {
    CookieConsentContext,
    CookieConsentContextWrapper
}