import React from 'react';
import AccountBox from "../../components/accountBox/accountBox";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
    return (
        <div className={styles.boxContainer}>
            <AccountBox />
        </div>
    );
};

export default LoginPage;