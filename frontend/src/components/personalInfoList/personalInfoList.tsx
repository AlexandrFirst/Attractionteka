import React from 'react';
import styles from './personalInfoList.module.scss';
import {UserDTO} from "../../models/user/userDTO";
import useInput from "../../hooks/useInput";
import Input from "../input/input";
import {useActions} from "../../hooks/useActions";
import {useParams} from "react-router-dom";
import {LocalStorageKey} from "../../types/LocalStorageKey";

export interface PersonalInfoListProps {
    userInfo: UserDTO;
    setUserInfo: Function;
}


const PersonalInfoList:React.FC<PersonalInfoListProps> = (
    {
        userInfo,
        setUserInfo,
    }) => {

    const [userObj, setUserObj] = React.useState<UserDTO>({} as UserDTO);

    // const name = useInput('');
    // const surname = useInput('');
    // const mail = useInput('');

    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [mail, setMail] = React.useState('')

    const {setUserData} = useActions();

    const {id} = useParams<{id: string}>();

    React.useEffect(() => {
        const userStr = localStorage.getItem(LocalStorageKey.user);
        const userObjFromLocalStorage = userStr && JSON.parse(userStr);
        console.log("userObj... 1 time", userObjFromLocalStorage);

        setName(userObjFromLocalStorage.name);
        setSurname(userObjFromLocalStorage.surname);
        setMail(userObjFromLocalStorage.mail);

        setUserObj(userObjFromLocalStorage)

        // setUserObj(userInfo);
    }, [])

    // React.useEffect(() => {
    //     const itemsToRender: React.ReactElement[] = [];
    //     for (const key in userData) {
    //         if(key !== "id") {
    //             // @ts-ignore
    //             itemsToRender.push(<PersonalInfoItem criterion={capitalizeFirstLetter(`${key}:`)} value={userData[key]}/>)
    //         }
    //     }
    //     setRenderItems(itemsToRender);
    // }, [userData])

    React.useEffect(() => {
        console.log("userObj....EVERY TIME", userObj);

        setUserInfo(userObj);
        // console.log(userObj);
        // setUserData(userObj);
    }, [userObj])

    React.useEffect(() => {
        const newId = Number(id)
        const newObj: UserDTO = {...userObj, id: newId};


        newObj.name = name;
        newObj.surname = surname;
        newObj.mail = mail;


        setUserObj(newObj);
        // console.log(newObj);
    }, [name, surname, mail])

    function capitalizeFirstLetter(val: string) {
        return val.charAt(0).toUpperCase() + val.slice(1);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: Function) => {
        setValue(e.target.value);
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, setName);
    }

    const onSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, setSurname);
    }

    const onMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, setMail);
    }

    return (
        <div className={styles.wrapper}>
            <h5 className={styles.criterion}>{"Name:"}</h5>
            <Input value={userObj.name} onChange={onNameChange} classnames={styles.value} />
            <h5 className={styles.criterion}>{"Surname:"}</h5>
            <Input value={userObj.surname} onChange={onSurnameChange} classnames={styles.value} />
            <h5 className={styles.criterion}>{"Email:"}</h5>
            <Input value={userObj.mail} onChange={onMailChange} classnames={styles.value} />
        </div>
    );
};

export default PersonalInfoList;