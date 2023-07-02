import React from 'react';
import styles from './blockUsersPage.module.scss';
import Button from "../../components/button/button";
import {useActions} from "../../hooks/useActions";
import InfoMessage from "../../components/infoMessage/infoMessage";

const BlockUsersPage = () => {

    const [nowId, setNowId] = React.useState(3);
    const [infoMessage, setInfoMessage] = React.useState<string>('');


    React.useEffect(() => {
        const userToBan = localStorage.getItem("banId");
        userToBan && setNowId(Number(userToBan));
    }, [])

    const {banUser} = useActions();

    const clickHandler = () => {
        banUser(nowId);
        setInfoMessage(`Пользователь с ${localStorage.getItem("banId")} успешно забанен`);
        localStorage.setItem("banId", (nowId+1).toString());
        const userToBan = localStorage.getItem("banId");
        userToBan && setNowId(Number(userToBan));

        setTimeout(() => {
            setInfoMessage("");
        }, 3000)
    }

    return (
        <div className={styles.wrapper}>
            {infoMessage !== '' && <InfoMessage classes={styles.error}>{infoMessage}</InfoMessage>}
            <Button classes={styles.btn} onClick={clickHandler}>Ban user with id: {nowId}</Button>
        </div>
    );
};

export default BlockUsersPage;