import styled from 'styled-components';
import { tertiaryColor, tertiaryColorHover } from '../../utils/styleVariables';

const LinkWrapper = styled.span`
    color: ${tertiaryColor};
    transition: all 0.4s;
    cursor: pointer;
    font-weight: 900;

    &:hover {
        color: ${tertiaryColorHover};
    }
`;

export default LinkWrapper;
