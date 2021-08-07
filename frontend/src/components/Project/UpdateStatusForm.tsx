import { Select, Option } from '../util/Form';
import { TaskInfoHeadline } from './TaskCard';
import { FC } from 'react';
import { TaskStatus } from '../../types/project-types';

const UpdateStatusForm: FC<{ currentStatus: TaskStatus | undefined }> = ({ currentStatus }) => {
    const statuses = ['WAITING', 'IN-PROGRESS', 'IN-REVIEW', 'IN-TEST', 'DONE'].map((status) => (
        <Option key={status} value={status}>
            {status}
        </Option>
    ));
    const current = currentStatus ? currentStatus : 'WAITING';
    return (
        <form>
            <TaskInfoHeadline>Status</TaskInfoHeadline>
            <Select defaultValue={current}>{statuses}</Select>
        </form>
    );
};

export default UpdateStatusForm;
