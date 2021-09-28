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
import Marginer from "../marginer/marginer";
import {emailIcon, invisiblePass, nameIcon} from "./inputIconsData/inputIcons";
import {useActions} from "../../hooks/useActions";

const RegisterForm = () => {
    const { switchToLogin } = React.useContext(AccountContext);
    const {registration} = useActions();

    const firstName = useInput('');
    const lastName = useInput('');
    const email = useInput('');
    const password = useInput('');
    const confirmPass = useInput('');

    const submitRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        registration(firstName.value, lastName.value, email.value, password.value);
    }

    return (
        <div className={styles.boxContainer}>
            <FormContainer>
                <Input {...firstName} type="text" placeholder={"First name"} icon={nameIcon}/>
                <Input {...lastName} type="text" placeholder={"Last name"} icon={nameIcon}/>
                <Input {...email} type="email" placeholder={"Email"} icon={emailIcon}/>
                <Input {...password} type="password" placeholder={"Password"} icon={invisiblePass}/>
                <Input {...confirmPass} type="password" placeholder={"Confirm password"}/>
            </FormContainer>
            <Marginer margin={"10px"} direction={"vertical"}/>
            <MutedLink
                // classes="mt25"
                to={'#'}>Forget your password?</MutedLink>
            <Marginer margin={"6px"} direction={"vertical"}/>
            <Button onClick={submitRegistration}>Register</Button>
            <Marginer margin={"15px"} direction={"vertical"} />
            <MutedLink to={'#'}>
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