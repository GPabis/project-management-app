import styled from 'styled-components';
import { primaryColor } from '../../utils/styleVariables';

const NotificationContainer = styled.div<{ error?: boolean; visible: boolean }>`
    width: 100%;
    height: 3rem;
    position: fixed;
    top: ${({ visible }) => (visible ? '0' : '-20rem')};
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ error }) => (error ? 'red' : primaryColor)};
    transition: all 0.4s;
`;

export default NotificationContainer;
