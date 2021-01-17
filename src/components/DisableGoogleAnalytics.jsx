import React, {useContext, useEffect} from 'react'
import {CookieConsentContext} from "./CookieConsentContext";

export default function DisableGoogleAnalytics() {

    const {hasCookieConsent} = useContext(CookieConsentContext);
    useEffect(() => {
        if (hasCookieConsent) {
            return;
        }
        
        // Disable GA
        gaOptout();
    }, hasCookieConsent);
    
    return null;
}