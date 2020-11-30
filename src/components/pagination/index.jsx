import React from 'react';

function Pagination(props) {
        return (
            <div className="uk-grid uk-grid-small uk-child-width-1-2@l uk-child-width-1-1" data-uk-grid>

                {/*Entries per page*/}
                <ul className="uk-pagination uk-flex-left@l uk-flex-center uk-flex-center">
                    {
                        props.allowedNumOfEntries.map((n) => {
                            return (
                                <li key={n} className={props.numOfEntries === n ? 'uk-active' : ''}>
                                    <_EntriesPerPageLink handler={props.entriesNumberChangeHandler} numOfEntries={n}/>
                                </li>
                            )
                        })
                    }
                    <li className={props.numOfEntries === props.maxEntries ? 'uk-active' : ''}>
                        <a onClick={(e) => props.entriesNumberChangeHandler(props.maxEntries, e)}>All</a>
                    </li>

                </ul>

                {/*Pagination*/}
                <ul className="uk-pagination uk-flex-right@l uk-flex-center uk-flex-center">
                    <li className={props.currentPage === 1 ? 'uk-disabled' : ''}>
                        <a onClick={props.pageDecreaseHandler}>
                            <span data-uk-pagination-previous></span>
                        </a>
                    </li>

                    <_PaginationLinks numOfPages={props.numOfPages} currentPage={props.currentPage} pageChangeHandler={props.pageChangeHandler}/>
                    
                    <li className={props.currentPage === props.numOfPages ? 'uk-disabled' : ''}>
                        <a onClick={props.pageIncreaseHandler}>
                            <span data-uk-pagination-next></span>
                        </a>
                    </li>
                </ul>
            </div>
        )
}

function _PaginationLinks(props) {
    const maxPagesToDisplay = 11;
    const ranges = [];
    const toSplit = props.numOfPages > maxPagesToDisplay;

    if (!toSplit) {
        ranges.push(intRange(1, props.numOfPages));
    }

    if (toSplit && props.currentPage < 7) {
        ranges.push(intRange(1, 7));
        ranges.push(intRange(props.numOfPages - 2, props.numOfPages));
    }
    
    if (toSplit && props.numOfPages - props.currentPage < 7) {
        ranges.push(intRange(1, 3));
        ranges.push(intRange(props.numOfPages - 7, props.numOfPages));
    }

    if (toSplit && props.currentPage >= 7 && props.numOfPages - props.currentPage >= 7) {
        ranges.push(intRange(1, 3));
        ranges.push(intRange(props.currentPage - 2, props.currentPage + 2));
        ranges.push(intRange(props.numOfPages - 2, props.numOfPages));
    }
    
    let result = [];
    ranges.forEach((range, i) => {
        const items = range.map(n => {
            return (
                <li key={n}
                    className={props.currentPage === n ? 'uk-active' : ''}
                >
                    <_PaginationLink page={n} handler={props.pageChangeHandler}/>
                </li>
            )
        });
        result = result.concat(items);
        if (i < ranges.length - 1) {
            result = result.concat(<li key={`spearator-${i}`} className="uk-disabled"><span>...</span></li>);
        }
    });

    return result;
}

function _EntriesPerPageLink(props) {
    return (
        <a onClick={(e) => props.handler( props.numOfEntries, e)}>{props.numOfEntries}</a>
    );
}

function _PaginationLink(props) {
    return (
        <a onClick={(e) => props.handler(props.page, e)}>{props.page}</a>
    );
}


function intRange(start, end) {
    let range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}

export default Pagination;