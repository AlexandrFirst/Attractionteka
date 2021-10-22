import React from 'react';
import cn from 'classnames';

import styles from './button.module.scss';

export interface ButtonPops extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    classNames?: string;
}

const Button:React.FC<ButtonPops> = (props,) => {
    return (
        <button className={cn(styles.button, props.classNames)} {...props}>
            {props.children}
        </button>
    );
};

export default Button;