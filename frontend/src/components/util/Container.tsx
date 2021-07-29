import styled from 'styled-components';

interface ContainerProps {
    center?: boolean;
}

const Container = styled.div<ContainerProps>`
    height: auto;
    width: 100%;
    max-width: 1750px;
    ${({ center }) =>
        center &&
        `
  display: flex;
  justify-content: center;
  align-item: center;
  flex-direction: column;
  `}
`;

export default Container;
