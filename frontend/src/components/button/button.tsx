import React from 'react';
import cn from 'classnames';

import styles from './button.module.scss';

export interface ButtonPops extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    classes?: string;
    color?: "green" | "red" | "light-blue";
}

const Button:React.FC<ButtonPops> = (props,) => {
    return (
        <button className={cn(styles.button, props.classes, {
            [styles.green]: props.color === "green",
            [styles.red]: props.color === "red",
            [styles.lightBlue]: props.color === "light-blue",
        })} {...props}>
            {props.children}
        </button>
    );
};

export default Button;