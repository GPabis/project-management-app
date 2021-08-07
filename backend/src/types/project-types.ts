import mongoose from 'mongoose';

export enum TaskStatus {
    Waiting = 'WAITING',
    InProgress = 'IN-PROGRESS',
    Review = 'IN-REVIEW',
    Test = 'IN-TEST',
    Done = 'DONE',
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
    taskDateEnd: Date;
    taskResponsible: string;
    taskAuthor: string;
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

export interface IProjectTaskData extends ITask {
    _id: mongoose.Types.ObjectId;
}

export interface IProjectData extends ProjectModel {
    _id: mongoose.Types.ObjectId;
    projectTaskData: IProjectTaskData[];
    projectTeamData?: TeammateData[];
}

export interface ITaskBody {
    taskName: string;
    taskDescription: string;
    taskDateStart: Date;
    taskDateEnd: Date;
    taskResponsible: string;
}
