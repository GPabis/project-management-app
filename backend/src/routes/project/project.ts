import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import mongoose from 'mongoose';
import Project, { ProjectModel } from '../../models/project.model';
import User from '../../models/user.model';
import { sendErrorResponse } from '../../middleware/error-handler';

const router = express.Router();

interface TeammateData {
    _id: mongoose.Types.ObjectId;
    email: string;
    username: string;
}

interface IProjectData extends ProjectModel {
    _id: mongoose.Types.ObjectId;
    projectTeamData?: TeammateData[];
}

router.get('/project/:id', verifyToken, async (req: Request, res: Response) => {
    if (req.params && req.params.id && typeof req.params.id === 'string') {
        try {
            const projectID = req.params.id;
            const user = await getUserFromToken(req, res);
            const project: IProjectData = await Project.findById(projectID);
            if (!user) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);
            if (!project) return await sendErrorResponse(res, 'There is no project with that ID', 409);
            if (!project.projectTeam.includes(user._id))
                return await sendErrorResponse(res, 'You are not part of this project!', 409);
            const projectTeamIDs: string[] = project.projectTeam;
            const projectTeamData: TeammateData[] = await User.find({ _id: { $in: projectTeamIDs } });
            const projectResponse: IProjectData = {
                ...project,
                projectTeamData: [...projectTeamData],
            };
            return res.status(200).json(projectResponse);
        } catch (err) {
            return await sendErrorResponse(res, err, 409);
        }
    }
});

export default router;