import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';

import styles from './registerForm.module.scss';
import {AccountContext} from "../accountContext";

const RegisterForm = () => {
    const { switchToLogin } = React.useContext(AccountContext);

    return (
        <div className={styles.boxContainer}>
            <div className={styles.formContainer}>
                <input type="text" placeholder={"Full name"} className={styles.loginInput}/>
                <input type="email" placeholder={"Email"} className={styles.loginInput}/>
                <input type="password" placeholder={"Password"} className={styles.loginInput}/>
                <input type="password" placeholder={"Confirm password"} className={styles.loginInput}/>
            </div>
            <Link
                className={cn(styles.mutedLink, styles.mt10)}
                to={'#'}
            >Forget your password?</Link>
            <button className={styles.submitBtn}>Register</button>
            <Link className={cn(styles.mutedLink, styles.mt1em)} to={'#'}>
                Already have an account?
                <Link
                    to={'#'}
                    className={styles.boldLink}
                    onClick={switchToLogin}
                >Log in</Link>
            </Link>
        </div>
    );
};

export default RegisterForm;