import { Select, Option } from '../util/Form';
import { TaskInfoHeadline } from './Task/TaskCard';
import { FC, useContext } from 'react';
import { TaskStatus } from '../../types/project-types';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import { getServerErrorResponse } from './../../utils/validateForm';
import ProjectContext from '../../store/project-context';
import { useParams } from 'react-router-dom';

const UpdateStatusForm: FC<{ currentStatus: TaskStatus | undefined }> = ({ currentStatus }) => {
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);
    const projectCtx = useContext(ProjectContext);
    const { id, taskId } = useParams<{ id: string; taskId: string }>();

    const statuses = ['WAITING', 'IN-PROGRESS', 'IN-REVIEW', 'IN-TEST', 'DONE'].map((status) => (
        <Option key={status} value={status}>
            {status}
        </Option>
    ));

    let current = currentStatus ? currentStatus : 'WAITING';

    const changeStatusHandler = async (event: React.FormEvent<HTMLSelectElement>) => {
        let status = { status: event.currentTarget.value };

        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        try {
            const response = await fetch(`http://localhost:8080/project/${id}/task/${taskId}/update-status`, {
                method: 'PUT',
                headers: {
                    'x-access-token': authCtx.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(status),
            });

            if (!response.ok) {
                const { error, messages } = await getServerErrorResponse(response);
                notificationCtx.setNotification(error, messages);
            }

            if (response.ok) {
                const { error, messages }: { error: boolean; messages: string } = await response.json();
                notificationCtx.setNotification(error, messages);
                projectCtx.getProject(id);
            }
        } catch (error) {
            notificationCtx.setNotification(true, error.errorMessage);
        }
    };

    return (
        <form>
            <TaskInfoHeadline>Status</TaskInfoHeadline>
            <Select onChange={changeStatusHandler} defaultValue={current}>
                {statuses}
            </Select>
        </form>
    );
};

export default UpdateStatusForm;
