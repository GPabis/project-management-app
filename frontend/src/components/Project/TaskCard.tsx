import styled from 'styled-components';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import { tertiaryColor } from './../../utils/styleVariables';
import CommentForm from './CommentForm';
import UpdateStatusForm from './UpdateStatusForm';
import { useParams } from 'react-router-dom';
import { ITask } from '../../types/project-types';
import { useState, useEffect, useContext } from 'react';
import ProjectContext from '../../store/project-context';
import moment from 'moment';
import NotificationContext from '../../store/notification-context';

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

const CommentInfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
`;

const CommentInfoText = styled.p`
    font-size: 1.6rem;
    margin: 0.2rem 0;
    min-width: 10rem;
`;

const TaskText = styled.p<{ center?: boolean }>`
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

const TaskCard = () => {
    const { id, taskId } = useParams<{ id: string; taskId: string }>();
    const projectCtx = useContext(ProjectContext);
    const notificationCtx = useContext(NotificationContext);

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
    }, []);

    return (
        <TaskCardContainer>
            <SecoundaryHeadline>{task?.taskName}</SecoundaryHeadline>

            <TaskInfoHeadline>Start:</TaskInfoHeadline>
            <TaskText center={true}>{moment(task?.taskDateStart).format('DD.MM.YYYY')}</TaskText>

            <TaskInfoHeadline>Deadline:</TaskInfoHeadline>
            <TaskText center={true}>{moment(task?.taskDateEnd).format('DD.MM.YYYY')}</TaskText>

            <TaskInfoHeadline>Task author:</TaskInfoHeadline>
            <TaskText center={true}>{task?.taskAuthor}</TaskText>

            <TaskInfoHeadline>Task responsible:</TaskInfoHeadline>
            <TaskText center={true}>{task?.taskResponsible}</TaskText>

            <UpdateStatusForm currentStatus={task?.taskStatus} />

            <TaskInfoHeadline>Description:</TaskInfoHeadline>
            <TaskText>{task?.taskDescription}</TaskText>

            <TaskInfoHeadline>Comments:</TaskInfoHeadline>

            <CommentInfoRow>
                <CommentInfoText>Gpabis</CommentInfoText> <CommentInfoText>On: 20.10.2021, 12:30</CommentInfoText>
            </CommentInfoRow>
            <TaskText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, laudantium!</TaskText>

            <CommentForm />
        </TaskCardContainer>
    );
};

export default TaskCard;
