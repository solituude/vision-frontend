export const getFormattedDate = (date: string) => {
    if (date?.length > 0) {
        return  date.slice(8, 10) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4);
    } else {
        return "--.--.----"
    }
}