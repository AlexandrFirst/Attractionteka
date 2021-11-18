import React from 'react';
import styles from './userProfilePage.module.scss';
import logo from './img/Attractionteka.svg';
import Button from "../../../components/button/button";
import PersonalInfoList from "../../../components/personalInfoList/personalInfoList";
import {userData} from "../../../MOCKDATA/USER_DATA";

const UserProfilePage = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.caption}>USER PROFILE</h2>
            <img className={styles.img} src={logo} alt="user_photo"/>
            <Button classes={styles.btn}>Edit profile</Button>
            <div className={styles.personal_info}>
                <PersonalInfoList userData={userData}/>
            </div>
        </div>
    );
};

export default UserProfilePage;