import React, {FC, useEffect, useState} from 'react';
import './ReviewsAttraction.scss'
import iconreviews from './img/iconreviews.png';
import {CommentDTO} from "../../../models/comment/CommentDTO";
import {useParams} from "react-router-dom";
import {CommentService} from "../../../services/comment-service";
import Comment from "./comment/Comment";
import InfoMessage from "../../../components/infoMessage/infoMessage";
import cn from "classnames";
import LeaveCommentSect from "../../LeaveCommentSect/LeaveCommentSect";

export interface ReviewsAttractionProps {
    comments: CommentDTO[];
    isLeaveComment: boolean;
}

const ReviewsAttraction:FC<ReviewsAttractionProps> = (
    {
        comments,
        isLeaveComment,
    }) => {

    const [comment, setComment] = useState('');
    // const [fileteredComments, setFileteredComments] = useState('');
    const [isVisibleMessage, setIsVisibleMessage] = useState(false);
    const [message, setMessage] = useState('');
    const {id} = useParams<{ id: string }>()

    // useEffect(() => {
    //     comments.map(comment => {
    //
    //     })
    // }, [])


    const leaveComment = () => {
        if(comment) {
            setMessage("Your comment uploaded successfully. Please, reload the page to see it");
            CommentService.createComment({placeId: parseInt(id), content: comment})
                .then(res => console.log(res.data));
            setComment('');
        } else {
            setMessage('Content of comment cannot be empty');
        }
        setIsVisibleMessage(true);
        setTimeout(() => setIsVisibleMessage(false), 5000);
    }

    return (
        <div className="block-reviews">
            <div className="audio-header">
                <img src={iconreviews} alt="" className="icon-information-header" />
                <div className="text-information-header">Reviews</div>
            </div>
            {isVisibleMessage && <InfoMessage classes={cn("message")}>{message}</InfoMessage>}
            {isLeaveComment &&
                <div className="leave-comment-section">
                    <LeaveCommentSect
                        setValueOfComment={setComment}
                        valueOfComment={comment}
                        afterButtonPressedFunc={leaveComment}
                    />
                </div>
            }
            {comments.length === 0 ?
                <p className={"text_no_reviews"}>There are no reviews yet. Be the first!</p>:
                comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
};


export default ReviewsAttraction;