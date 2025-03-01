import Cookies from "universal-cookie";

/**
 * Функция выхода из системы, очищает куки и возвращает на страницу входа
 * */
export const requestLogout = () => {
    const cookies = new Cookies();
    const removeItems = ["XSRF-TOKEN", "company-info", "user-info", "token"];
    window.location.replace("/login");
    removeItems.map((item) => cookies.remove(item, {path: '/'}));
}