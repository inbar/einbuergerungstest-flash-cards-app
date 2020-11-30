import React, {Fragment} from 'react'
import logo from "../resources/images/logo_wide.png";
import {Helmet} from "react-helmet";

const SITE_NAME = "Einbürgerunstest Flash Cards App";
function getTitle(suffix) {
    return `${SITE_NAME} | ${suffix}`;

}

function MetaTags(props) {
    const title = getTitle(props.titleSuffix);
    const url = window.location.href;
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="title" content={title}/>
            <meta property="description" content={props.description}/>
            
            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title}/>
            <meta property="og:site_name" content={SITE_NAME}/>

            <meta property="og:url" content={url}/>
            <meta property="og:image" content={logo} />
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