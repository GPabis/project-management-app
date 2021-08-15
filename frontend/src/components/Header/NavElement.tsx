import styled from 'styled-components';

const NavElement = styled.li`
    font-size: 1.6rem;
    padding: 0 1rem;
    margin: 0;

    a,
    button {
        font-size: 1.6rem;
        transition: all 0.3s;
        color: #fff;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        text-decoration: none;
        :hover {
            color: #ddd;
        }
    }
`;

export default NavElement;
