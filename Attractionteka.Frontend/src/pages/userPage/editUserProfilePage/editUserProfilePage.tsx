import React from 'react';
import styles from './EditUserProfilePage.module.scss';
import logo from "./img/Attractionteka.svg";
import Button from "../../../components/button/button";
import PersonalInfoList from "../../../components/personalInfoList/personalInfoList";
import {userData} from "../../../MOCKDATA/USER_DATA";

const EditUserProfilePage = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.caption}>EDIT PROFILE BLAT</h2>
            <img className={styles.img} src={logo} alt="user_photo"/>
            <Button classes={styles.btn}>Edit profile</Button>
            <div className={styles.personal_info}>
                {/*<PersonalInfoList userInfo={userData}/>*/}
            </div>
        </div>
    );
};

export default EditUserProfilePage;