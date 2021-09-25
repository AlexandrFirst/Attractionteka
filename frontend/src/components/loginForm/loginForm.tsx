import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {AccountContext} from "../accountContext";

import styles from './loginForm.module.scss';
import useInput from "../../hooks/useInput";

const LoginForm = () => {
    const { switchToRegister } = React.useContext(AccountContext);
    const email = useInput('');
    const password = useInput('');

    const submitLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        ///TODO: запрос на логин на сервер (добавить в action-creator в redux)
    }

    return (
        <div className={styles.boxContainer}>
            <div className={styles.formContainer}>
                <input {...email} type="email" placeholder={"Email"} className={cn(styles.loginInput, styles.pt10)}/>
                <input {...password} type="password" placeholder={"Password"} className={styles.loginInput}/>
            </div>
            <Link
                className={cn(styles.mutedLink, styles.mt40per)}
                to={'#'}
            >Forget your password?</Link>
            <button
                className={styles.submitBtn}
                onClick={submitLogin}
            >Login</button>
            <Link className={cn(styles.mutedLink, styles.mt1em)} to={'#'}>
                Don't have an account?
                <div
                    className={styles.boldLink}
                    onClick={switchToRegister}
                >Signup</div>
            </Link>
        </div>
    );
};

export default LoginForm;