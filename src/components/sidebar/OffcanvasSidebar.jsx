import React from 'react';

function OffcanvasSidebar(props) {
    return (
        <div id="side-bar" data-uk-offcanvas="mode: push">
            <div className="uk-offcanvas-bar">
                {props.children}
            </div>
        </div>
    );
}

export default OffcanvasSidebar;