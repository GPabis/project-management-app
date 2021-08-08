import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import Project from '../../models/project.model';
import { inviteUserValidationRules, validate } from '../../middleware/validate';
import { findUserByEmail } from './../../middleware/auth';
import { sendErrorResponse } from '../../middleware/error-handler';
import {
    getProjectById,
    isNotPartOfTeam,
    isNotProjectAdmin,
    isPartOfTeam,
    isProjectAdmin,
} from './../../middleware/helpers';

const router = express.Router();

router.put(
    '/project/:id/teammate',
    verifyToken,
    inviteUserValidationRules(),
    validate,
    async (req: Request, res: Response) => {
        try {
            const projectID = req.params.id;
            const { newUserEmail } = req.body;

            const user = await getUserFromToken(req, res);

            const project = await getProjectById(projectID);

            isNotProjectAdmin(project.projectAdmin.toString(), user._id.toString());

            const invitedUser = await findUserByEmail(newUserEmail);

            isPartOfTeam(project.projectTeam, invitedUser._id, invitedUser.username);

            await Project.findByIdAndUpdate(project._id.toString(), {
                projectTeam: [...project.projectTeam, invitedUser._id.toString()],
            });

            return res.status(200).json({
                error: false,
                messages: `User ${invitedUser.username} added to project "${project.projectName}"`,
            });
        } catch (err) {
            return await sendErrorResponse(res, err, 500);
        }
    },
);

router.delete('/project/:id/teammate/leave', verifyToken, async (req: Request, res: Response) => {
    try {
        const projectID = req.params.id;
        const user = await getUserFromToken(req, res);
        const project = await getProjectById(projectID);

        isProjectAdmin(project.projectAdmin, user._id);
        isNotPartOfTeam(project.projectTeam, user._id);

        const projectTeamAfterUpdate = project.projectTeam.filter(
            (teammate: string) => teammate.toString() !== user._id.toString(),
        );

        project.projectTeam = projectTeamAfterUpdate;

        await project.save();

        return res.status(200).json({
            error: false,
            messages: `You leaved project "${project.projectName}"`,
        });
    } catch (error) {
        return await sendErrorResponse(res, error, 409);
    }
});

export default router;
