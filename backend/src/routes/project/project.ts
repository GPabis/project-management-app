import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import User from '../../models/user.model';
import { sendErrorResponse } from '../../middleware/error-handler';
import { IProjectData, IProjectTaskData, TeammateData } from '../../types/project-types';
import { getProjectById, isNotPartOfTeam, isNotProjectAdmin } from './../../middleware/helpers';
import Project from './../../models/project.model';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/project/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const projectID = req.params.id;

        const user = await getUserFromToken(req, res);

        const project = await getProjectById(projectID);

        isNotPartOfTeam(project.projectTeam, user._id);

        const projectTeamIDs: string[] = project.projectTeam;

        const projectTeam = await User.find({ _id: { $in: projectTeamIDs } });

        const projectTeamRequest: TeammateData[] = projectTeam.map((teammate) => {
            return { _id: teammate._id, username: teammate.username, email: teammate.email };
        });

        const projectTaskData: IProjectTaskData[] = project.projectTask.map((task: IProjectTaskData) => {
            const {
                _id,
                taskName,
                taskDescription,
                taskDateStart,
                taskDateEnd,
                taskResponsible,
                taskAuthor,
                taskStatus,
                taskComments,
            }: IProjectTaskData = task;
            return {
                _id,
                taskName,
                taskDescription,
                taskDateStart,
                taskDateEnd,
                taskResponsible,
                taskAuthor,
                taskStatus,
                taskComments,
            };
        });

        const request: IProjectData = {
            _id: project._id,
            projectAdmin: project.projectAdmin,
            projectDescription: project.projectDescription,
            projectName: project.projectName,
            projectTasks: project.projectTasks,
            projectTeam: project.projectTeam,
            projectTeamData: projectTeamRequest,
            projectTaskData: [...projectTaskData],
        };

        return res.status(200).json(request);
    } catch (err) {
        return await sendErrorResponse(res, err, 409);
    }
});

router.delete('/project/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const projectID = req.params.id;

        const user = await getUserFromToken(req, res);

        const project = await getProjectById(projectID);

        isNotPartOfTeam(project.projectTeam, user._id);

        isNotProjectAdmin(project.projectAdmin, user._id);

        const deletedProject = await Project.findByIdAndRemove(project._id);

        return res.status(200).json({
            error: false,
            messages: `Project has been deleted!`,
        });
    } catch (error) {
        return await sendErrorResponse(res, error, 409);
    }
});

export default router;
