import React from 'react';
import {AccountContext} from "../accountContext";
import { motion } from "framer-motion";

import LoginForm from "../loginForm/loginForm";
import RegisterForm from "../registerForm/registerForm";

import styles from './loginRegistrationBox.module.scss';
const LoginRegistrationBox = () => {

    const backdropVariants = {
        expanded: {
            width: "233%",
            height: "1050px",
            borderRadius: "20%",
            transform: "rotate(60deg)",
        },
        collapsed: {
            width: "160%",
            height: "550px",
            borderRadius: "50%",
            transform: "rotate(60deg)",
        },
    };

    const expandingTransition = {
        type: "spring",
        duration: 2.3,
        stiffness: 30,
    };

    const [isExpanded, setExpanded] = React.useState(false);
    const [active, setActive] = React.useState("login");

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToRegister = (e: React.MouseEvent<HTMLDivElement>) => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("register");
        }, 400);
    };

    const switchToLogin = (e: React.MouseEvent<HTMLDivElement>) => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("login");
        }, 400);
    };

    const contextValue = { switchToRegister, switchToLogin };

    return (
        <AccountContext.Provider value={contextValue}>
            <div className={styles.boxContainer}>
                <div className={styles.topContainer}>
                    <motion.div
                        className={styles.backDrop}
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    {active === "login" && (
                            <div className={styles.headerContainer}>
                                <h2 className={styles.headerText}>Welcome</h2>
                                <h2 className={styles.headerText}>Back</h2>
                                <h5 className={styles.smallText}>Please login to continue!</h5>
                            </div>
                    )}
                    {active === "register" && (
                        <div className={styles.headerContainer}>
                            <h2 className={styles.headerText}>Create</h2>
                            <h2 className={styles.headerText}>Account</h2>
                            <h5 className={styles.smallText}>Please register to continue!</h5>
                        </div>
                    )}
                </div>
                <div className={styles.innerContainer}>
                    {active === "login" && <LoginForm/>}
                    {active === "register" && <RegisterForm/>}
                </div>
            </div>
        </AccountContext.Provider>
    );
};

export default LoginRegistrationBox;