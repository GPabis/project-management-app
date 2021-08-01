import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken, sendErrorResponse } from '../../middleware/auth';
import connect from './../../middleware/database';
import mongoose from 'mongoose';
import Project from '../../models/project.model';

const router = express.Router();

router.get('/project/:id', verifyToken, async (req: Request, res: Response) => {
    console.log('test');
    if (req.params && req.params.id && typeof req.params.id === 'string') {
        try {
            const projectID = req.params.id;
            await connect();
            const user = await getUserFromToken(req, res);
            const project = await Project.findById(projectID);
            if (!user) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);
            if (!project) return await sendErrorResponse(res, 'There is no project with that ID', 409);
            if (!project.projectTeam.includes(user._id))
                return await sendErrorResponse(res, 'You are not part of this project!', 409);
            return res.status(200).json(project);
        } catch (err) {
            return await sendErrorResponse(res, err, 409);
        } finally {
            mongoose.connection.close();
        }
    }
});

export default router;
