import { validateValue } from '../hooks/use-input';

const validateLength = (input: string, maxLength: number) => {
    return input.trim().length >= 5 && input.trim().length <= maxLength;
};

export const validateUsername = (input: string): validateValue => {
    if (!validateLength(input, 30))
        return { isValid: false, errorMsg: 'Username lenght should be between 5 and 30 letters' };

    return { isValid: true, errorMsg: '' };
};

export const validateEmail = (input: string): validateValue => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(input.toLocaleLowerCase())) return { isValid: false, errorMsg: 'Email is not correct!' };

    if (!validateLength(input, 50))
        return { isValid: false, errorMsg: 'Email lenght should be between 5 and 50 letters' };

    return { isValid: true, errorMsg: '' };
};

export const validatePassword = (input: string): validateValue => {
    if (!validateLength(input, 30))
        return { isValid: false, errorMsg: 'Password lenght should be between 5 and 30 letters' };

    return { isValid: true, errorMsg: '' };
};
