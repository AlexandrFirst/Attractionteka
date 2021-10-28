import React from 'react';
import cn from "classnames";

import styles from './textAreaWithVisibleError.module.scss';
import ErrorMessage from "../errorMessage/errorMessage";

export interface TextAreaProps {
    valueToWrite: string;
    setValueToWrite: Function;
    conditionOfError?: boolean;
    onBlurFunc: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    placeholderData?: string;
    classes?: string;
    isErrorToShow?: boolean;
    errorMessage?: string;
}

const TextAreaWithVisibleError: React.FC<TextAreaProps> = (
    {
        conditionOfError,
        onBlurFunc,
        setValueToWrite,
        valueToWrite,
        placeholderData,
        classes,
        isErrorToShow=false,
        errorMessage="An error occurred",
    }
) => {
    return (
        <>
            <textarea
                value={valueToWrite}
                onChange={event => setValueToWrite(event.target.value)}
                placeholder={placeholderData}
                className={cn(styles.text_area, {[styles.text_area_wrong]: conditionOfError}, classes)}
                onBlur={onBlurFunc}
            />
            {isErrorToShow &&  <ErrorMessage
                isVisible={conditionOfError}
                classes={styles.error}
                >{errorMessage}</ErrorMessage>
            }
        </>
    );
};

export default TextAreaWithVisibleError;