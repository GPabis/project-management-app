import styled from 'styled-components';
import TaskCard from './TaskCard';
import { createPortal } from 'react-dom';
import { useHistory, useParams } from 'react-router-dom';

const Backdrop = styled.p`
    background: #000;
    opacity: 0.3;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    cursor: pointer;
`;

const Task = () => {
    const backdroopRoot = document.querySelector('#backdrop-root');
    const overlayRoot = document.querySelector('#overlay-root');

    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const hideTask = () => {
        history.push(`/dashboard/projects/${id}`);
    };

    return (
        <>
            {overlayRoot && createPortal(<TaskCard />, overlayRoot)}
            {backdroopRoot && createPortal(<Backdrop onClick={hideTask} />, backdroopRoot)}
        </>
    );
};

export default Task;
