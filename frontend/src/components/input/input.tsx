import React from 'react';
import cn from "classnames";

import styles from './input.module.scss';

export interface InputPops extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    classnames?: string;
    icon?: React.ReactNode;
}
const Input:React.FC<InputPops> = (props) => {

    return (
        <div className={styles.wrapper}>
            <input
                className={cn(styles.input, props.classnames)}
                {...props}
            />
            <div className={styles.icon}>
                {props.icon}
            </div>
        </div>
    );
};

export default Input;