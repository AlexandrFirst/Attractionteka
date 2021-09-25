import React from 'react';

import styles from './button.module.scss';

export interface ButtonPops extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    classnames?: string;
}

const Button:React.FC<ButtonPops> = (props) => {
    return (
        <button className={styles.button} {...props}>
            {props.children}
        </button>
    );
};

export default Button;