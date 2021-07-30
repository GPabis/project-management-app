import NavElement from './NavElement';
import Nav from './Nav';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { NavLink } from 'react-router-dom';

const GuestNav = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Nav>
            <NavElement>
                <NavLink to="/login">Login</NavLink>
            </NavElement>
            <NavElement>
                <NavLink to="/register">Register</NavLink>
            </NavElement>
        </Nav>
    );
};

export default GuestNav;
