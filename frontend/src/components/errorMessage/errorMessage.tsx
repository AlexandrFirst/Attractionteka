import React from 'react';
import cn from "classnames";

import styles from './errorMessage.module.scss';
import error from './img/error.svg';

export interface FormErrorProps {
    // message: string;
    classNames?: string;
    isVisible?: boolean;
}

const ErrorMessage:React.FC<FormErrorProps> = (
    {
        classNames,
        children,
        isVisible,
    }) => {
    return (
        <div className={cn(styles.error, classNames, {
            [styles.error_visible]: isVisible,
        })}>
            <img src={error} alt="error" className={styles.error_img}/>
            {children}
        </div>
    );
};

export default ErrorMessage;