import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import NotificationContext from '../../../store/notification-context';
import ProjectContext from '../../../store/project-context';
import { getServerErrorResponse } from '../../../utils/validateForm';
import { useHistory, useParams } from 'react-router-dom';
import { Submit } from '../../util/Form';

const DeleteTask = () => {
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);
    const projectCtx = useContext(ProjectContext);
    const history = useHistory();
    const { id, taskId } = useParams<{ id: string; taskId: string }>();

    const deleteTaskHandler = async () => {
        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        const response = await fetch(`http://localhost:8080/project/${id}/task/${taskId}`, {
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
            history.push(`/dashboard/projects/${id}`);
        }
    };

    return <Submit onClick={deleteTaskHandler}>Delete</Submit>;
};

export default DeleteTask;
