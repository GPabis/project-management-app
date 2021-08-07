export enum TaskStatus {
    Waiting,
    InProgress,
    Review,
    Test,
    Done,
}

export interface IComment {
    taskCommentId: string;
    taskCommentator: string;
    taskCommentContent: string;
    taskCommentData: Date;
}

export interface ITask {
    taskId: string;
    taskName: string;
    taskDescription: string;
    taskDateStart: Date;
    tastDateEnd: Date;
    teskResponsible: string;
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
