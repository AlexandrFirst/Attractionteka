import React from 'react';
import styles from './userProfilePage.module.scss';
import logo from './img/Attractionteka.svg';
import Button from "../../../components/button/button";
import PersonalInfoList from "../../../components/personalInfoList/personalInfoList";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useParams} from "react-router-dom";
import {useActions} from "../../../hooks/useActions";
import {UserDTO} from "../../../models/user/userDTO";
import InfoMessage from "../../../components/infoMessage/infoMessage";

const UserProfilePage = () => {
    const {userData} = useTypedSelector(state => state.user);
    const {updateUserInfo, setUserData} = useActions();

    const [infoMessage, setInfoMessage] = React.useState<string>('');
    const [user, setUser] = React.useState<UserDTO>({} as UserDTO);

    React.useEffect(() => {
        // const user: UserDTO = {...userData};
        // setUserData(user);
        // console.info("userData....... 1 time", userData);
        const userStr = localStorage.getItem("user");
        const userObj = userStr && JSON.parse(userStr);
        setUser(userObj)

        if(!userObj){
            setInfoMessage("Войдите в аккаунт")
        } else {
            setInfoMessage('');
        }
    }, [])

    React.useEffect(() => {
        console.log("user.....",user);
    }, [user])


    const updateInfo = () => {

        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        setInfoMessage("Ваши данные успешно сохранены");
        setTimeout(() => {
            setInfoMessage("");
        }, 3000)
        // console.log(userData)
        // updateUserInfo(userData);
    }

    return (
        <>

            <div className={styles.wrapper}>
                {infoMessage !== '' && <InfoMessage classes={styles.error}>{infoMessage}</InfoMessage>}
                <h2 className={styles.caption}>USER PROFILE</h2>
                <img className={styles.img} src={logo} alt="user_photo"/>
                <div className={styles.personal_info}>
                    <PersonalInfoList setUserInfo={setUser} userInfo={user}/>
                </div>
                <Button
                    classes={styles.btn}
                    onClick={updateInfo}
                >Save profile</Button>
            </div>
        </>
    );
};

export default UserProfilePage;