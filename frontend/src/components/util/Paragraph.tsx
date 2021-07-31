import styled from 'styled-components';
import { secoundaryColor } from '../../utils/styleVariables';

const Paragraph = styled.p<{ center?: boolean }>`
    font-size: 1.6rem;
    color: ${secoundaryColor};
    margin-bottom: 3rem;
    ${({ center }) => center && 'text-align: center;'};
`;

export default Paragraph;
