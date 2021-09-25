import React from 'react';
import cn from "classnames";

import styles from './input.module.scss';

export interface InputPops extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    classnames?: string;
}

const Input:React.FC<InputPops> = (props) => {
    return (
        <input
            className={cn(styles.input, props.classnames)}
            {...props}
        />
    );
};

export default Input;