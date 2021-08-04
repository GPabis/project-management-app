import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import mongoose from 'mongoose';
import Project, { TaskStatus } from '../../models/project.model';
import { inviteUserValidationRules, validate } from '../../middleware/validate';
import { findUserByEmail } from './../../middleware/auth';
import { sendErrorResponse } from '../../middleware/error-handler';

const router = express.Router();

interface ICommentDB {
    _id: mongoose.Types.ObjectId;
    taskCommentator: string;
    taskCommentContent: string;
    taskCommentData: Date;
}

interface ITaskDB {
    _id: mongoose.Types.ObjectId;
    taskName: string;
    taskDescription: string;
    taskDateStart: Date;
    tastDateEnd: Date;
    teskResponsible: string;
    taskStatus: TaskStatus;
    taskComments: ICommentDB[];
}

export interface ProjectModelDB {
    _id: mongoose.Types.ObjectId;
    projectName: string;
    projectDescription: string;
    projectAdmin: string;
    projectTeam: string[];
    projectTasks: ITaskDB[];
}

router.put(
    '/project/:id/teammate',
    verifyToken,
    inviteUserValidationRules(),
    validate,
    async (req: Request, res: Response) => {
        if (req.params && req.params.id && typeof req.params.id === 'string' && !(req.method === 'GET')) {
            try {
                const projectID = req.params.id;
                const { newUserEmail } = req.body;

                const user = await getUserFromToken(req, res);
                if (!user) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);

                const project = await Project.findById(projectID);
                if (!project) return await sendErrorResponse(res, 'There is no project with that ID', 409);
                if (project.projectAdmin !== user._id.toString())
                    return await sendErrorResponse(res, 'Only project admin can invite new people!', 409);

                const invitedUser = await findUserByEmail(newUserEmail);
                if (!invitedUser) return await sendErrorResponse(res, 'There is no user with that email!', 409);

                if (project.projectTeam.includes(invitedUser._id.toString()))
                    return await sendErrorResponse(
                        res,
                        `User ${invitedUser.username} already is a part of the team`,
                        409,
                    );

                await Project.findByIdAndUpdate(project._id.toString(), {
                    projectTeam: [...project.projectTeam, invitedUser._id.toString()],
                });

                return res.status(200).json({
                    error: false,
                    messages: [`User ${invitedUser.username} added to project "${project.projectName}"`],
                });
            } catch (err) {
                return await sendErrorResponse(res, err, 500);
            }
        }
    },
);

export default router;
