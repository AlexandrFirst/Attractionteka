import React from 'react';
import styles from './infoMessage.module.scss';
import cn from "classnames";

export interface InfoMessageProps {
    classes?: string;
}

const InfoMessage:React.FC<InfoMessageProps> = (
    {
        classes,
        children
    }) => {

    return (
        <div className={cn(styles.message, classes)}>
            {children}
        </div>
    );
};

export default InfoMessage;