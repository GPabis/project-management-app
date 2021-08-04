import React, { createContext } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useContext } from 'react';
import NotificationContext from './notification-context';
import AuthContext from './auth-context';
import { useEffect } from 'react';

enum TaskStatus {
    Waiting,
    InProgress,
    Review,
    Test,
    Done,
}

interface IComment {
    taskCommentId: string;
    taskCommentator: string;
    taskCommentContent: string;
    taskCommentData: Date;
}

interface ITask {
    taskId: string;
    taskName: string;
    taskDescription: string;
    taskDateStart: Date;
    tastDateEnd: Date;
    teskResponsible: string;
    taskStatus: TaskStatus;
    taskComments: IComment[];
}

interface IProjectTeamData {
    _id: string;
    username: string;
    email: string;
}

interface IProject {
    projectId: string;
    projectName: string;
    projectDescription: string;
    projectAdmin: string;
    // projectTasks: ITask[];
    projetTeamData: IProjectTeamData[];
}

interface IProjectCoxtext {
    project: IProject | null;
    getProject: (id: string) => void;
}

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
