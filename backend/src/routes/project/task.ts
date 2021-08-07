import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { sendErrorResponse } from '../../middleware/error-handler';
import { getProjectById, isNotPartOfTeam } from './../../middleware/helpers';
import { ITask, ITaskBody, TaskStatus } from '../../types/project-types';
import Project from '../../models/project.model';

const router = express.Router();

router.post('/project/:id/task', verifyToken, validate, async (req: Request, res: Response) => {
    try {
        const { taskName, taskDescription, taskDateStart, taskDateEnd, taskResponsible }: ITaskBody = req.body;
        const projectID = req.params.id;
        const user = await getUserFromToken(req, res);
        const project = await getProjectById(projectID);
        const taskStatus = TaskStatus.Waiting;

        isNotPartOfTeam(project.projectTeam, user._id);
        isNotPartOfTeam(project.projectTeam, taskResponsible);

        const newTask: ITask = {
            taskName,
            taskDescription,
            taskDateStart,
            taskDateEnd,
            taskResponsible,
            taskAuthor: user._id.toString(),
            taskStatus,
            taskComments: [],
        };

        const updatedTask = await Project.findByIdAndUpdate(project._id, {
            projectTask: [...project.projectTask, newTask],
        });

        return res.status(200).json({
            error: false,
            messages: `Task ${taskName} has been added to project`,
        });
    } catch (error) {
        return await sendErrorResponse(res, error, 409);
    }
});

export default router;
