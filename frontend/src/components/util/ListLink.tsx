import styled from 'styled-components';
import { secoundaryColor } from '../../utils/styleVariables';

const ListLink = styled.span`
    display: block;
    width: 100%;
    height: 100%;
    color: ${secoundaryColor};
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    a {
        padding: 1rem 0;
        display: inline-block;
        width: 100%;
    }
`;

export default ListLink;
