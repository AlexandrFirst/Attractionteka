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
import ErrorMessage from "../errorMessage/errorMessage";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Spinner from "../spinner/spinner";
import {RouteNames} from "../../routes";
import {useHistory} from "react-router-dom";

const LoginForm = () => {
    const { switchToRegister } = React.useContext(AccountContext);
    const email = useInput('');
    const password = useInput('');
    const {login} = useActions();
    const [inputType, setInputType] = React.useState('password');
    const [visible, setVisible] = React.useState(false);
    const history = useHistory();

    const {isLoading, error, isAuth} = useTypedSelector(state => state.auth);

    const goToAnotherPage = (url: string) => {
        if (error === '') {
            history.push(url);
        }
    }

    React.useEffect(() => {
        if(isAuth) {
            goToAnotherPage(RouteNames.MAIN);
        }
    }, [isAuth]);

    const handleOnChangeCheckbox = () => {
        visible ? setInputType("password") : setInputType("text");
        setVisible(prevState => !prevState);
    }

    const submitLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        login(email.value, password.value);
    }


    if(isLoading) {
        return <Spinner classes={styles.spinner}/>
    }

    return (
        <div className={styles.boxContainer}>
            <Marginer margin={"6em"} direction={"vertical"}/>
            <FormContainer>
                <Input {...email} type="email" placeholder={"Email"} icon={emailIcon} required/>
                <Input {...password}
                       changevisibility={handleOnChangeCheckbox}
                       type={inputType} placeholder={"Password"}
                       icon={inputType === "password" ? invisiblePass : passIcon}
                       required
                />
                {/*<Checkbox onChange={handleOnChangeCheckbox} label={"show password"}/>*/}
            </FormContainer>
            {/*<Marginer margin={"90px"} direction={"vertical"}/>*/}
            {/*<MutedLink*/}
            {/*    to={'#'}*/}
            {/*>Forgot your password?</MutedLink>*/}
            <ErrorMessage isVisible={error !== ''}>An account with that email or password does not exist! Forgot password?</ErrorMessage>
            <Marginer margin={"100px"} direction={"vertical"}/>
            <MutedLink
                // classes="mt25"
                to={'#'} classes={styles.muted_link}>Forgot password?</MutedLink>
            <Marginer margin={"10px"} direction={"vertical"}/>
            <Button classes={styles.btn} onClick={submitLogin}>Log in</Button>
            <Marginer margin={"10px"} direction={"vertical"}/>
            <MutedLink to={'#'} classes={styles.muted_link}>
                Don't have an account?
                <div
                    className={styles.bold_link}
                    onClick={switchToRegister}
                >Sign up</div>
            </MutedLink>
        </div>
    );
};

export default LoginForm;