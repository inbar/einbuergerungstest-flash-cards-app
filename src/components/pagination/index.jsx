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
                                    <EntriesPerPageLink handler={props.entriesNumberChangeHandler} numOfEntries={n}/>
                                </li>
                            )
                        })
                    }
                    <li className={props.numOfEntries === props.maxEntries ? 'uk-active' : ''}>
                        <span role="button" className="clickable" {...allHandlers((e) => props.entriesNumberChangeHandler(props.maxEntries, e))}>All</span>
                    </li>

                </ul>

                {/*Pagination*/}
                <ul className="uk-pagination uk-flex-right@l uk-flex-center uk-flex-center">
                    <li className={props.currentPage === 1 ? 'uk-disabled' : ''}>
                        <span role="button" className="clickable" {...allHandlers(props.pageDecreaseHandler)}><span data-uk-pagination-previous></span></span>
                    </li>

                    <PaginationLinks numOfPages={props.numOfPages} currentPage={props.currentPage} pageChangeHandler={props.pageChangeHandler}/>
                    
                    <li className={props.currentPage === props.numOfPages ? 'uk-disabled' : ''}>
                        <span role="button" className="clickable" {...allHandlers(props.pageIncreaseHandler)}><span data-uk-pagination-next></span></span>
                    </li>
                </ul>
            </div>
        )
}

function PaginationLinks(props) {
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
                    className={props.currentPage === n ? 'uk-active' : ''}>
                    <PaginationLink page={n} handler={props.pageChangeHandler}/>
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

function EntriesPerPageLink(props) {
    return (
        <span role="button" className="clickable" {...allHandlers((e) => props.handler( props.numOfEntries, e))}>{props.numOfEntries}</span>
    );
}

function PaginationLink(props) {
    return (
        <span role="button" className="clickable" {...allHandlers((e) => props.handler(props.page, e))}>{props.page}</span>
    );
}


function intRange(start, end) {
    let range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}

function allHandlers(fn) {
    return {
        onClick: fn,
        onPointerDown: fn,
        onKeyDown: fn
    }
}

export default Pagination;