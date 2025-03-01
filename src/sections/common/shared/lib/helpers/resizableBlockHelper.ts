export const isResize = (size, direction="e") => {
    if (direction === "w") {
        // console.log(size);
        return ((size.width > 200 && size.width < window.innerWidth - 300) || (size.height > 150 && size.height < window.innerHeight - 150));
    }
    return ((size.width > 200 && size.width < window.innerWidth - 820) || (size.height > 150 && size.height < window.innerHeight - 150));
}

export const getValidSize = (num) => {
    if (!isFinite(num)) return "100%";
    return num;
}