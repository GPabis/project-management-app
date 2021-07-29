import styled from 'styled-components';
import { secoundaryColor } from '../../../utils/styleVariables';

const Form = styled.form`
    margin: 5rem auto;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: clamp(30rem, 100%, 50rem);
    box-shadow: 0rem 0rem 1rem 0.2rem #ddd;
`;

export default Form;
