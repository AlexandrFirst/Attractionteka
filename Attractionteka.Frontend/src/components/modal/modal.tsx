import React from 'react';
import styles from './modal.module.scss';
import cn from "classnames";

export interface ModalProps {
    classes?: string;
    active: boolean;
    setActive: Function;
}

const Modal:React.FC<ModalProps> = (
    {
        active,
        setActive,
        classes,
        children
    }) => {
    return (
        <div className={cn(styles.modal, {
            [styles.modal_active]: active,
        })} onClick={() => setActive(false)}>

            <div className={cn(styles.modal__content, {
                [styles.modal__content_active]: active,
            })} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;