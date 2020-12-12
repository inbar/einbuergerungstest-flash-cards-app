import React from 'react'
import {Helmet} from "react-helmet";
import useMetadata from "../hooks/useMetadata";



function MetaTags(props) {
    const metadata = useMetadata();
    const siteName = metadata.name;
    const siteUrl = metadata.url;
    
    function getTitle(suffix) {
        return `${siteName} | ${suffix}`;

    }
    
    const title = getTitle(props.titleSuffix);
    const url = props.location.href;
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="title" content={title}/>
            <meta property="description" content={props.description}/>
            
            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title}/>
            <meta property="og:site_name" content={siteName}/>

            <meta property="og:url" content={url}/>
            <meta property="og:image" content={`${siteUrl}/logo/logo_500.png`} />
            <meta property="og:image:width" content="500"/>
            <meta property="og:image:height" content="500"/>
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