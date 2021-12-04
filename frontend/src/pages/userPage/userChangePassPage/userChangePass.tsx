import React from 'react';
import styles from './userChangePass.module.scss';
import iconChangePass from './img/change_pass_icon.svg';
import Input from "../../../components/input/input";
import {invisiblePass, passIcon} from "../../../components/loginForm/inputIconsData/inputIcons";
import useInput from "../../../hooks/useInput";
import Button from "../../../components/button/button";
import {useActions} from "../../../hooks/useActions";
import {LocalStorageKey} from "../../../types/LocalStorageKey";
import {UpdatePasswordDto} from "../../../models/user/updatePasswordDto";
import {useParams} from "react-router-dom";
import InfoMessage from "../../../components/infoMessage/infoMessage";

const UserChangePass = () => {
    const [inputType, setInputType] = React.useState('password');
    const [visible, setVisible] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState<string>('');



    const oldPass = useInput('');
    const newPass = useInput('');
    const confirmNewPass = useInput('');

    const {updateUserPassword} = useActions();
    const {id} = useParams<{id: string}>();

    React.useEffect(() => {
        // const user: UserDTO = {...userData};
        // setUserData(user);
        // console.info("userData....... 1 time", userData);
        const userStr = localStorage.getItem("user");
        const userObj = userStr && JSON.parse(userStr);

        if(!userObj){
            setInfoMessage("Войдите в аккаунт")
        } else {
            setInfoMessage('');
        }
    }, [])

    const handleOnChangeCheckbox = () => {
        visible ? setInputType("password") : setInputType("text");
        setVisible(prevState => !prevState);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(newPass.value !== confirmNewPass.value) {
            setInfoMessage("Поля не совпадают!");
            setTimeout(() => {
                setInfoMessage("");
            }, 3000)
            return;
        }
        const token = localStorage.getItem(LocalStorageKey.token);
        if(token) {
            const passwords: UpdatePasswordDto = {
                oldPassword: oldPass.value,
                newPassword: newPass.value
            }
            updateUserPassword(passwords, token);
            setInfoMessage("Ваш пароль успешно обновлен!");
            setTimeout(() => {
                setInfoMessage("");
            }, 3000)
        }
    }

    return (
        <div className={styles.wrapper}>
            {infoMessage !== '' && <InfoMessage classes={styles.error}>{infoMessage}</InfoMessage>}
            <h2 className={styles.caption}>CHANGE PASSWORD</h2>
            <img className={styles.img} src={iconChangePass} alt="change_pass_icon" />
            <form action="" className={styles.formInputs} onSubmit={handleSubmit}>
                <Input {...oldPass}
                       changevisibility={handleOnChangeCheckbox}
                       type={inputType} placeholder={"Old Password"}
                       icon={inputType === "password" ? invisiblePass : passIcon}
                       required
                />
                <Input {...newPass}
                       changevisibility={handleOnChangeCheckbox}
                       type={inputType} placeholder={"New Password (6+ characters)"}
                       icon={inputType === "password" ? invisiblePass : passIcon}
                       required
                />
                <Input {...confirmNewPass}
                       changevisibility={handleOnChangeCheckbox}
                       type={inputType} placeholder={"Confirm new password"}
                       icon={inputType === "password" ? invisiblePass : passIcon}
                       required
                />
                <Button classes={styles.btn}>Change password</Button>
            </form>
        </div>
    );
};

export default UserChangePass;