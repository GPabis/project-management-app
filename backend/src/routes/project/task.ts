import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { sendErrorResponse } from '../../middleware/error-handler';
import { getProjectById, isNotPartOfTeam } from './../../middleware/helpers';
import { ITask, ITaskBody, TaskStatus, IProjectTaskData } from '../../types/project-types';
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

router.put('/project/:id/task/:taskId/update-status', verifyToken, validate, async (req: Request, res: Response) => {
    try {
        const { status }: { status: string } = req.body;
        const projectID = req.params.id;
        const taskId = req.params.taskId;
        const { _id } = await getUserFromToken(req, res);
        const project = await getProjectById(projectID);

        if (!Object.values(TaskStatus).some((enumValue) => enumValue === status)) throw 'Wrong status!';
        isNotPartOfTeam(project.projectTeam, _id);

        const tasks = project.projectTask.map((task: IProjectTaskData) => {
            if (task._id.toString() === taskId) {
                return {
                    _id: task._id,
                    taskName: task.taskName,
                    taskDescription: task.taskDescription,
                    taskDateStart: task.taskDateStart,
                    taskDateEnd: task.taskDateEnd,
                    taskResponsible: task.taskResponsible,
                    taskAuthor: task.taskAuthor,
                    taskComments: task.taskComments,
                    taskStatus: status,
                };
            }
            return task;
        });

        const updatedTask = await Project.findByIdAndUpdate(project._id, {
            projectTask: [...tasks],
        });

        const taskName = project.projectTask.find((task: IProjectTaskData) => task._id.toString() === taskId).taskName;

        return res.status(200).json({
            error: false,
            messages: `Status of "${taskName}" has been updated `,
        });
    } catch (error) {
        return await sendErrorResponse(res, error, 409);
    }
});

export default router;
