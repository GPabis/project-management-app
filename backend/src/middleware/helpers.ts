import Project from '../models/project.model';

export const getProjectById = async (projectID: string) => {
    const project = await Project.findById(projectID);
    if (!project) throw 'There is no project with that ID';
    return project;
};

export const isNotProjectAdmin = (projectAdminId: string, userId: string) => {
    if (projectAdminId !== userId) throw 'Only project admin can invite new people!';
};

export const isPartOfTeam = (teamIDs: string[], userId: string, username: string) => {
    if (teamIDs.includes(userId)) throw `User ${username} already is a part of the team`;
};

export const isNotPartOfTeam = (teamIDs: string[], userId: string) => {
    if (!teamIDs.includes(userId)) throw 'You are not part of this project!';
};
