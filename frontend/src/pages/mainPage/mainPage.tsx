import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {RouteNames} from "../../routes";
import styles from './mainPage.module.scss';
import Modal from "../../components/modal/modal";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Promo from "./promo/Promo";
import PopularAttractions from "./popularAttractions/PopularAttractions";
import Container from "../../components/container/container";
import NewsSection from "./news/NewsSection";
import {PlaceService} from "../../services/place-service";
import {IPlaceResponse} from "../../models/place/IPlaceResponse";

const MainPage = () => {
    const history = useHistory();
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

    // useEffect(() => {
    //     Promise.resolve(PlaceService.getPlaces({ sortByRating: true }))
    //             .then((places) => {
    //                 console.log("PLACES",places)
    //                 setPopularPlaces(places.data.reverse())
    //             })
    //
    //         .then(() => {
    //             Promise.resolve(PlaceService.getPlaces({ sortByDateTime: true }))
    //                 .then(places => setNewPlaces(places.data))
    //         })
    // }, [])

    return (
        <>
            <Header flag_search />
            <main className={styles.wrapper}>
                <Container classes={styles.container}>
                    <Promo />
                    <PopularAttractions popularPlaces={popularPlaces} />
                    <NewsSection newPlaces={newPlaces} />

                    {/*<ul>*/}
                    {/*    <li><Link to={RouteNames.LOGIN}>To Login page</Link></li>*/}
                    {/*    <br/>*/}
                    {/*    <li><Link to={RouteNames.EDIT}>To EDIT page</Link></li>*/}
                    {/*    <br/>*/}
                    {/*    <li><div className={styles.link} onClick={() => openPageDynamicId(RouteNames.ATTRACTION,21)}>To ATTRACTION page</div></li>*/}
                    {/*    <br/>*/}
                    {/*    <li><div className={styles.link} onClick={goToUserCabinet}>To USER PERSONAL CABINET</div></li>*/}
                    {/*    <br/>*/}
                    {/*    <li><Link to={RouteNames.FILTERED_PLACES}>To Filtered Places</Link></li>*/}

                    {/*</ul>*/}
                </Container>
            </main>
            {/*<Footer/>*/}
        </>
    );
};

export default MainPage;