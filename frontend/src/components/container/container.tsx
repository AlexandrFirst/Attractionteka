import React from 'react';

import  styles from './container.module.scss';
export interface ContainerProps {

}

const Container:React.FC<ContainerProps> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};

export default Container;