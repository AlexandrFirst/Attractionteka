import React from 'react';

import styles from './caption.module.scss';
import cn from "classnames";

export interface CaptionProps {
    classNames?: string;
}
const Caption:React.FC<CaptionProps> = (
    {
        children,
        classNames,
    }) => {
    return (
        <h2 className={cn(styles.caption, classNames)}>
            {children}
        </h2>
    );
};

export default Caption;