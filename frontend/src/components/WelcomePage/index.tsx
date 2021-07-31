import Container from '../util/Container';
import Headline from '../util/Headline';
import Paragraph from '../util/Paragraph';
import LinkWrapper from '../util/LinkWrapper';
import { NavLink } from 'react-router-dom';

const Welcome = () => {
    return (
        <Container>
            <Headline>Colaborate with your team and make your project easy!</Headline>
            <Paragraph center={true}>
                Start working on your project, by{' '}
                <LinkWrapper>
                    <NavLink to="/login">log in</NavLink>
                </LinkWrapper>{' '}
                or{' '}
                <LinkWrapper>
                    <NavLink to="/register">register</NavLink>
                </LinkWrapper>
            </Paragraph>
        </Container>
    );
};

export default Welcome;
