import styled from 'styled-components';
import { tertiaryColor } from '../../../utils/styleVariables';

const Textarea = styled.textarea`
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid ${tertiaryColor};
    outline: none;
    font-size: 1.6rem;
    width: 100%;
    min-height: 20rem;
`;

export default Textarea;
