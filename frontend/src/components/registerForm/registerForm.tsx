import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import useInput from "../../hooks/useInput";
import {AccountContext} from "../accountContext";

import styles from './registerForm.module.scss';
import Input from "../input/input";
import Button from "../button/button";
import FormContainer from "../formContainer/formContainer";
import MutedLink from "../mutedLink/mutedLink";

const RegisterForm = () => {
    const { switchToLogin } = React.useContext(AccountContext);
    const username = useInput('');
    const email = useInput('');
    const password = useInput('');
    const confirmPass = useInput('');

    const submitRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(username, email, password, confirmPass);
    }

    return (
        <div className={styles.boxContainer}>
            <FormContainer>
                <Input {...username} type="text" placeholder={"Full name"}/>
                <Input {...email} type="email" placeholder={"Email"}/>
                <Input {...password} type="password" placeholder={"Password"}/>
                <Input {...confirmPass} type="password" placeholder={"Confirm password"}/>
            </FormContainer>
            <MutedLink
                classes="mt25"
                to={'#'}>Forget your password?</MutedLink>
            <Button onClick={submitRegistration}>Register</Button>
            <MutedLink to={'#'} classes="mt10">
                Already have an account?
                <div
                    className={styles.boldLink}
                    onClick={switchToLogin}
                >Log in</div>
            </MutedLink>
        </div>
    );
};

export default RegisterForm;