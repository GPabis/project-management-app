import React, { useState, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationContext from './notification-context';
import AuthContext from './auth-context';
import { IProject, IProjectCoxtext } from '../types/project-types';

const ProjectContext = createContext<IProjectCoxtext>({
    project: null,
    getProject: (id: string) => {},
});

export const ProjectContextProvider: React.FC = ({ children }) => {
    const [project, setProject] = useState<IProject | null>(null);
    const [id, setId] = useState<string | null>(null);

    const notificationCtx = useContext(NotificationContext);
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const getProject = async (id: string) => {
        setId(id);

        if (!authCtx.token) {
            notificationCtx.setNotification(true, ['You are not logged in. Please log in again']);
            authCtx.logout();
            history.push('/login');
            return;
        }

        const resposne = await fetch(`http://localhost:8080/project/${id}`, {
            headers: {
                'x-access-token': authCtx.token,
                'Content-Type': 'application/json',
            },
        });

        if (!resposne.ok) {
            notificationCtx.setNotification(true, ['Somethings goes wrong. Please try letter.']);
        }

        const data = await resposne.json();

        const project: IProject = {
            projectAdmin: data.projectAdmin,
            projectDescription: data.projectDescription,
            projectName: data.projectName,
            projectId: data._id,
            projetTeamData: data.projectTeamData,
        };

        setProject(project);
    };

    const contextValue = {
        project,
        getProject,
    };

    return <ProjectContext.Provider value={contextValue}>{children}</ProjectContext.Provider>;
};

export default ProjectContext;
