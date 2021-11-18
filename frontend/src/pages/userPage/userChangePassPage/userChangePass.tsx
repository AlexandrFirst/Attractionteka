import React from 'react';
import styles from './userChangePass.module.scss';
import iconChangePass from './img/change_pass_icon.svg';

const UserChangePass = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.caption}>CHANGE PASSWORD</h2>
            <img className={styles.img} src={iconChangePass} alt="change_pass_icon" />
            <div>
                <form action="">

                </form>
            </div>
        </div>
    );
};

export default UserChangePass;