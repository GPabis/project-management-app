import NavElement from './NavElement';
import Nav from './Nav';
import { NavLink } from 'react-router-dom';

const GuestNav = () => {
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
