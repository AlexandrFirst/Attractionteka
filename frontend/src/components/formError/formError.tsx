import React from 'react';
import cn from "classnames";

import styles from './formError.module.scss';
import error from './img/error.svg';

export interface FormErrorProps {
    // message: string;
    classNames?: string;
}

const FormError:React.FC<FormErrorProps> = ({classNames, children}) => {
    return (
        <div className={cn(styles.error, classNames)}>
            <img src={error} alt="error" className={styles.error_img}/>
            {children}
        </div>
    );
};

export default FormError;