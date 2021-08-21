import Container from '../util/Container';
import { Form, FormField, Label, Input, ErrorLabel, Submit } from '../util/Form';
import { getServerErrorResponse, validateEmail } from '../../utils/validateForm';
import useInput from '../../hooks/use-input';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import ProjectContext from '../../store/project-context';

const AddTeammate = () => {
    const { id } = useParams<{ id: string }>();
    const projectCtx = useContext(ProjectContext);
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        errorMessage: emailErrorMsg,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(validateEmail);

    useEffect(() => {
        if (id) {
            projectCtx.getProject(id);
        }
    }, [id, projectCtx]);

    const addUserToProjectHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        const formData = {
            newUserEmail: enteredEmail,
        };

        try {
            const response = await fetch(`http://localhost:8080/project/${id}/teammate`, {
                method: 'PUT',
                headers: {
                    'x-access-token': authCtx.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const { error, messages } = await getServerErrorResponse(response);
                notificationCtx.setNotification(error, messages);
            }

            if (response.ok) {
                const { error, messages }: { error: boolean; messages: string } = await response.json();
                notificationCtx.setNotification(error, messages);
            }
            resetEmail();
        } catch (error) {
            await JSON.parse(error);
            notificationCtx.setNotification(true, error.errorMessage);
        }
    };

    let formIsValid = false;

    if (enteredEmailIsValid) {
        formIsValid = true;
    }

    return (
        <Container center={true}>
            <SecoundaryHeadline>Add teammate to project "{projectCtx.project?.projectName}"</SecoundaryHeadline>
            <Form onSubmit={addUserToProjectHandler}>
                <FormField>
                    <Label>Teammate email: </Label>
                    <Input
                        type="email"
                        id="newUserEmail"
                        onChange={emailChangedHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                    />
                    {emailInputHasError && <ErrorLabel>{emailErrorMsg}</ErrorLabel>}
                </FormField>
                <Submit disabled={!formIsValid}>Invite</Submit>
            </Form>
            <Submit>
                <NavLink to={`/dashboard/projects/${id}`}>Back to the Project</NavLink>
            </Submit>
        </Container>
    );
};

export default AddTeammate;
