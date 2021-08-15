import Project from '../models/project.model';

export const getProjectById = async (projectID: string) => {
    const project = await Project.findById(projectID);
    if (!project) throw 'There is no project with that ID';
    return project;
};

export const isNotProjectAdmin = (projectAdminId: string, userId: string) => {
    if (projectAdminId.toString() !== userId.toString()) throw `You are not project admin to do this!`;
};

export const isProjectAdmin = (projectAdminId: string, userId: string) => {
    if (!(projectAdminId.toString() !== userId.toString())) throw `You are project admin.`;
};

export const isPartOfTeam = (teamIDs: string[], userId: string, username: string) => {
    if (teamIDs.includes(userId.toString())) throw `User ${username} already is a part of the team`;
};

export const isNotPartOfTeam = (teamIDs: string[], userId: string) => {
    if (!teamIDs.includes(userId.toString())) throw `You are not part of this project!`;
};

export const isNotTaskAuthorOrAdmin = (taskAuthor: string, userId: string, projectAdminId: string) => {
    if (taskAuthor.toString() !== userId.toString() && projectAdminId.toString() !== userId.toString())
        throw `Only task author or project admin can delete this task!`;
};
