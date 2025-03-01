export const checkFirstLogin = (): boolean => {
    const firstLogin = localStorage.getItem("isFirstLogin");
    if (firstLogin) {
        return firstLogin === "true";
    } else {
        localStorage.setItem("isFirstLogin", "true");
        return true;
    }
}