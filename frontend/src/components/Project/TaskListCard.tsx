import styled from 'styled-components';
import { secoundaryColor } from '../../utils/styleVariables';
import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const TaskCard = styled.li`
    min-height: 6rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0rem 0rem 0.5rem 0.2rem #ddd;
    cursor: pointer;
    transition: all 0.3s;
    margin: 1rem 0;

    &:hover {
        box-shadow: 0rem 0rem 0.5rem 0.3rem #ccc;
    }
`;

const TaskTitle = styled.p`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${secoundaryColor};
`;

const TaskInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TaskInfoText = styled.p`
    font-size: 1.2rem;
    text-align: center;
    color: ${secoundaryColor};
`;

const TaskListCard: FC<{ title: string; taskId: string; username: string; dateSt: string; dateEnd: string }> = ({
    title,
    taskId,
    username,
    dateSt,
    dateEnd,
}) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const showTaskHandler = () => {
        history.push(`/dashboard/projects/${id}/task/${taskId}`);
    };

    return (
        <TaskCard onClick={showTaskHandler}>
            <TaskTitle>{title}</TaskTitle>
            <TaskInfo>
                <TaskInfoText>{username || 'No user asigned'}</TaskInfoText>
                <TaskInfoText>St.: {dateSt}</TaskInfoText>
                <TaskInfoText>End.: {dateEnd}</TaskInfoText>
            </TaskInfo>
        </TaskCard>
    );
};

export default TaskListCard;
