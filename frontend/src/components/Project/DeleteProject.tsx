import Container from '../util/Container';
import Headline from '../util/Headline';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import ProjectContext from '../../store/project-context';
import { Submit } from '../util/Form';
import NotificationContext from '../../store/notification-context';
import AuthContext from '../../store/auth-context';
import { getServerErrorResponse } from './../../utils/validateForm';

const DeleteProject = () => {
    const { id } = useParams<{ id: string }>();
    const projectCtx = useContext(ProjectContext);
    const notificationCtx = useContext(NotificationContext);
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (id) {
            projectCtx.getProject(id);
        }
    }, []);

    const deleteProjectHandler = async () => {
        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        try {
            const response = await fetch(`http://localhost:8080/project/${id}`, {
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
        <Container center={true}>
            <Headline>Are you sure you want to delete project "{projectCtx.project?.projectName}"</Headline>
            <Submit onClick={deleteProjectHandler}>Delete "{projectCtx.project?.projectName}"</Submit>
            <Submit>
                <NavLink to={`/dashboard/projects/${id}`}>Back to the Project</NavLink>
            </Submit>
        </Container>
    );
};

export default DeleteProject;
