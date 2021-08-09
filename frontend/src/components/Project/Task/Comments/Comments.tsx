import { ITask } from '../../../../types/project-types';
import Comment from './Comment';
import Paragraph from '../../../util/Paragraph';
import { TaskInfoHeadline } from '../TaskCard';
import CommentForm from './CommentForm';

const Comments: React.FC<{ task: ITask | null }> = ({ task }) => {
    let comments = task?.taskComments ? (
        task?.taskComments.map((comment) => (
            <Comment
                key={comment._id}
                username={comment.taskCommentator}
                comment={comment.taskCommentContent}
                date={comment.taskCommentDate}
            />
        ))
    ) : (
        <Paragraph>No comments</Paragraph>
    );

    return (
        <>
            <TaskInfoHeadline>Comments:</TaskInfoHeadline>
            {comments}
            <CommentForm />
        </>
    );
};

export default Comments;
