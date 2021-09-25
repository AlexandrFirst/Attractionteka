import React from 'react';

import styles from './formContainer..module.scss';

const FormContainer:React.FC = (props) => {
    return (
        <div className={styles.formContainer}>
            {props.children}
        </div>
    );
};

export default FormContainer;