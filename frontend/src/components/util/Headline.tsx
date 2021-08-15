import styled from 'styled-components';
import { tertiaryColor } from '../../utils/styleVariables';

const Headline = styled.h1<{ size?: number }>`
    font-size: 3.5rem;
    color: ${tertiaryColor};
    text-align: center;
    margin: 3rem 0;
`;

export default Headline;
