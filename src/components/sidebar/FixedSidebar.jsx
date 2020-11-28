import React from 'react';

function FixedSidebar(props) {
    return (
        <div className="sidebar__fixed__container uk-width-medium uk-position-fixed uk-padding-large uk-margin-top">
            {props.children}
        </div>
    );
}

export default FixedSidebar;