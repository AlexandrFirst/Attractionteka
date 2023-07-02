import React from 'react';

import styles from './checkbox.module.scss';

export interface CheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    label: string;
}

const Checkbox:React.FC<CheckboxProps> = (props) => {
    return (
        <div className={styles.wrapper}>
            <input {...props} type="checkbox" id="checkBox"/>
            <label
                className={styles.label}
                htmlFor="checkBox">{props.label}</label>
        </div>
    );
};

export default Checkbox;