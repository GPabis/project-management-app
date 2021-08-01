import styled from 'styled-components';

const ListElement = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0rem;
    margin: 2rem 0;
    box-shadow: 0rem 0rem 0.5rem 0.2rem #ddd;
    font-size: 1.8rem;
    font-weight: 700;
    transition: all 0.3s;

    &:hover {
        box-shadow: 0rem 0rem 0.5rem 0.3rem #ccc;
    }
`;

export default ListElement;
