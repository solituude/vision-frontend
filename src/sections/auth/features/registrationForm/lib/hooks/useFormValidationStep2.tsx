import {useState} from "react";
import {checkValidEmail, checkValidPhoneNumber} from "../registrationFormUtils";

export const useFormValidationStep2 = (regStore) => {
    const [errors, setErrors] = useState({ phoneNumber: false, email: false, password: false });
    const validate = () => {
        const phoneError = !checkValidPhoneNumber(regStore.contractor.phoneNumber);
        const emailError = !checkValidEmail(regStore.contractor.email);
        const passwordError = regStore.contractor.password === '';

        setErrors({ phoneNumber: phoneError, email: emailError, password: passwordError });

        return !phoneError && !emailError && !passwordError;
    };

    return { errors, validate };
};