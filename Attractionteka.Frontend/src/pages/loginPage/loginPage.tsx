import React from 'react';
import LoginRegistrationBox from "../../components/loginRegistrationBox/loginRegistrationBox";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
    return (
        <div className={styles.boxContainer}>
            <LoginRegistrationBox />
        </div>
    );
};

export default LoginPage;