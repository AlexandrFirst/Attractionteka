import React from 'react';
import {UserDTO} from "../../models/user/userDTO";
import PersonalInfoItem from "./personalInfoItem/personalInfoItem";
import styles from './personalInfoList.module.scss';

export interface PersonalInfoListProps {
    userData: UserDTO;
}


const PersonalInfoList:React.FC<PersonalInfoListProps> = (
    {
        userData
    }) => {

    const [renderItems, setRenderItems] = React.useState<React.ReactElement[]>();

    React.useEffect(() => {
        const itemsToRender: React.ReactElement[] = [];
        for (const key in userData) {
            if(key !== "id") {
                // @ts-ignore
                itemsToRender.push(<PersonalInfoItem criterion={capitalizeFirstLetter(`${key}:`)} value={userData[key]}/>)
            }
        }
        setRenderItems(itemsToRender);

    }, [userData])

    function capitalizeFirstLetter(val: string) {
        return val.charAt(0).toUpperCase() + val.slice(1);
    }

    return (
        <div className={styles.wrapper}>
            {renderItems}
        </div>
    );
};

export default PersonalInfoList;