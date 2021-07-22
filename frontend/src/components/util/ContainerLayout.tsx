import styled from "styled-components";

interface LayoutProps {
  background?: string,
}

const ContainerLayout = styled.div<LayoutProps>`
  background: ${({background})=> background ? background : '#fffff'};
`

export default ContainerLayout;