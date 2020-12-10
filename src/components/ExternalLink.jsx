import React, {Fragment} from 'react';

function ExternalLink(props) {
    return (
        <Fragment>
            <a {...props} target="_blank" rel="noreferrer">
                {props.children}
                <img alt="" className="external-link__logo"
                 src="https://upload.wikimedia.org/wikipedia/commons/6/6a/External_link_font_awesome.svg"
                 data-uk-svg="true"/>
            </a>
        </Fragment>
    )
}

export default ExternalLink;