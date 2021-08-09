import { useState } from 'react';

export interface validateValue {
    isValid: boolean;
    errorMsg: string;
}

const useInput = (validateValue: (enteredValue: string) => validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue).isValid;
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLOptionElement>
            | React.FormEvent<HTMLDataElement>,
    ) => {
        setErrorMessage(validateValue(enteredValue).errorMsg);
        setEnteredValue(event.currentTarget.value);
    };

    const inputBlurHandler = (
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLOptionElement>
            | React.FormEvent<HTMLDataElement>,
    ) => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    const setDefault = (value: string | Date) => {
        setEnteredValue(value.toString());
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        errorMessage,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        setDefault,
    };
};

export default useInput;
