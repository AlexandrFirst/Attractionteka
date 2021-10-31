import React from 'react';
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
import {passIcon} from "../loginForm/inputIconsData/inputIcons";
import ErrorMessage from "../errorMessage/errorMessage";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Spinner from "../spinner/spinner";
import {RouteNames} from "../../routes";

const RegisterForm = () => {
    const { switchToLogin } = React.useContext(AccountContext);
    const {registration} = useActions();

    const firstName = useInput('');
    const lastName = useInput('');
    const email = useInput('');
    const password = useInput('');
    const confirmPass = useInput('');

    const [inputType, setInputType] = React.useState('password');
    const [visible, setVisible] = React.useState(false);

    const {error, isAuth, isLoading} = useTypedSelector(state => state.auth);

    React.useEffect(() => {
        if(isAuth) {
            goToAnotherPage(RouteNames.MAIN);
        }
    }, [isAuth]);

    const handleOnChangeCheckbox = () => {
        visible ? setInputType("password") : setInputType("text");
        setVisible(prevState => !prevState);
    }

    const submitRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        registration(firstName.value, lastName.value, email.value, password.value);
    }

    const goToAnotherPage = (url: string) => {
        if (error === '') {
            window.location.assign(url);
        }
    }

    if(isLoading) {
        return <Spinner classes={styles.spinner}/>
    }

    return (
        <div className={styles.boxContainer}>
            <Marginer margin={"3em"} direction={"vertical"}/>
            <FormContainer>
                <Input {...firstName} type="text" placeholder={"Name"} icon={nameIcon}  required/>
                <Input {...lastName} type="text" placeholder={"Surname"} icon={nameIcon}  required/>
                <Input {...email} type="email" placeholder={"Email"} icon={emailIcon}  required/>
                <Input {...password} changevisibility={handleOnChangeCheckbox} type={inputType} placeholder={"Password"} icon={inputType === "password" ? invisiblePass : passIcon} required/>
                <Input {...confirmPass} changevisibility={handleOnChangeCheckbox} type={inputType} placeholder={"Confirm password"} icon={inputType === "password" ? invisiblePass : passIcon}/>
                {/*<Checkbox label={"show password"} onChange={handleOnChangeCheckbox}/>*/}
            </FormContainer>
            <ErrorMessage isVisible={error !== ''}>An account with that email exists! Forgot password?</ErrorMessage>
            <Marginer margin={"6px"} direction={"vertical"}/>
            <Button classes={styles.btn} onClick={submitRegistration}>Register</Button>
            <Marginer margin={"12px"} direction={"vertical"} />
            <MutedLink to={'#'} classes={styles.mutedLink}>
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