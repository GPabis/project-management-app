import express, { Request, Response, NextFunction } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import Project from '../../models/project.model';
import User from '../../models/user.model';
import { sendErrorResponse } from '../../middleware/error-handler';
import { IProjectData, TeammateData } from '../../types/project-types';

const router = express.Router();

router.get('/project/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const projectID = req.params.id;
        const user = await getUserFromToken(req, res);
        const project = await Project.findById(projectID);
        if (!user) return await sendErrorResponse(res, 'Somethings goes wrong. Please login again.', 409);
        if (!project) return await sendErrorResponse(res, 'There is no project with that ID', 409);
        if (!project.projectTeam.includes(user._id))
            return await sendErrorResponse(res, 'You are not part of this project!', 409);
        const projectTeamIDs: string[] = project.projectTeam;
        const projectTeam = await User.find({ _id: { $in: projectTeamIDs } });
        const projectTeamRequest: TeammateData[] = projectTeam.map((teammate) => {
            return { _id: teammate._id, username: teammate.username, email: teammate.email };
        });
        const request: IProjectData = {
            _id: project._id,
            projectAdmin: project.projectAdmin,
            projectDescription: project.projectDescription,
            projectName: project.projectName,
            projectTasks: project.projectTasks,
            projectTeam: project.projectTeam,
            projectTeamData: projectTeamRequest,
        };

        return res.status(200).json(request);
    } catch (err) {
        console.log(err);
        return await sendErrorResponse(res, err, 409);
    }
});

export default router;
