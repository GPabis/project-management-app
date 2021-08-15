import styled from 'styled-components';
import SecoundaryHeadline from '../../util/SecoundaryHeadline';
import { tertiaryColor } from '../../../utils/styleVariables';
import CommentForm from './Comments/CommentForm';
import UpdateStatusForm from '../UpdateStatusForm';
import { useParams, useHistory } from 'react-router-dom';
import { ITask } from '../../../types/project-types';
import { useState, useEffect, useContext } from 'react';
import ProjectContext from '../../../store/project-context';
import moment from 'moment';
import NotificationContext from '../../../store/notification-context';
import { Submit } from '../../util/Form';
import AuthContext from '../../../store/auth-context';
import Paragraph from '../../util/Paragraph';
import DeleteTask from './DeleteTask';
import Comments from './Comments/Comments';
import TaskField from './TaskField';

const TaskCardContainer = styled.div`
    min-height: 50rem;
    width: clamp(28rem, 100%, 60rem);
    overflow-y: auto;
    box-shadow: 0rem 0rem 0.5rem 0.2rem #ddd;
    position: fixed;
    max-height: 90vh;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 1rem 5rem;
`;

export const TaskText = styled.p<{ center?: boolean }>`
    text-align: ${({ center }) => (center ? 'center' : 'justify')};
    font-size: 1.4rem;
    margin: 0;
`;

export const TaskInfoHeadline = styled.h4`
    text-align: center;
    color: ${tertiaryColor};
    font-size: 1.7rem;
    margin-top: 1rem;
    font-weight: 900;
`;

const TaskInfo = styled.button`
    text-align: center;
    font-size: 1.4rem;
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    margin-top: 1rem;
    background: none;
    transition: all 0.3s;

    &:hover {
        color: ${tertiaryColor};
    }
`;

const TaskInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const TaskCard = () => {
    const { taskId } = useParams<{ id: string; taskId: string }>();
    const projectCtx = useContext(ProjectContext);
    const notificationCtx = useContext(NotificationContext);
    const authCtx = useContext(AuthContext);
    const [task, setTask] = useState<ITask | null>(null);

    useEffect(() => {
        const currentTask = projectCtx.project?.projectTasks.find((task) => task._id === taskId);
        if (currentTask === undefined) {
            notificationCtx.setNotification(true, 'Something wrong. Please reload page!');
            return;
        }
        const author = projectCtx.project?.projetTeamData.find((user) => user._id === currentTask.taskAuthor)?.username;
        const responsible = projectCtx.project?.projetTeamData.find(
            (user) => user._id === currentTask.taskResponsible,
        )?.username;

        if (!author || !responsible) {
            notificationCtx.setNotification(true, 'Something wrong. Please reload page!');
            return;
        }

        setTask({
            _id: currentTask._id,
            taskName: currentTask.taskName,
            taskDescription: currentTask.taskDescription,
            taskAuthor: author,
            taskComments: currentTask.taskComments,
            taskDateEnd: currentTask.taskDateEnd,
            taskDateStart: currentTask.taskDateStart,
            taskResponsible: responsible,
            taskStatus: currentTask.taskStatus,
        });
    }, [projectCtx.project]);

    const card = (
        <>
            <SecoundaryHeadline>{task?.taskName}</SecoundaryHeadline>

            <TaskField value={moment(task?.taskDateStart).format('DD.MM.YYYY')} label="Start:" />
            <TaskField value={moment(task?.taskDateEnd).format('DD.MM.YYYY')} label="Deadline:" />
            <TaskField value={task?.taskAuthor} label="Task author:" />
            <TaskField value={task?.taskResponsible} label="Task responsible:" />

            <UpdateStatusForm currentStatus={task?.taskStatus} />

            <TaskInfoHeadline>Description:</TaskInfoHeadline>
            <TaskText>{task?.taskDescription}</TaskText>

            <Comments task={task} />

            {task?.taskAuthor === authCtx.username && (
                <ButtonContainer>
                    <DeleteTask />
                    <Submit>Edit</Submit>
                </ButtonContainer>
            )}
        </>
    );

    return (
        <TaskCardContainer>
            {!task && <Paragraph>Loading...</Paragraph>}
            {task && card}
        </TaskCardContainer>
    );
};

export default TaskCard;
