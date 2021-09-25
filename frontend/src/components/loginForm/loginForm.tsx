import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {AccountContext} from "../accountContext";
import useInput from "../../hooks/useInput";
import Input from "../input/input";
import Button from "../button/button";
import FormContainer from "../formContainer/formContainer";
import MutedLink from "../mutedLink/mutedLink";
import styles from './loginForm.module.scss';

const LoginForm = () => {
    const { switchToRegister } = React.useContext(AccountContext);
    const email = useInput('');
    const password = useInput('');

    const submitLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(email, password);
        ///TODO: запрос на логин на сервер (добавить в action-creator в redux)
    }

    return (
        <div className={styles.boxContainer}>
            <FormContainer>
                <Input {...email} type="email" placeholder={"Email"}/>
                <Input {...password} type="password" placeholder={"Password"}/>
            </FormContainer>
            <MutedLink
                to={'#'}
                classes="mt40per"
            >Forget your password?</MutedLink>
            <Button onClick={submitLogin}>Login</Button>
            <MutedLink to={'#'} classes="mt10">
                Don't have an account?
                <div
                    className={styles.boldLink}
                    onClick={switchToRegister}
                >Signup</div>
            </MutedLink>
        </div>
    );
};

export default LoginForm;