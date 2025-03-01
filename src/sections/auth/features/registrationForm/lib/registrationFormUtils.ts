export function generatePassword(
    length: number = 12,
    options: {
        hasNumbers?: boolean;
        hasSymbols?: boolean;
        hasUppercase?: boolean;
        hasLowercase?: boolean;
    } = {}
): string {
    const {
        hasNumbers = true,
        hasSymbols = true,
        hasUppercase = true,
        hasLowercase = true,
    } = options;

    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';

    let characterPool = '';

    if (hasNumbers) characterPool += numbers;
    if (hasSymbols) characterPool += symbols;
    if (hasUppercase) characterPool += uppercaseLetters;
    if (hasLowercase) characterPool += lowercaseLetters;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }

    return password;
}

export const hasTrueField = (obj) => {
    const keys = Object.keys(obj);
    for (const i in keys) {
        if (keys[i])
            return true;
    }
    return false;
}

export const checkValidPhoneNumber = (phone) => {
    const phoneReg = /(?:\+|\d)[\d\-() ]{9,}\d/g;
    return phoneReg.test(phone);
}

export const checkValidEmail = (email) => {
    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    return emailReg.test(email);
}