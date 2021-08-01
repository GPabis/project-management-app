import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import NotificationContext from '../../store/notification-context';
import { validateEmail, validatePassword, validateUsername, getServerErrorResponse } from '../../utils/validateForm';
import Container from '../util/Container';
import { Submit, FormField, Label, Input, ErrorLabel, Form } from '../util/Form';

const Register = () => {
    const history = useHistory();
    const notificationCtx = useContext(NotificationContext);

    const {
        value: enteredUsername,
        isValid: enteredUsernameIsValid,
        errorMessage: usernameErrorMsg,
        hasError: usernameInputHasError,
        valueChangeHandler: usernameChangedHandler,
        inputBlurHandler: usernameBlurHandler,
    } = useInput(validateUsername);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        errorMessage: emailErrorMsg,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(validateEmail);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        errorMessage: passwordErrorMsg,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(validatePassword);

    let formIsValid = false;

    if (enteredUsernameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            email: enteredEmail,
            username: enteredUsername,
            password: enteredPassword,
        };

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const { error, messages } = await getServerErrorResponse(response);
                notificationCtx.setNotification(error, messages);
            }

            if (response.ok) {
                notificationCtx.setNotification(false, ['You created account. You can login now!']);
                history.push('/login');
            }
        } catch (err) {
            notificationCtx.setNotification(false, [err]);
        }
    };

    return (
        <Container center={true}>
            <Form onSubmit={registerHandler}>
                <FormField>
                    <Label>Username:</Label>
                    <Input
                        type="text"
                        id="username"
                        onChange={usernameChangedHandler}
                        onBlur={usernameBlurHandler}
                        value={enteredUsername}
                    />
                    {usernameInputHasError && <ErrorLabel>{usernameErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>E-mail:</Label>
                    <Input
                        type="email"
                        id="email"
                        onChange={emailChangedHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                    />
                    {emailInputHasError && <ErrorLabel>{emailErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        id="email"
                        onChange={passwordChangedHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                    />
                    {passwordInputHasError && <ErrorLabel>{passwordErrorMsg}</ErrorLabel>}
                </FormField>
                <Submit disabled={!formIsValid}>Submit</Submit>
            </Form>
        </Container>
    );
};

export default Register;
