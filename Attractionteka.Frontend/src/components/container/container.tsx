import React from 'react';

import  styles from './container.module.scss';
import cn from "classnames";
export interface ContainerProps {
    width?: number;
    classes?: string
}

const Container:React.FC<ContainerProps> = ({classes, width, children}) => {
    return (
        <div
            className={cn(styles.wrapper, classes)}
            style = {{'width': width}}
        >
            {children}
        </div>
    );
};

export default Container;