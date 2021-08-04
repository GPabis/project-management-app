import Container from '../util/Container';
import { Form, FormField, Label, Input, ErrorLabel, Submit, Textarea, Select, Option } from '../util/Form';
import useInput from '../../hooks/use-input';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import ProjectContext from '../../store/project-context';
import { validateDescription, validateTitle, validateDate, validateEmail } from './../../utils/validateForm';
import { IUserData } from './../../store/auth-context';

const AddTask = () => {
    const { id } = useParams<{ id: string }>();
    const projectCtx = useContext(ProjectContext);
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);
    const [team, setTeam] = useState<IUserData[]>([]);

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        errorMessage: titleErrorMsg,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
    } = useInput(validateTitle);

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        errorMessage: descriptionErrorMsg,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useInput(validateDescription);

    const {
        value: enteredDateStart,
        isValid: enteredDateStartIsValid,
        errorMessage: dateStartErrorMsg,
        hasError: dateStartInputHasError,
        valueChangeHandler: dateStartChangedHandler,
        inputBlurHandler: dateStartBlurHandler,
    } = useInput(validateDate);

    const {
        value: enteredDeadline,
        isValid: enteredDeadlineIsValid,
        errorMessage: deadlineErrorMsg,
        hasError: deadlineInputHasError,
        valueChangeHandler: deadlineChangedHandler,
        inputBlurHandler: deadlineBlurHandler,
    } = useInput(validateDate);

    const {
        value: enteredTaskAuthor,
        isValid: enteredTaskAuthorIsValid,
        errorMessage: taskAuthorErrorMsg,
        hasError: taskAuthorInputHasError,
        valueChangeHandler: taskAuthorChangedHandler,
        inputBlurHandler: taskAuthorBlurHandler,
    } = useInput(validateEmail);

    const {
        value: enteredTaskResponsible,
        isValid: enteredTaskResponsibleIsValid,
        errorMessage: taskResponsibleErrorMsg,
        hasError: taskResponsibleInputHasError,
        valueChangeHandler: taskResponsibleChangedHandler,
        inputBlurHandler: taskResponsibleBlurHandler,
    } = useInput(validateEmail);

    useEffect(() => {
        if (id) {
            projectCtx.getProject(id);
        }
    }, []);

    let formIsValid = false;

    if (
        enteredTitleIsValid &&
        enteredDescriptionIsValid &&
        enteredDateStartIsValid &&
        enteredDeadlineIsValid &&
        enteredTaskAuthorIsValid &&
        enteredTaskResponsibleIsValid
    ) {
        formIsValid = true;
    }

    const teamOptions = !(projectCtx.project && projectCtx.project.projetTeamData) ? (
        <Option>Brak członków zespołu</Option>
    ) : (
        projectCtx.project.projetTeamData.map((person) => (
            <Option key={person.email} value={person.email}>
                {person.username} ( {person.email} ){' '}
            </Option>
        ))
    );

    return (
        <Container center={true}>
            <SecoundaryHeadline>Add teammate to project "{projectCtx.project?.projectName}"</SecoundaryHeadline>
            <Form>
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
                    <Label>Task Created By: </Label>
                    <Select
                        onChange={taskAuthorChangedHandler}
                        onBlur={taskAuthorBlurHandler}
                        value={enteredTaskAuthor}
                    >
                        {teamOptions}
                    </Select>
                    {taskAuthorInputHasError && <ErrorLabel>{taskAuthorErrorMsg}</ErrorLabel>}
                </FormField>
                <FormField>
                    <Label>Responsible: </Label>
                    <Select
                        onChange={taskResponsibleChangedHandler}
                        onBlur={taskResponsibleBlurHandler}
                        value={enteredTaskResponsible}
                    >
                        {teamOptions}
                    </Select>
                    {taskResponsibleInputHasError && <ErrorLabel>{taskResponsibleErrorMsg}</ErrorLabel>}
                </FormField>
                <Submit disabled={!formIsValid}>Submit Task</Submit>
            </Form>
        </Container>
    );
};

export default AddTask;
