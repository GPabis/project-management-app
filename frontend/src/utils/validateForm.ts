import { validateValue } from '../hooks/use-input';

export interface ErrorFromServer {
    error: boolean;
    messages: string;
}

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

export const validateTitle = (input: string): validateValue => {
    if (!validateLength(input, 80))
        return { isValid: false, errorMsg: 'Title lenght should be between 5 and 80 letters' };
    return { isValid: true, errorMsg: '' };
};

export const validateDescription = (input: string): validateValue => {
    if (!validateLength(input, 500))
        return { isValid: false, errorMsg: 'Description lenght should be between 5 and 500 letters' };
    return { isValid: true, errorMsg: '' };
};

export const validateDate = (input: string): validateValue => {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (input == '' && !input.match(re)) return { isValid: false, errorMsg: 'Invalid date' };
    if (new Date() >= new Date(input))
        return { isValid: false, errorMsg: 'You cannot set date before task was created' };
    return { isValid: true, errorMsg: '' };
};

export const getServerErrorResponse = async (response: Response) => {
    const error = await response.json();
    if (error.errorMessage) {
        const errorMessages: string = error.errorMessage;
        const errorFromServer: ErrorFromServer = {
            error: true,
            messages: errorMessages,
        };
        return errorFromServer;
    }
    return {
        error: false,
        messages: '',
    };
};
