import React from 'react';
import styles from './personalInfoItem.module.scss';
import Input from "../../input/input";
import useInput from "../../../hooks/useInput";

export interface PersonalInfoItemProps {
    criterion: string;
    value: string;
}

const PersonalInfoItem:React.FC<PersonalInfoItemProps>= ({criterion, value}) => {
    const inputValue = useInput(value);


    return (
        <>
            <h5 className={styles.criterion}>{criterion}</h5>
            <Input {...inputValue} classnames={styles.value} />
        </>
    );
};

export default PersonalInfoItem;