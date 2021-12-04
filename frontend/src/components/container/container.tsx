import React from 'react';

import  styles from './container.module.scss';
export interface ContainerProps {
    width?: number;
}

const Container:React.FC<ContainerProps> = ({width, children}) => {
    return (
        <div
            className={styles.wrapper}
            style = {{'width': width}}
        >
            {children}
        </div>
    );
};

export default Container;