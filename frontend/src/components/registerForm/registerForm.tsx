import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';

import styles from './registerForm.module.scss';
import {AccountContext} from "../accountContext";
import useInput from "../../hooks/useInput";

const RegisterForm = () => {
    const { switchToLogin } = React.useContext(AccountContext);
    const username = useInput('');
    const email = useInput('');
    const password = useInput('');
    const confirmPass = useInput('');

    const submitRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    return (
        <div className={styles.boxContainer}>
            <div className={styles.formContainer}>
                <input {...username} type="text" placeholder={"Full name"} className={styles.loginInput}/>
                <input {...email} type="email" placeholder={"Email"} className={styles.loginInput}/>
                <input {...password} type="password" placeholder={"Password"} className={styles.loginInput}/>
                <input {...confirmPass} type="password" placeholder={"Confirm password"} className={styles.loginInput}/>
            </div>
            <Link
                className={cn(styles.mutedLink, styles.mt10)}
                to={'#'}
            >Forget your password?</Link>
            <button
                className={styles.submitBtn}
                onClick={submitRegistration}
            >Register</button>
            <Link className={cn(styles.mutedLink, styles.mt1em)} to={'#'}>
                Already have an account?
                <div
                    className={styles.boldLink}
                    onClick={switchToLogin}
                >Log in</div>
            </Link>
        </div>
    );
};

export default RegisterForm;