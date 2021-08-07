import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import Project from '../../models/project.model';
import { inviteUserValidationRules, validate } from '../../middleware/validate';
import { findUserByEmail } from './../../middleware/auth';
import { sendErrorResponse } from '../../middleware/error-handler';
import { getProjectById, isNotProjectAdmin, isPartOfTeam } from './../../middleware/helpers';

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

export default router;
