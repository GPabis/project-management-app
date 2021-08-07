import Container from '../util/Container';
import { useParams } from 'react-router-dom';
import ProjectContext from '../../store/project-context';
import { useContext, useEffect } from 'react';
import Headline from './../util/Headline';

const SingleProject = () => {
    const { id } = useParams<{ id: string }>();

    const projectCtx = useContext(ProjectContext);

    useEffect(() => {
        if (id && projectCtx.project && id !== projectCtx.project?.projectId) {
            projectCtx.getProject(id);
        }
    });

    return (
        <Container>
            <Headline>Project: {projectCtx.project?.projectName}</Headline>
        </Container>
    );
};

export default SingleProject;
