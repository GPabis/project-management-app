import { TaskInfoHeadline } from './TaskCard';
import styled from 'styled-components';
import { tertiaryColor } from '../../../utils/styleVariables';

const TaskInfo = styled.span`
    text-align: center;
    font-size: 1.4rem;
    margin: 0;
    font-weight: 600;
    margin-top: 1rem;
`;

const TaskInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TaskField: React.FC<{ value: string | undefined; label: string }> = ({ value, label }) => {
    return (
        <>
            <TaskInfoHeadline>{label}</TaskInfoHeadline>
            <TaskInfoContainer>
                <TaskInfo>{value}</TaskInfo>
            </TaskInfoContainer>
        </>
    );
};

export default TaskField;
