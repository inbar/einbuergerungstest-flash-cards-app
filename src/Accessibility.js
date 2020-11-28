function enterOrSpace(fn) {
    return (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            e.stopPropagation();
            fn.apply();
        }
    }
}

export {
    enterOrSpace
}