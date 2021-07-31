import mongoose, { Date } from 'mongoose';

enum TaskStatus {
    Waiting,
    InProgress,
    Review,
    Test,
    Done,
}

interface IComment {
    taskCommentator: string;
    taskCommentContent: string;
    taskCommentData: Date;
}

interface ITask {
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

const Schema = mongoose.Schema;

const projectSchema = new Schema<ProjectModel>({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    projectAdmin: {
        type: String,
        required: true,
    },
    projectTeam: [String],
    projectTask: [
        {
            taskName: String,
            taskDescription: String,
            taskDateStart: Date,
            tastDateEnd: Date,
            teskResponsible: String,
            taskStatus: String,
            taskComments: [
                {
                    taskCommentator: String,
                    taskCommentContent: String,
                    taskCommentData: Date,
                },
            ],
        },
    ],
});

const Project = mongoose.models.Project || mongoose.model<ProjectModel>('Project', projectSchema);

export default Project;
