import React from 'react';
import {AccountContext} from "../accountContext";
import useInput from "../../hooks/useInput";
import Input from "../input/input";
import Button from "../button/button";
import FormContainer from "../formContainer/formContainer";
import MutedLink from "../mutedLink/mutedLink";
import styles from './loginForm.module.scss';
import {useActions} from "../../hooks/useActions";
import Marginer from "../marginer/marginer";
import {emailIcon, invisiblePass, passIcon} from "./inputIconsData/inputIcons";
import Checkbox from "../checkbox/checkbox";

const LoginForm = () => {
    const { switchToRegister } = React.useContext(AccountContext);
    const email = useInput('');
    const password = useInput('');
    const {login} = useActions();
    const [inputType, setInputType] = React.useState('password');
    const [visible, setVisible] = React.useState(false);

    const handleOnChangeCheckbox = () => {

        visible ? setInputType("password") : setInputType("text");
        setVisible(prevState => !prevState);
    }

    const submitLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        login(email.value, password.value);
    }

    return (
        <div className={styles.boxContainer}>
            <Marginer margin={"50px"} direction={"vertical"}/>
            <FormContainer>
                <Input {...email} type="email" placeholder={"Email"} icon={emailIcon} required/>
                <Input {...password} type={inputType} placeholder={"Password"} icon={inputType === "password" ? invisiblePass : passIcon} required/>
                <Checkbox onChange={handleOnChangeCheckbox} label={"show password"}/>
            </FormContainer>
            <Marginer margin={"80px"} direction={"vertical"}/>
            <MutedLink
                to={'#'}
            >Forget your password?</MutedLink>
            <Marginer margin={"5px"} direction={"vertical"}/>
            <Button onClick={submitLogin}>Login</Button>
            <Marginer margin={"10px"} direction={"vertical"}/>
            <MutedLink to={'#'}>
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