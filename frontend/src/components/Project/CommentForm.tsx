import styled from 'styled-components';
import useInput from '../../hooks/use-input';
import { tertiaryColor } from '../../utils/styleVariables';
import { validateDescription } from '../../utils/validateForm';
import { ErrorLabel, Submit } from '../util/Form';
import { TaskInfoHeadline } from './TaskCard';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import NotificationContext from '../../store/notification-context';
import ProjectContext from '../../store/project-context';
import { useParams } from 'react-router-dom';
import { getServerErrorResponse } from './../../utils/validateForm';

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
    const authCtx = useContext(AuthContext);
    const notificationCtx = useContext(NotificationContext);
    const projectCtx = useContext(ProjectContext);
    const { id, taskId } = useParams<{ id: string; taskId: string }>();

    const {
        value: enteredComment,
        isValid: enteredCommentIsValid,
        errorMessage: commentErrorMsg,
        hasError: commentInputHasError,
        valueChangeHandler: commentChangedHandler,
        inputBlurHandler: commentBlurHandler,
    } = useInput(validateDescription);

    const submitCommentHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!authCtx.token || !authCtx.email) return authCtx.logout();

        const comment = { comment: enteredComment };

        const response = await fetch(`http://localhost:8080/project/${id}/task/${taskId}/add-comment`, {
            method: 'PUT',
            headers: {
                'x-access-token': authCtx.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });

        if (!response.ok) {
            const { error, messages } = await getServerErrorResponse(response);
            notificationCtx.setNotification(error, messages);
        }

        if (response.ok) {
            const { error, messages }: { error: boolean; messages: string } = await response.json();
            notificationCtx.setNotification(error, messages);
            projectCtx.getProject(id);
        }
    };

    let formIsValid = false;

    enteredCommentIsValid && (formIsValid = true);

    return (
        <CommentFormContainer onSubmit={submitCommentHandler}>
            <TaskInfoHeadline>Add Comment:</TaskInfoHeadline>
            <CommentTextarea onChange={commentChangedHandler} onBlur={commentBlurHandler}></CommentTextarea>
            {commentInputHasError && <ErrorLabel>{commentErrorMsg}</ErrorLabel>}
            <Submit disabled={!formIsValid}>Add</Submit>
        </CommentFormContainer>
    );
};

export default CommentForm;
