import Container from '../util/Container';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import ProjectContext from '../../store/project-context';
import { useContext, useEffect } from 'react';
import Headline from './../util/Headline';
import styled from 'styled-components';
import { secoundaryColor, tertiaryColor } from '../../utils/styleVariables';
import TaskListCard from './TaskListCard';
import moment from 'moment';
import { createPortal } from 'react-dom';
import TaskCard from './Task/TaskCard';
import Paragraph from '../util/Paragraph';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import { getServerErrorResponse } from './../../utils/validateForm';

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

const ProjectDashboardMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const ProjectDashboardButton = styled.button<{ nav?: boolean }>`
    background: #fff;
    border: 2px solid ${tertiaryColor};
    border-radius: 2rem;
    color: ${secoundaryColor};
    outline: none;
    padding: 1rem 1.5rem;
    margin: 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s;
    text-transform: uppercase;

    &:hover {
        background: ${tertiaryColor};
        color: #fff;
    }

    &:disabled {
        background: #aaa;
        color: ${secoundaryColor};
        cursor: default;
    }

    a {
        padding: 1rem 1.5rem;
    }
`;

const SingleProject = () => {
    const { id } = useParams<{ id: string }>();
    const projectCtx = useContext(ProjectContext);
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);
    const history = useHistory();

    useEffect(() => {
        if (id && (!projectCtx.project || id !== projectCtx.project?.projectId)) {
            projectCtx.getProject(id);
        }
    }, [projectCtx.project]);

    const statuses = ['WAITING', 'IN-PROGRESS', 'IN-REVIEW', 'IN-TEST', 'DONE'];

    const tasks =
        projectCtx.project?.projectTasks === undefined
            ? null
            : statuses.map((status) =>
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

    const leaveProjectHandler = async () => {
        try {
            if (!authCtx.token || !authCtx.email) return authCtx.logout();

            const response = await fetch(`http://localhost:8080/project/${id}/teammate/leave`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': authCtx.token,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const { error, messages } = await getServerErrorResponse(response);
                notificationCtx.setNotification(error, messages);
            }

            if (response.ok) {
                const { error, messages }: { error: boolean; messages: string } = await response.json();
                notificationCtx.setNotification(error, messages);
                projectCtx.getProject(id);
                history.push('/dashboard');
            }
        } catch (error) {
            await JSON.parse(error);
            notificationCtx.setNotification(true, error.errorMessage);
        }
    };

    return (
        <Container>
            <Headline>Project: {projectCtx.project?.projectName}</Headline>
            <Paragraph center={true}>{projectCtx.project?.projectDescription}</Paragraph>
            <ProjectDashboardMenu>
                <ProjectDashboardButton nav={true}>
                    <NavLink to={`/dashboard/projects/${id}/add-task`}>Add Task</NavLink>
                </ProjectDashboardButton>
                <ProjectDashboardButton>
                    <NavLink to={`/dashboard/projects/${id}/invite`}>Invite Teammate</NavLink>
                </ProjectDashboardButton>
                {authCtx._id === projectCtx.project?.projectAdmin && (
                    <ProjectDashboardButton>
                        <NavLink to={`/dashboard/projects/${id}/delete`}>Delete Project</NavLink>
                    </ProjectDashboardButton>
                )}
                {!(authCtx._id === projectCtx.project?.projectAdmin) && (
                    <ProjectDashboardButton onClick={leaveProjectHandler}>Leave project</ProjectDashboardButton>
                )}
            </ProjectDashboardMenu>
            <TaskContainer>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>WAITING</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks && tasks[0]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>IN-PROGRESS</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks && tasks[1]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>IN-REVIEW</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks && tasks[2]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>IN-TEST</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks && tasks[3]}
                </TaskList>
                <TaskList>
                    <TaskHeadline>
                        <TaskHeadlineText>DONE</TaskHeadlineText>
                    </TaskHeadline>
                    {tasks && tasks[4]}
                </TaskList>
            </TaskContainer>
        </Container>
    );
};

export default SingleProject;
