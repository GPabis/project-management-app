import Container from '../util/Container';
import { useParams } from 'react-router-dom';
import ProjectContext from '../../store/project-context';
import { useContext, useEffect } from 'react';
import Headline from './../util/Headline';
import styled from 'styled-components';
import { secoundaryColor } from '../../utils/styleVariables';
import TaskListCard from './TaskListCard';
import moment from 'moment';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';

const TaskContainer = styled.div`
    display: flex;
    overflow-x: auto;
`;

const TaskList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 2rem;
    min-width: 21rem;
    width: calc(20% - 4rem);
    flex: 0 0 auto;
`;

const TaskHeadline = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0rem;
    margin: 2rem 0;
    box-shadow: 0rem 0rem 0.5rem 0.2rem #ddd;
    font-size: 1.8rem;
    font-weight: 700;
    transition: all 0.3s;
    height: 5rem;
`;

const TaskHeadlineText = styled.p`
    color: ${secoundaryColor};
    font-size: 1.8rem;
    font-weight: 700;
`;

const SingleProject = () => {
    const { id } = useParams<{ id: string }>();

    const projectCtx = useContext(ProjectContext);

    useEffect(() => {
        if (id && (!projectCtx.project || id !== projectCtx.project?.projectId)) {
            projectCtx.getProject(id);
        }
    }, []);

    const statuses = ['WAITING', 'IN-PROGRESS', 'IN-REVIEW', 'IN-TEST', 'DONE'];

    const tasks = statuses.map((status) =>
        projectCtx.project?.projectTasks
            .filter((task) => task.taskStatus.toString() === status)
            .map((taskByCategory) => {
                const taskTitle = taskByCategory.taskName;
                const taskUsername = projectCtx.project?.projetTeamData.find(
                    (user) => user._id === taskByCategory.taskResponsible,
                )?.username;
                const taskStartData = moment(taskByCategory.taskDateStart).format('DD/MM');
                const taskEndData = moment(taskByCategory.taskDateEnd).format('DD/MM');
                return (
                    <TaskListCard
                        key={taskByCategory._id}
                        taskId={taskByCategory._id}
                        title={taskTitle}
                        username={taskUsername || ''}
                        dateSt={taskStartData}
                        dateEnd={taskEndData}
                    ></TaskListCard>
                );
            }),
    );

    return (
        <Container>
            <Headline>Project: {projectCtx.project?.projectName}</Headline>
            <TaskContainer>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>WAITING</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks[0]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>IN-PROGRESS</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks[1]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>IN-REVIEW</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks[2]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>IN-TEST</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks[3]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>DONE</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks[4]}
                </TaskList>
            </TaskContainer>
        </Container>
    );
};

export default SingleProject;
