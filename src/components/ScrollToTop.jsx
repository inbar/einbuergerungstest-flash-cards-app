import  { useEffect } from 'react';

export function doScrollToTop() {
    try {
        // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(0, 0);
    }
}

// Component that attaches scroll to top handler on router change
// renders nothing, just attaches side effects
export const ScrollToTop = (props) => {
    // this assumes that current router state is accessed via hook
    // but it does not matter, pathname and search (or that ever) may come from props, context, etc.
    const location  = props.location;

    // just run the effect on pathname and/or search change
    useEffect(() => {
       doScrollToTop();
    }, [location.pathname]);

    // renders nothing, since nothing is needed
    return null;
};