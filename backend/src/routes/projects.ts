import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../middleware/auth';
import Project from '../models/project.model';
import { sendErrorResponse } from '../middleware/error-handler';

const route = express.Router();

route.get('/projects', verifyToken, async (req: Request, res: Response) => {
    try {
        const { _id } = await getUserFromToken(req, res);

        if (!_id) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);
        // eslint-disable-next-line
        const yourProjects: any[] = await Project.find({ projectTeam: { $elemMatch: { $eq: _id.toString() } } });

        const projects = yourProjects.map((project) => {
            return { _id: project._id.toString(), projectName: project.projectName };
        });

        res.status(200).json(projects);
    } catch (error) {
        return await sendErrorResponse(res, error, 409);
    }
});

export default route;
