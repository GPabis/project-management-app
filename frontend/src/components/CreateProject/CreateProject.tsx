import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import AuthContext from '../../store/auth-context';
import {
    validateProjectName,
    validateProjectDescription,
    ErrorFromServer,
    getServerErrorResponse,
} from '../../utils/validateForm';
import Container from '../util/Container';
import { Submit, FormField, Label, Input, ErrorLabel, Form } from '../util/Form';

interface CreateProjectBody {
    userEmail: string;
    projectName: string;
    projectDescription: string;
}

const CreateProject = () => {
    const [errorFromServer, setErrorFromServer] = useState<ErrorFromServer>({
        error: false,
        messages: [],
    });

    const history = useHistory();
    const authCtx = useContext(AuthContext);

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
            userEmail: authCtx.email,
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
                setErrorFromServer(await getServerErrorResponse(response));
            }

            const data = await response.json();

            history.push(`/dashboard/your-projects/${data._id}`);
        } catch (err) {
            setErrorFromServer(err);
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
                {errorFromServer.error &&
                    errorFromServer.messages.map((message, index) => <ErrorLabel key={index}>{message}</ErrorLabel>)}
            </Form>
        </Container>
    );
};

export default CreateProject;
