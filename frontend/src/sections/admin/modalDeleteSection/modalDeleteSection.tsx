import React from 'react';
import styles from './modalDeleteSection.module.scss';
import Button from "../../../components/button/button";

export interface ModalDeleteSectionProps {
    closeFunc: Function;
    deleteAttractionFunc: Function;
    id: number;
}

const ModalDeleteSection:React.FC<ModalDeleteSectionProps> = (
    {
        closeFunc,
        deleteAttractionFunc,
        id
    }) => {
    return (
        <>
            <h2 className={styles.header}>
                Confirmation of record deletion
            </h2>
            <h5 className={styles.body}>
                Are you sure you want to delete a point of interest entry? It will be impossible to restore.
            </h5>
            <div className={styles.btn_wrapper}>
                <Button
                    color={"light-blue"}
                    classes={styles.btn}
                    onClick={() => closeFunc()}
                >Cancel</Button>
                <Button
                    color={"red"}
                    classes={styles.btn}
                    onClick={() => deleteAttractionFunc(id)}
                >Delete</Button>
            </div>
        </>
    );
};

export default ModalDeleteSection;