import React from 'react';
import styles from './personalInfoItem.module.scss';

export interface PersonalInfoItemProps {
    criterion: string;
    value: string;
}

const PersonalInfoItem:React.FC<PersonalInfoItemProps>= ({criterion, value}) => {
    return (
        <>
            <h5 className={styles.criterion}>{criterion}</h5>
            <h5 className={styles.value}>{value}</h5>
        </>
    );
};

export default PersonalInfoItem;