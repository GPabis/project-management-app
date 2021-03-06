import Container from '../util/Container';
import { Form, FormField, Label, Input, ErrorLabel, Submit, Textarea, Select, Option } from '../util/Form';
import useInput from '../../hooks/use-input';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import ProjectContext from '../../store/project-context';
import {
    validateDescription,
    validateTitle,
    validateDate,
    getServerErrorResponse,
    validateID,
} from './../../utils/validateForm';

const AddTask = () => {
    const { id } = useParams<{ id: string }>();
    const projectCtx = useContext(ProjectContext);
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        errorMessage: titleErrorMsg,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset,
    } = useInput(validateTitle);

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        errorMessage: descriptionErrorMsg,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
    } = useInput(validateDescription);

    const {
        value: enteredDateStart,
        isValid: enteredDateStartIsValid,
        errorMessage: dateStartErrorMsg,
        hasError: dateStartInputHasError,
        valueChangeHandler: dateStartChangedHandler,
        inputBlurHandler: dateStartBlurHandler,
        reset: dateReset,
    } = useInput(validateDate);

    const {
        value: enteredDeadline,
        isValid: enteredDeadlineIsValid,
        errorMessage: deadlineErrorMsg,
        hasError: deadlineInputHasError,
        valueChangeHandler: deadlineChangedHandler,
        inputBlurHandler: deadlineBlurHandler,
        reset: deadlineReset,
    } = useInput(validateDate);

    const {
        value: enteredTaskResponsible,
        isValid: enteredTaskResponsibleIsValid,
        errorMessage: taskResponsibleErrorMsg,
        hasError: taskResponsibleInputHasError,
        valueChangeHandler: taskResponsibleChangedHandler,
        inputBlurHandler: taskResponsibleBlurHandler,
        reset: responsibleReset,
    } = useInput(validateID);

    useEffect(() => {
        if (id) {
            projectCtx.getProject(id);
        }
    }, []);

    const submitTaskHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        const formBody = {
            taskName: enteredTitle,
            taskDescription: enteredDescription,
            taskDateStart: enteredDateStart,
            taskDateEnd: enteredDeadline,
            taskResponsible: enteredTaskResponsible,
        };

        try {
            const response = await fetch(`http://localhost:8080/project/${id}/task`, {
                method: 'POST',
                headers: {
                    'x-access-token': authCtx.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formBody),
            });

            if (!response.ok) {
                const { error, messages } = await getServerErrorResponse(response);
                notificationCtx.setNotification(error, messages);
            }

            if (response.ok) {
                const { error, messages }: { error: boolean; messages: string } = await response.json();
                notificationCtx.setNotification(error, messages);
                projectCtx.getProject(id);
                titleReset();
                descriptionReset();
                dateReset();
                deadlineReset();
                responsibleReset();
            }
        } catch (error) {
            notificationCtx.setNotification(true, error.errorMessage);
        }
    };

    let formIsValid = false;

    if (
        enteredTitleIsValid &&
        enteredDescriptionIsValid &&
        enteredDateStartIsValid &&
        enteredDeadlineIsValid &&
        enteredTaskResponsibleIsValid
    ) {
        formIsValid = true;
    }

    const teamOptions = !(projectCtx.project && projectCtx.project.projetTeamData) ? (
        <Option>Brak cz??onk??w zespo??u</Option>
    ) : (
        projectCtx.project.projetTeamData.map((person) => (
            <Option key={person._id} value={person._id}>
                {person.username} ( {person.email} )
            </Option>
        ))
    );

    return (
        <Container center={true}>
            <SecoundaryHeadline>Add task to project "{projectCtx.project?.projectName}"</SecoundaryHeadline>
            <Form onSubmit={submitTaskHandler}>
                <FormField>
                    <Label>Task Title: </Label>
                    <Input
                        type="text"
                        id="taskTitle"
                        onChange={titleChangedHandler}
                        onBlur={titleBlurHandler}
                        value={enteredTitle}
                    />
                    {titleInputHasError && <ErrorLabel>{titleErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>Task Description: </Label>
                    <Textarea
                        id="taskDescription"
                        onChange={descriptionChangedHandler}
                        onBlur={descriptionBlurHandler}
                        value={enteredDescription}
                    />
                    {descriptionInputHasError && <ErrorLabel>{descriptionErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>Task Start: </Label>
                    <Input
                        type="date"
                        id="taskDateStart"
                        onChange={dateStartChangedHandler}
                        onBlur={dateStartBlurHandler}
                        value={enteredDateStart}
                    />
                    {dateStartInputHasError && <ErrorLabel>{dateStartErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>Task Deadline: </Label>
                    <Input
                        type="date"
                        id="taskDateDeadline"
                        onChange={deadlineChangedHandler}
                        onBlur={deadlineBlurHandler}
                        value={enteredDeadline}
                    />
                    {deadlineInputHasError && <ErrorLabel>{deadlineErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>Responsible: </Label>
                    <Select
                        onChange={taskResponsibleChangedHandler}
                        onBlur={taskResponsibleBlurHandler}
                        value={enteredTaskResponsible}
                    >
                        <Option value={0} selected hidden>
                            Select responsible person
                        </Option>
                        {teamOptions}
                    </Select>
                    {taskResponsibleInputHasError && <ErrorLabel>{taskResponsibleErrorMsg}</ErrorLabel>}
                </FormField>
                <Submit disabled={!formIsValid}>Submit Task</Submit>
            </Form>
            <Submit>
                <NavLink to={`/dashboard/projects/${id}`}>Back to the Project</NavLink>
            </Submit>
        </Container>
    );
};

export default AddTask;
