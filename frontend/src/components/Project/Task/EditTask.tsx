import Container from '../../util/Container';
import { Form, FormField, Label, Input, ErrorLabel, Submit, Textarea, Select, Option } from '../../util/Form';
import useInput from '../../../hooks/use-input';
import SecoundaryHeadline from '../../util/SecoundaryHeadline';
import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import NotificationContext from '../../../store/notification-context';
import ProjectContext from '../../../store/project-context';
import { validateDescription, validateDate, getServerErrorResponse, validateID } from './../../../utils/validateForm';
import { ITask } from './../../../types/project-types';
import moment from 'moment';

const EditTask = () => {
    const { id, taskId } = useParams<{ id: string; taskId: string }>();
    const projectCtx = useContext(ProjectContext);
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        errorMessage: descriptionErrorMsg,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
        setDefault: setDefaultDescription,
    } = useInput(validateDescription);

    const {
        value: enteredDateStart,
        isValid: enteredDateStartIsValid,
        errorMessage: dateStartErrorMsg,
        hasError: dateStartInputHasError,
        valueChangeHandler: dateStartChangedHandler,
        inputBlurHandler: dateStartBlurHandler,
        reset: dateReset,
        setDefault: setDefaultDateStart,
    } = useInput(validateDate);

    const {
        value: enteredDeadline,
        isValid: enteredDeadlineIsValid,
        errorMessage: deadlineErrorMsg,
        hasError: deadlineInputHasError,
        valueChangeHandler: deadlineChangedHandler,
        inputBlurHandler: deadlineBlurHandler,
        reset: deadlineReset,
        setDefault: setDefaultDeadline,
    } = useInput(validateDate);

    const {
        value: enteredTaskResponsible,
        isValid: enteredTaskResponsibleIsValid,
        errorMessage: taskResponsibleErrorMsg,
        hasError: taskResponsibleInputHasError,
        valueChangeHandler: taskResponsibleChangedHandler,
        inputBlurHandler: taskResponsibleBlurHandler,
        reset: responsibleReset,
        setDefault: setDefaultResponsible,
    } = useInput(validateID);

    useEffect(() => {
        if (id && (!projectCtx.project || projectCtx.project?.projectId !== id)) {
            projectCtx.getProject(id);
        }
        const task = projectCtx.project?.projectTasks.find((task: ITask) => task._id.toString() === taskId);
        const dateStart = task?.taskDateStart ? moment(task?.taskDateStart).valueOf() : '';
        const dateEnd = task?.taskDateStart ? moment(task?.taskDateEnd).valueOf() : '';
        setDefaultDescription(task?.taskDescription || '');
        setDefaultDateStart(new Date(dateStart) || '');
        setDefaultDeadline(new Date(dateEnd) || '');
        setDefaultResponsible(task?.taskResponsible || '');
    }, [projectCtx.project]);

    const submitTaskHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        const formBody = {
            taskDescription: enteredDescription,
            taskDateStart: enteredDateStart,
            taskDateEnd: enteredDeadline,
            taskResponsible: enteredTaskResponsible,
        };

        console.log(formBody);

        // try {
        //     const response = await fetch(`http://localhost:8080/project/${id}/task/${taskId}/edit`, {
        //         method: 'POST',
        //         headers: {
        //             'x-access-token': authCtx.token,
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formBody),
        //     });

        //     if (!response.ok) {
        //         const { error, messages } = await getServerErrorResponse(response);
        //         notificationCtx.setNotification(error, messages);
        //     }

        //     if (response.ok) {
        //         const { error, messages }: { error: boolean; messages: string } = await response.json();
        //         notificationCtx.setNotification(error, messages);
        //         projectCtx.getProject(id);
        //         descriptionReset();
        //         dateReset();
        //         deadlineReset();
        //         responsibleReset();
        //     }
        // } catch (error) {
        //     notificationCtx.setNotification(true, error.errorMessage);
        // }
    };

    let formIsValid = false;

    if (
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
            <SecoundaryHeadline>Edit task "{projectCtx.project?.projectName}"</SecoundaryHeadline>
            <Form onSubmit={submitTaskHandler}>
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
                        value={moment(enteredDateStart).format('YYYY-MM-DD')}
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
                        value={moment(enteredDeadline).format('YYYY-MM-DD')}
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

export default EditTask;
