import {useContext, useEffect} from 'react'
import {CookieConsentContext} from "./CookieConsentContext";
import Cookies from "js-cookie";

/*global gaOptout, disableStr*/
/*eslint no-undef: "error"*/

function optin() {
    typeof window !== "undefined" && typeof disableStr !== "undefined" && (window[disableStr] = 0);
    typeof window !== "undefined" && typeof disableStr !== "undefined" && Cookies.remove(disableStr);
}

function optout() {
    typeof gaOptout !== "undefined" && gaOptout();
}

export default function DisableGoogleAnalytics() {
    const {hasCookieConsent} = useContext(CookieConsentContext);
    useEffect(() => {
        if (hasCookieConsent) {
            optin();
        } else {
            // Disable GA
            optout();
        }
    }, [hasCookieConsent]);

    return null;
}