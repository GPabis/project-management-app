import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from './../middleware/auth';
import mongoose from 'mongoose';
import { createProjectValidationRules, validate } from './../middleware/validate';
import connect from '../middleware/database';
import { findUserByEmail, sendErrorResponse } from '../middleware/auth';
import Project from './../models/project.model';

const router = express.Router();

interface CreateProjectBody {
    userEmail: string;
    projectName: string;
    projectDescription: string;
    projectTeam: string[];
}

router.post(
    '/create-project',
    verifyToken,
    createProjectValidationRules(),
    validate,
    async (req: Request, res: Response) => {
        try {
            const { projectName, projectDescription }: CreateProjectBody = req.body;

            await connect();

            const user = await getUserFromToken(req, res);

            if (!user) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);

            const project = await Project.create({
                projectName,
                projectDescription,
                projectAdmin: user._id.toString(),
                projectTeam: [user._id.toString()],
            });

            res.status(201).json({
                ...project._doc,
            });

            console.log('Project Created!');
        } catch (err) {
            await sendErrorResponse(res, err, 500);
            console.log(err);
        } finally {
            await mongoose.connection.close();
        }
    },
);

export default router;
