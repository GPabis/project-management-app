import express, { Request, Response } from 'express';
import verifyToken, { findUserByEmail, sendErrorResponse } from './../middleware/auth';
import mongoose from 'mongoose';
import connect from './../middleware/database';
import Project from './../models/project.model';

interface YourProjectsBody {
    email: string;
}

const route = express.Router();

route.post('/your-projects', verifyToken, async (req: Request, res: Response) => {
    try {
        const { email }: YourProjectsBody = req.body;

        await connect();

        const { _id } = await findUserByEmail(email);

        if (!_id) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);
        // eslint-disable-next-line
        const yourProjects: any[] = await Project.find({ projectTeam: { $elemMatch: { $eq: _id.toString() } } });

        const projects = yourProjects.map((project) => {
            return { _id: project._id.toString(), projectName: project.projectName };
        });

        res.status(200).json(projects);
    } catch (error) {
        return await sendErrorResponse(res, error, 409);
    } finally {
        await mongoose.connection.close();
    }
});

export default route;
