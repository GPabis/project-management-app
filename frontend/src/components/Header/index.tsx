import Container from '../util/Container';
import { tertiaryColor } from '../../utils/styleVariables';
import { Link } from 'react-router-dom';
import ContainerLayout from '../util/ContainerLayout';
import HeaderContainer from './HeaderContainer';
import Logo from './Logo';
import { FC } from 'react';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import UserNav from './UserNav';
import GuestNav from './GuestNav';

const Header: FC = ({ children }) => {
    const authCtx = useContext(AuthContext);

    const menu = authCtx.isLoggedIn ? <UserNav /> : <GuestNav />;

    return (
        <>
            <ContainerLayout background={tertiaryColor}>
                <Container>
                    <HeaderContainer>
                        <Logo>
                            <Link to="/">Project Management</Link>
                        </Logo>

                        {menu}
                    </HeaderContainer>
                </Container>
            </ContainerLayout>
            {children}
        </>
    );
};

export default Header;
