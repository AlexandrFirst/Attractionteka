import React from 'react';

import styles from './formContainer..module.scss';
import cn from "classnames";

export interface FormContainerProps {
    classNames?: string;
}

const FormContainer:React.FC<FormContainerProps> = (props, classNames) => {
    return (
        <div className={cn(styles.formContainer, classNames)}>
            {props.children}
        </div>
    );
};

export default FormContainer;