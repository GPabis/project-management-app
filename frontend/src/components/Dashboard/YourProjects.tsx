import List from '../util/List';
import ListElement from '../util/ListElement';
import ListLink from '../util/ListLink';
import { NavLink } from 'react-router-dom';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import { useEffect, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { getServerErrorResponse } from '../../utils/validateForm';
import Paragraph from '../util/Paragraph';
import NotificationContext from '../../store/notification-context';
import { IYourProjects } from '../../types/project-types';

const YourProjects = () => {
    const [projects, setProjects] = useState<IYourProjects[]>([]);

    const [noProjects, setNoProjects] = useState(false);

    const [loading, setLoading] = useState(true);

    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);

    useEffect(() => {
        const getYourProjects = async () => {
            if (!authCtx.token) return authCtx.logout();
            try {
                const response = await fetch('http://localhost:8080/projects', {
                    headers: {
                        'x-access-token': authCtx.token,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const { error, messages } = await getServerErrorResponse(response);
                    notificationCtx.setNotification(error, [...messages]);
                }
                const data: IYourProjects[] = await response.json();
                if (data.length === 0) {
                    setNoProjects(true);
                }
                setProjects(data);
            } catch (err) {
                await JSON.parse(err);
                notificationCtx.setNotification(true, [...err.errors]);
            } finally {
                setLoading(false);
            }
        };

        getYourProjects();
    }, []);

    return (
        <>
            <SecoundaryHeadline>See your projects</SecoundaryHeadline>
            <List>
                {loading && <Paragraph center={true}>Loading...</Paragraph>}
                {!loading && noProjects && <Paragraph center={true}>You don't belong to any project</Paragraph>}
                {!noProjects &&
                    !loading &&
                    projects.length !== 0 &&
                    projects.map((project) => {
                        return (
                            <ListElement key={project._id}>
                                <ListLink>
                                    <NavLink to={`/dashboard/projects/${project._id}`}>{project.projectName}</NavLink>
                                </ListLink>
                            </ListElement>
                        );
                    })}
            </List>
        </>
    );
};

export default YourProjects;
