import React, {useEffect, useState} from 'react';
import styles from './mainPage.module.scss';
import {Link, useHistory} from 'react-router-dom';
import {RouteNames} from "../../routes";
import Modal from "../../components/modal/modal";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Promo from "./promo/Promo";
import PopularAttractions from "./popularAttractions/PopularAttractions";
import Container from "../../components/container/container";
import NewsSection from "./news/NewsSection";
import {PlaceService} from "../../services/place-service";
import {IPlaceResponse} from "../../models/place/IPlaceResponse";
import Button from '../../components/button/button';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { LocalStorageKey } from '../../types/LocalStorageKey';
import jwtDecode from 'jwt-decode';

const MainPage = () => {
    const history = useHistory();

    const [role, setRole] = useState('User')
    const [active, setActive] = React.useState(false);
    const [popularPlaces, setPopularPlaces] = useState<IPlaceResponse[]>([])
    const [newPlaces, setNewPlaces] = useState<IPlaceResponse[]>([])

    const openPageDynamicId = (path: string, id: number) => {
        history.push(`${path}/${id}`)
    }

    const goToUserCabinet = () => {
        const userStr = localStorage.getItem("user");
        const userObj = userStr && JSON.parse(userStr);
        userObj ? openPageDynamicId(RouteNames.USER, userObj.id) : history.push(RouteNames.ERROR);
    }

    const goToCreatePage = () => {
        history.push(RouteNames.EDIT)
    }

    useEffect(() => {
        const tokenFromLocalstorage = localStorage.getItem(LocalStorageKey.token)
        const userObj: { id: number, role: string } | null | '' = tokenFromLocalstorage && jwtDecode(tokenFromLocalstorage)
        userObj && setRole(userObj.role)
    }, [])

    return (
        <>
            <Header flag_search />
            <main className={styles.wrapper}>
                <Container classes={styles.container}>
                    <Promo />
                    <PopularAttractions popularPlaces={popularPlaces} />
                    <NewsSection newPlaces={newPlaces} />
                    {role === "Admin" && <div className={styles.btn_container}>
                         <Button color='green' classes={styles.btn} onClick={goToCreatePage}>ADD ATTRACTION</Button>    
                    </div>}
                </Container>
            </main>
        </>
    );
};

export default MainPage;