import {useState} from "react";
export const useFormValidationStep1 = (regStore) => {
    const [errors, setErrors] = useState({name: false, industry: false, companySize: false, position: false,
        surName: false, firstName: false});
    const validate = () => {
        const nameError = regStore.name === '';
        const industryError = regStore.industry === '';
        const companySizeError = regStore.companySize === '';
        const positionError = regStore.position === '';
        const surNameError = regStore.contractor.surName === '';
        const firstNameError = regStore.contractor.firstName === '';

        setErrors({name: nameError, industry: industryError, companySize: companySizeError, position: positionError,
            surName: surNameError, firstName: firstNameError});

        return !nameError && !industryError && !companySizeError && !positionError && !surNameError
            && !firstNameError;
    };

    return {errors, validate};
};