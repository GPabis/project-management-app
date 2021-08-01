import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken, sendErrorResponse } from '../../middleware/auth';
import connect from '../../middleware/database';
import mongoose from 'mongoose';
import Project from '../../models/project.model';
import { inviteUserValidationRules, validate } from '../../middleware/validate';
import { findUserByEmail } from './../../middleware/auth';

const router = express.Router();

router.put(
    '/project/:id/teammate',
    verifyToken,
    inviteUserValidationRules(),
    validate,
    async (req: Request, res: Response) => {
        if (req.params && req.params.id && typeof req.params.id === 'string') {
            try {
                const projectID = req.params.id;
                const { newUserEmail } = req.body;
                await connect();
                const user = await getUserFromToken(req, res);
                const project = await Project.findById(projectID);
                if (!user) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);
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
            } finally {
                mongoose.connection.close();
            }
        }
    },
);

export default router;
