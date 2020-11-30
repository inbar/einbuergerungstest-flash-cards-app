import React from 'react';
import OffcanvasSidebar from './OffcanvasSidebar'
import FixedSidebar from './FixedSidebar'

function Sidebar(props) {
    return (
        <div>
            <div className='uk-hidden@l'>
                <OffcanvasSidebar>
                    {props.children}
                </OffcanvasSidebar>
            </div>
            <div className="uk-visible@l">
                <FixedSidebar>
                    {props.children}
                </FixedSidebar>
            </div>

        </div>
    );
}

export default Sidebar;