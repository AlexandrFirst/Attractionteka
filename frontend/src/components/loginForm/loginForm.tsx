import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {AccountContext} from "../accountContext";

import styles from './loginForm.module.scss';

const LoginForm = () => {
    const { switchToRegister     } = React.useContext(AccountContext);

    return (
        <div className={styles.boxContainer}>
            <div className={styles.formContainer}>
                <input type="email" placeholder={"Email"} className={cn(styles.loginInput, styles.pt10)}/>
                <input type="password" placeholder={"Password"} className={styles.loginInput}/>
            </div>
            <Link
                className={cn(styles.mutedLink, styles.mt40per)}
                to={'#'}
            >Forget your password?</Link>
            <button className={styles.submitBtn}>Login</button>
            <Link className={cn(styles.mutedLink, styles.mt1em)} to={'#'}>
                Don't have an account?
                <Link
                    to={'#'}
                    className={styles.boldLink}
                    onClick={switchToRegister}
                >Signup</Link>
            </Link>
        </div>
    );
};

export default LoginForm;