import mongoose from 'mongoose';
import { ProjectModel } from '../types/project-types';

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
            taskDateEnd: Date,
            taskResponsible: String,
            taskAuthor: String,
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
