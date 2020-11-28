import React, {useContext} from "react";
import {enterOrSpace} from "./Accessibility";
import { CookieConsentContext } from "./CookieConsentContext"

function CookieConsentBanner(props) {

    const {
        hasCookieConsent,
        declinedCookieConsent,
        acceptHandler,
        declineHandler
    } = useContext(CookieConsentContext);
    
    if (declinedCookieConsent || hasCookieConsent) {
        return null;
    }

    return (
        <aside
            className="cookie-consent__container uk-flex uk-flex-center uk-flex-right@m uk-position-fixed uk-width-expand uk-padding-small">
            <div
                className="cookie-consent__banner uk-width-xlarge uk-padding-small uk-animation-slide-top-small">
                <div className="uk-margin-bottom">
                    {props.children}
                </div>
                <div className="uk-align-right uk-margin-remove">
                    <button className="uk-button cookie-consent__button__accept uk-margin-small-right"
                            onClick={acceptHandler}
                            onPointerDown={acceptHandler}
                            onKeyDown={enterOrSpace(acceptHandler)}
                    >
                        OK
                    </button>
                    <button className="uk-button cookie-consent__button__decline"
                            onClick={declineHandler}
                            onPointerDown={declineHandler}
                            onKeyDown={enterOrSpace(declineHandler)}
                        >Not OK
                    </button>
                </div>

            </div>
        </aside>
    )
}



export default CookieConsentBanner;