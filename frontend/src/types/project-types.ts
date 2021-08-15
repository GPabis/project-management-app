export enum TaskStatus {
    Waiting,
    InProgress,
    Review,
    Test,
    Done,
}

export interface IComment {
    _id: string;
    taskCommentator: string;
    taskCommentContent: string;
    taskCommentDate: Date;
}

export interface ITask {
    _id: string;
    taskName: string;
    taskDescription: string;
    taskDateStart: Date;
    taskDateEnd: Date;
    taskAuthor: string;
    taskResponsible: string;
    taskStatus: TaskStatus;
    taskComments: IComment[];
}

export interface IProjectTeamData {
    _id: string;
    username: string;
    email: string;
}

export interface IProject {
    projectId: string;
    projectName: string;
    projectDescription: string;
    projectAdmin: string;
    projectTasks: ITask[];
    projetTeamData: IProjectTeamData[];
}

export interface IProjectCoxtext {
    project: IProject | null;
    getProject: (id: string) => void;
}

export interface IYourProjects {
    _id: string;
    projectName: string;
}
