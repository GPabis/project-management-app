import List from '../util/List';
import ListElement from '../util/ListElement';
import ListLink from '../util/ListLink';
import { NavLink } from 'react-router-dom';
import SecoundaryHeadline from '../util/SecoundaryHeadline';
import { useEffect, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { ErrorFromServer, getServerErrorResponse } from '../../utils/validateForm';
import Paragraph from '../util/Paragraph';

interface YourProjects {
    _id: string;
    projectName: string;
}

const YourProjects = () => {
    const [errorFromServer, setErrorFromServer] = useState<ErrorFromServer>({
        error: false,
        messages: [],
    });

    const [projects, setProjects] = useState<YourProjects[]>([]);

    const [noProjects, setNoProjects] = useState(false);

    const [loading, setLoading] = useState(true);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const getYourProjects = async () => {
            if (!authCtx.token || !authCtx.email) return authCtx.logout();
            try {
                const response = await fetch('http://localhost:8080/your-projects', {
                    method: 'POST',
                    headers: {
                        'x-access-token': authCtx.token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: authCtx.email }),
                });
                if (!response.ok) {
                    setErrorFromServer(await getServerErrorResponse(response));
                }
                const data: YourProjects[] = await response.json();
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
                {loading && <Paragraph>Loading...</Paragraph>}
                {!loading && noProjects && <Paragraph>You don't belong to any project</Paragraph>}
                {!noProjects &&
                    !loading &&
                    projects.length !== 0 &&
                    projects.map((project) => {
                        return (
                            <ListElement>
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
