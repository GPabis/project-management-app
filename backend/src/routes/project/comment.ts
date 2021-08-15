import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import { validate, addCommentValidationRules } from './../../middleware/validate';
import { sendErrorResponse } from './../../middleware/error-handler';
import { getProjectById, isNotPartOfTeam } from './../../middleware/helpers';
import { IComment, IProjectTaskData } from '../../types/project-types';
import Project from './../../models/project.model';

const router = express.Router();

router.put(
    '/project/:id/task/:taskId/add-comment',
    verifyToken,
    addCommentValidationRules(),
    validate,
    async (req: Request, res: Response) => {
        try {
            const { comment }: { comment: string } = req.body;
            const projectID = req.params.id;
            const taskId = req.params.taskId;
            const { _id, username } = await getUserFromToken(req, res);
            const project = await getProjectById(projectID);

            await isNotPartOfTeam(project.projectTeam, _id);

            const newComment: IComment = {
                taskCommentator: username,
                taskCommentContent: comment,
            };

            project.projectTask.forEach((task: IProjectTaskData) => {
                if (task._id.toString() === taskId) {
                    const currentComments = task.taskComments;
                    currentComments.push(newComment);
                    task.taskComments = currentComments;
                }
            });

            await project.save();

            return res.status(200).json({
                error: false,
                messages: `New comment was added`,
            });
        } catch (error) {
            return await sendErrorResponse(res, error, 409);
        }
    },
);

export default router;
