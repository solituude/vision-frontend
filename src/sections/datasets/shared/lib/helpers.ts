export const getLabelByWindowWidth = (str: string) => {
    return window.innerWidth > 1200 ? str : '';
}