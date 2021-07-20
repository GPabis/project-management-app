import styled from "styled-components";

interface LayoutProps {
  background?: string,
}

const ContainerLayout = styled.div<LayoutProps>`
  background: ${props => props.background ? props.background : '#fffff'};
`

export default ContainerLayout;