import mongoose from 'mongoose';

export enum TaskStatus {
    Waiting,
    InProgress,
    Review,
    Test,
    Done,
}

export interface IComment {
    taskCommentator: string;
    taskCommentContent: string;
    taskCommentData: Date;
}

export interface ITask {
    taskName: string;
    taskDescription: string;
    taskDateStart: Date;
    tastDateEnd: Date;
    teskResponsible: string;
    taskStatus: TaskStatus;
    taskComments: IComment[];
}

export interface ProjectModel {
    projectName: string;
    projectDescription: string;
    projectAdmin: string;
    projectTeam: string[];
    projectTasks: ITask[];
}

export interface CreateProjectBody {
    userEmail: string;
    projectName: string;
    projectDescription: string;
    projectTeam: string[];
}

export interface TeammateData {
    _id: mongoose.Types.ObjectId;
    email: string;
    username: string;
}

export interface IProjectData extends ProjectModel {
    _id: mongoose.Types.ObjectId;
    projectTeamData?: TeammateData[];
}
