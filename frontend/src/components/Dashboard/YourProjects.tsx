import List from '../util/List';
import ListElement from '../util/ListElement';
import ListLink from '../util/ListLink';
import { NavLink } from 'react-router-dom';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import { useEffect, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { ErrorFromServer, getServerErrorResponse } from '../../utils/validateForm';
import Paragraph from '../util/Paragraph';

interface IYourProjects {
    _id: string;
    projectName: string;
}

const YourProjects = () => {
    const [errorFromServer, setErrorFromServer] = useState<ErrorFromServer>({
        error: false,
        messages: [],
    });

    const [projects, setProjects] = useState<IYourProjects[]>([]);

    const [noProjects, setNoProjects] = useState(false);

    const [loading, setLoading] = useState(true);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const getYourProjects = async () => {
            if (!authCtx.token) return authCtx.logout();
            try {
                const response = await fetch('http://localhost:8080/your-projects', {
                    headers: {
                        'x-access-token': authCtx.token,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    setErrorFromServer(await getServerErrorResponse(response));
                }
                const data: IYourProjects[] = await response.json();
                if (data.length === 0) {
                    setNoProjects(true);
                }
                setProjects(data);
            } catch (err) {
                setErrorFromServer(err);
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
                {errorFromServer.error &&
                    !loading &&
                    errorFromServer.messages.map((error) => <Paragraph center={true}>{error}</Paragraph>)}
                {!errorFromServer.error && loading && <Paragraph center={true}>Loading...</Paragraph>}
                {!errorFromServer.error && !loading && noProjects && (
                    <Paragraph center={true}>You don't belong to any project</Paragraph>
                )}
                {!errorFromServer.error &&
                    !noProjects &&
                    !loading &&
                    projects.length !== 0 &&
                    projects.map((project) => {
                        return (
                            <ListElement key={project._id}>
                                <ListLink>
                                    <NavLink to={`/dashboard/your-projects/${project._id}`}>
                                        {project.projectName}
                                    </NavLink>
                                </ListLink>
                            </ListElement>
                        );
                    })}
            </List>
        </>
    );
};

export default YourProjects;
