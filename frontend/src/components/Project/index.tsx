import Container from '../util/Container';
import { useParams } from 'react-router-dom';

const SingleProject = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);

    return <Container>{id}</Container>;
};

export default SingleProject;
