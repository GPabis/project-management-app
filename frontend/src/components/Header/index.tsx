import Container from "../util/Container";
import { tertiaryColor } from "../../utils/styleVariables";
import { NavLink, Link } from "react-router-dom";
import ContainerLayout from "../util/ContainerLayout";
import HeaderContainer from "./HeaderContainer";
import Logo from "./Logo";
import NavElement from "./NavElement";
import Nav from './Nav';
import { FC } from "react";

const Header:FC = ({children}) => {
  return (
  <>
    <ContainerLayout background={tertiaryColor}>
      <Container>
        <HeaderContainer>

          <Logo>
            <Link to='/'>Project Management</Link>
          </Logo>

          <Nav>
            <NavElement>
              <NavLink to='/login'>Login</NavLink>
            </NavElement>
            <NavElement>
              <NavLink to='/register'>Register</NavLink>
            </NavElement>
          </Nav>

        </HeaderContainer>
      </Container>
    </ContainerLayout>
    {children}
  </>
  )
}

export default Header;