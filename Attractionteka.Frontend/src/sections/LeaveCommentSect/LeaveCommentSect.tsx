import React from 'react';
import TextAreaWithVisibleError from "../../components/textAreaWithVisibleError/textAreaWithVisibleError";
import Button from "../../components/button/button";
import cn from "classnames";


export interface LeaveCommentSectProps {
    setValueOfComment: Function;
    valueOfComment: string;
    afterButtonPressedFunc: (e: React.MouseEvent) => void;
}

const LeaveCommentSect: React.FC<LeaveCommentSectProps> = (
    {
        setValueOfComment,
        valueOfComment,
        afterButtonPressedFunc

    }
) => {
    return (
        <>
            <TextAreaWithVisibleError
                setValueToWrite={setValueOfComment}
                valueToWrite={valueOfComment}
                onBlurFunc={() => {}}
                placeholderData="Comment...."
                classes="comment-text-area" />
            <Button
                // disabled={comment === ""}
                classes={cn("comment-btn")}
                onClick={afterButtonPressedFunc}>Leave a comment</Button>
        </>
    );
};

export default LeaveCommentSect;