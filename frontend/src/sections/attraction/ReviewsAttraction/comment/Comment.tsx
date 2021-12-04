import React, {useState} from 'react';
import {CommentDTO} from "../../../../models/comment/CommentDTO";
import styles from './comment.module.scss';
import {CommentService} from "../../../../services/comment-service";
import {useParams} from "react-router-dom";
import LeaveCommentSect from "../../../LeaveCommentSect/LeaveCommentSect";

export interface CommentProps {
    comment: CommentDTO;
    classes?: string;
}

const Comment: React.FC<CommentProps> = (
    {
        comment: {
            commentReplies,
            parentComment,
            commentTime,
            content,
            author,
            id,

        },
        classes,

    }
) => {
    const params = useParams<{ id: string }>();

    const [commentContent, setCommentContent] = useState('')
    const [isVisibleReply, setIsVisibleReply] = useState(false)

    const makeCorrectCommentDate = (date: Date): string => {
        return date.toString().substring(0, 10);
    }

    const replyComment = async (commentId: number) => {
        const placeId = parseInt(params.id)
        await CommentService.replyComment(commentId, {placeId, content: commentContent})
    }

    return (
        <>
            <div className={styles.header}>
                <p className={styles.author}>{author?.name}</p>
                <p className={styles.date}>{makeCorrectCommentDate(commentTime)}</p>
            </div>
            <div className={styles.content}>
                <p>{content}</p>
            </div>
            <p
                onClick={() => setIsVisibleReply(prevState => !prevState)}
                className={styles.to_answer}>To answer</p>
            {commentReplies?.map((reply, index) =>
                <div key={reply.id} className={styles.reply_wrapper}>
                    <Comment comment={reply} classes={styles.reply_section} />
                </div>
            )}
            {isVisibleReply &&
                <div className={styles.reply_comment}>
                    <LeaveCommentSect
                        setValueOfComment={setCommentContent}
                        valueOfComment={commentContent}
                        afterButtonPressedFunc={() => replyComment(id)}/>
                </div>}
        </>
    );
};

export default Comment;