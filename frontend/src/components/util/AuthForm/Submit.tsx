import styled from "styled-components";
import { secoundaryColor, tertiaryColor } from '../../../utils/styleVariables';


export const Submit = styled.button`
  background: #fff;
  border: 2px solid ${tertiaryColor};
  border-radius: 2rem;
  color: ${secoundaryColor};
  outline: none;
  padding: 1rem 2.5rem;
  margin: 1rem auto;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s;
  text-transform: uppercase;

  &:hover{
    background: ${tertiaryColor};
    color: #fff;
  }
`;

export default Submit;