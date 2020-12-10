import React from 'react'
import logo from "../../resources/images/logo_1200.png";
import {Helmet} from "react-helmet";

const SITE_NAME = "Einbürgerunstest Flash Cards App";
function getTitle(suffix) {
    return `${SITE_NAME} | ${suffix}`;

}

function MetaTags(props) {
    const title = getTitle(props.titleSuffix);
    const url = props.location.href;
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="title" content={title}/>
            <meta property="description" content={props.description}/>
            
            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title}/>
            <meta property="og:site_name" content={SITE_NAME}/>

            <meta property="og:url" content={url}/>
            <meta property="og:image" content="https://raw.githubusercontent.com/inbar/einbuergerungstest-flash-cards-app/dev/src/resources/images/logo_wide.png" />
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
            <meta property="og:description" content={props.description}/>
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={url}/>
            <meta property="twitter:title" content={title}/>
            <meta property="twitter:description" content={props.description}/>
        </Helmet>
    )
}

export default MetaTags