import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import { validateEmail, validatePassword, getServerErrorResponse } from '../../utils/validateForm';
import Container from '../util/Container';
import { Submit, FormField, Label, Input, ErrorLabel, Form } from '../util/Form';

const Login = () => {
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);
    const history = useHistory();

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

    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            email: enteredEmail,
            password: enteredPassword,
        };

        try {
            const response = await fetch('http://localhost:8080/login', {
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
                const { token, username, email } = await response.json();
                notificationCtx.setNotification(false, 'You are logged in!');
                authCtx.setEmailHandler(email);
                authCtx.setUsernameHandler(username);
                authCtx.login(token, username, email);
                history.push('/dashboard');
            }
        } catch (error) {
            await JSON.parse(error);
            notificationCtx.setNotification(true, error.errorMessage);
        }
    };

    return (
        <Container center={true}>
            <Form onSubmit={loginHandler}>
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

export default Login;
