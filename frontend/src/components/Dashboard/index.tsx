import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Container from '../util/Container';
import LinkWrapper from '../util/LinkWrapper';
import List from '../util/List';
import ListElement from '../util/ListElement';
import Paragraph from '../util/Paragraph';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import Headline from './../util/Headline';
import { NavLink } from 'react-router-dom';
import ListLink from '../util/ListLink';
import YourProjects from './YourProjects';

const Dashboard = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Container center={true}>
            <Headline>Welcome {authCtx.username}</Headline>
            <YourProjects />
            <SecoundaryHeadline>Or</SecoundaryHeadline>
            <List>
                <ListElement>
                    <ListLink>
                        <NavLink to="/dashboard/create-project">Create new project</NavLink>
                    </ListLink>
                </ListElement>
            </List>
        </Container>
    );
};

export default Dashboard;
