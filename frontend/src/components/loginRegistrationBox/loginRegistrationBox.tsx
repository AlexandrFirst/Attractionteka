import React from 'react';
import {AccountContext} from "../accountContext";
import { motion } from "framer-motion";

import LoginForm from "../loginForm/loginForm";
import RegisterForm from "../registerForm/registerForm";

import styles from './loginRegistrationBox.module.scss';
import {LocalStorageKey} from "../../models/LocalStorageKey";

export const enum SignPageList {
    LOGIN="login",
    REGISTER="register",
}
const LoginRegistrationBox = () => {

    const backdropVariants = {
        expanded: {
            width: "200%",
            height: "1100px",
            borderRadius: "20%",
            transform: "rotate(60deg)",
        },
        collapsed: {
            width: "133%",
            height: "500px",
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

    React.useEffect(() => {
        const nowForm = localStorage.getItem(LocalStorageKey.nowLoginForm);
        setActive(nowForm || SignPageList.LOGIN);
        return () => {
            localStorage.removeItem(LocalStorageKey.nowLoginForm);
        }
    }, []);

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToRegister = (e: React.MouseEvent<HTMLDivElement>) => {
        localStorage.setItem(LocalStorageKey.nowLoginForm, SignPageList.REGISTER);
        playExpandingAnimation();
        setTimeout(() => {
            setActive(SignPageList.REGISTER);
        }, 700);
    };

    const switchToLogin = (e: React.MouseEvent<HTMLDivElement>) => {
        localStorage.setItem(LocalStorageKey.nowLoginForm, SignPageList.LOGIN);
        playExpandingAnimation();
        setTimeout(() => {
            setActive(SignPageList.LOGIN);
        }, 700);
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
                                {/* <h2 className={styles.headerText}>Attractionteka</h2> */}
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