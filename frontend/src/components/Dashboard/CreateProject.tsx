import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import {
    validateProjectName,
    validateProjectDescription,
    ErrorFromServer,
    getServerErrorResponse,
} from '../../utils/validateForm';
import Container from '../util/Container';
import { Submit, FormField, Label, Input, ErrorLabel, Form } from '../util/Form';

interface CreateProjectBody {
    projectName: string;
    projectDescription: string;
}

const CreateProject = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);

    const {
        value: enteredProjectName,
        isValid: enteredProjectNameIsValid,
        errorMessage: projectNameErrorMsg,
        hasError: projectNameInputHasError,
        valueChangeHandler: projectNameChangedHandler,
        inputBlurHandler: projectNameBlurHandler,
    } = useInput(validateProjectName);

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        errorMessage: descriptionErrorMsg,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useInput(validateProjectDescription);

    let formIsValid = false;

    if (enteredProjectNameIsValid && enteredDescriptionIsValid) {
        formIsValid = true;
    }

    const createProjectHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        const requestData: CreateProjectBody = {
            projectName: enteredProjectName,
            projectDescription: enteredDescription,
        };

        try {
            const response = await fetch('http://localhost:8080/create-project', {
                method: 'POST',
                headers: {
                    'x-access-token': authCtx.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const { error, messages } = await getServerErrorResponse(response);
                notificationCtx.setNotification(error, [...messages]);
            }

            const data = await response.json();
            notificationCtx.setNotification(false, [`You create project named "${data.projectName}"`]);
            history.push(`/dashboard/projects/${data._id}/invite`);
        } catch (err) {
            notificationCtx.setNotification(true, [err]);
        }
    };

    return (
        <Container center={true}>
            <Form onSubmit={createProjectHandler}>
                <FormField>
                    <Label>Project name:</Label>
                    <Input
                        type="text"
                        id="projectName"
                        onChange={projectNameChangedHandler}
                        onBlur={projectNameBlurHandler}
                        value={enteredProjectName}
                    />
                    {projectNameInputHasError && <ErrorLabel>{projectNameErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>Project description: </Label>
                    <Input
                        type="text"
                        id="description"
                        onChange={descriptionChangedHandler}
                        onBlur={descriptionBlurHandler}
                        value={enteredDescription}
                    />
                    {descriptionInputHasError && <ErrorLabel>{descriptionErrorMsg}</ErrorLabel>}
                </FormField>
                <Submit disabled={!formIsValid}>Submit</Submit>
            </Form>
        </Container>
    );
};

export default CreateProject;
