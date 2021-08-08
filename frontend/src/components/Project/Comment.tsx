import styled from 'styled-components';
import { TaskText } from './TaskCard';
import moment from 'moment';

const CommentInfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
`;

const CommentInfoText = styled.p`
    font-size: 1.6rem;
    margin: 0.2rem 0;
    min-width: 10rem;
`;

const Comment: React.FC<{ username: string; date: Date; comment: string }> = ({ username, date, comment }) => {
    return (
        <>
            <CommentInfoRow>
                <CommentInfoText>{username}</CommentInfoText>{' '}
                <CommentInfoText>On: {moment(date).format('DD.MM.YYYY HH:mm')}</CommentInfoText>
            </CommentInfoRow>
            <TaskText>{comment}</TaskText>
        </>
    );
};

export default Comment;
