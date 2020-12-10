import React, {useState, useEffect} from 'react'
import Pagination from "./pagination"
import Card, {interactionModes} from "./cards/Card";
import {doScrollToTop} from "./ScrollToTop";
import {QUESTION_TYPES as PAGE_TYPES} from "../hooks/QuestionHooks";
import {getRegionPrettyName} from "../hooks/RegionHooks";

const ALLOWED_NUMBER_OF_ENTRIES = [10, 15, 30, 50];
const BATCH_SIZE = 20;


function FlashCardPage(props) {

    const [numOfEntries, setNumOfEntries] = useState(ALLOWED_NUMBER_OF_ENTRIES[0]);
    const [page, setPage] = useState(1);
    const [batchesToDisplay, setBatchesToDisplay] = useState(1);

    const {
        questions,
        pageType,
        region
    } = props;
    
    
    useEffect(() => {
        setPage(1);
        setBatchesToDisplay(1);
    }, [pageType, region]);

    useEffect(() => {
        doScrollToTop();
    }, [page, numOfEntries]);

    function handleNumOfEntriesChange(entriesNumber) {
        setNumOfEntries(entriesNumber);
        setPage(1);
        setBatchesToDisplay(1);
    }

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
        setBatchesToDisplay(1);
    }

    function handlePageIncrease() {
        setPage(page < calculateNumOfPages(numOfEntries) ? page + 1 : page);
        setBatchesToDisplay(1);
    }

    function handlePageDecrease() {
        setPage(page > 1 ? page - 1 : page);
        setBatchesToDisplay(1);
    }

    function handleLoadMoreClick() {
        setBatchesToDisplay(batchesToDisplay + 1);
    }

    function getRegion() {
        return props.region;
    }

    function getPageType() {
        return props.pageType;
    }

    function isGeneralQuestionsPage() {
        return getPageType() === PAGE_TYPES.GENERAL;
    }

    function calculateNumOfPages() {
        return Math.ceil(questions.length / numOfEntries);
    }

    const maxItemsToDisplay = BATCH_SIZE * batchesToDisplay;
    const pageSecondaryTitle = isGeneralQuestionsPage(props) ? "General Questions" : getRegionPrettyName(getRegion());

    const paginationElement = (
        <Pagination
            numOfPages={calculateNumOfPages()}
            currentPage={page}
            numOfEntries={numOfEntries}
            maxEntries={questions.length}
            allowedNumOfEntries={ALLOWED_NUMBER_OF_ENTRIES}
            pageChangeHandler={handlePageChange}
            pageIncreaseHandler={handlePageIncrease}
            pageDecreaseHandler={handlePageDecrease}
            entriesNumberChangeHandler={handleNumOfEntriesChange}
        />
    );
    return (
        <React.Fragment>
            <header className="uk-margin-small-bottom">
                <h1 className="uk-heading-bullet uk-text-light">
                    Flash Cards <span
                    className="page__header__secondary marker uk-text-meta uk-text-large uk-text-light">{pageSecondaryTitle}</span>
                </h1>
            </header>

            <section>
                {isGeneralQuestionsPage() && paginationElement}
                <hr/>
                <div className="uk-child-width-1-2@l uk-grid-small uk-margin-medium-bottom"
                     data-uk-grid="masonry: true">

                    {
                        getSlice(questions,
                            numOfEntries,
                            page - 1,
                            maxItemsToDisplay).map((q) => {
                            return (
                                <Card
                                    key={q.qid}
                                    question={q}
                                    interactionMode={interactionModes.PRESS}
                                    infoBoxContent={q.qid}
                                    questionText={q.question.text}
                                />
                            );
                        })
                    }
                </div>
                <div className={numOfEntries <= maxItemsToDisplay ? 'uk-hidden' : ''}>
                    <LoadMoreButton clickHandler={handleLoadMoreClick}/>
                </div>
                <hr/>
                {isGeneralQuestionsPage() && paginationElement}
            </section>
        </React.Fragment>
    )

}

function getSlice(questions, numOfEntries, page, itemsToDisplay) {
    const start = page * numOfEntries;
    const end = (parseInt(page) + 1) * numOfEntries;
    let slice = questions.slice(start, end);

    if (slice.length > itemsToDisplay) {
        slice = slice.slice(0, itemsToDisplay);
    }

    return slice;
}

function LoadMoreButton(props) {
    return (
        <div className="uk-child-width-1-1@l uk-padding-large uk-padding-remove-top uk-padding-remove-bottom">
            <button
                className="uk-button uk-button-default uk-align-center"
                onClick={props.clickHandler}
            >
                More
            </button>
        </div>
    )
}

export default FlashCardPage;