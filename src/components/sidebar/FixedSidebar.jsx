import React from 'react';

function FixedSidebar(props) {
    return (
        <div className="sidebar__fixed uk-width-medium uk-margin-top">
            {props.children}
        </div>
    );
}

export default FixedSidebar;