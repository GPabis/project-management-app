import styled from 'styled-components';
import { tertiaryColor } from '../../utils/styleVariables';
import { Submit } from '../util/Form';
import { TaskInfoHeadline } from './TaskCard';

const CommentTextarea = styled.textarea`
    height: 8rem;
    width: 100%;
    border: ${tertiaryColor} 1px solid;
    outline: none;
`;

const CommentFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 0;
`;

const CommentForm = () => {
    return (
        <CommentFormContainer>
            <TaskInfoHeadline>Add Comment:</TaskInfoHeadline>
            <CommentTextarea></CommentTextarea>
            <Submit>Add</Submit>
        </CommentFormContainer>
    );
};

export default CommentForm;
