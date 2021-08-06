import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../middleware/auth';
import { createProjectValidationRules, validate } from '../middleware/validate';
import Project from '../models/project.model';
import { sendErrorResponse } from '../middleware/error-handler';
import { CreateProjectBody } from '../types/project-types';

const router = express.Router();

router.post(
    '/create-project',
    verifyToken,
    createProjectValidationRules(),
    validate,
    async (req: Request, res: Response) => {
        try {
            const { projectName, projectDescription }: CreateProjectBody = req.body;

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
        } catch (err) {
            await sendErrorResponse(res, err, 500);
        }
    },
);

export default router;
