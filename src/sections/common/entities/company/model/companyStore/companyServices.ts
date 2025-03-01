export const companyServices = (store) => ({
    /**
     * Установление флага первого вхождения в систему на ложь
     */
    setIsFirstLoginFalse: () => {
        localStorage.setItem("isFirstLogin", "false");
        store.isFirstLogin = false;
    }
})