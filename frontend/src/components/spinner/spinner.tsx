import React from 'react';
import cn from "classnames";
import styles from './spinner.module.scss';


export interface SpinnerProps {
    classes?: string;
}

const Spinner:React.FC<SpinnerProps> = ({classes}) => {
    return (
        <div className={cn(styles.wrapper, classes)}>
            <div className={styles.spinner}>LOADING............</div>
        </div>
    );
};

export default Spinner;