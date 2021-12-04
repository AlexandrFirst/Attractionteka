import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {RouteNames} from "../../routes";
import styles from './mainPage.module.scss';
import Modal from "../../components/modal/modal";
import Sidebar from "../../components/sidebar/sidebar";

const MainPage = () => {
    const history = useHistory();
    const [active, setActive] = React.useState(false);

    const openPageDynamicId = (path: string, id: number) => {
        history.push(`${path}/${id}`)
    }

    const goToUserCabinet = () => {
        const userStr = localStorage.getItem("user");
        const userObj = userStr && JSON.parse(userStr);
        userObj ? openPageDynamicId(RouteNames.USER, userObj.id) : history.push(RouteNames.ERROR);
    }

    return (
        <>
            {/*<Header/>*/}
            <ul>
                <li><Link to={RouteNames.LOGIN}>To Login page</Link></li>
                <br/>
                <li><Link to={RouteNames.EDIT}>To EDIT page</Link></li>
                <br/>
                <li><div className={styles.link} onClick={() => openPageDynamicId(RouteNames.ATTRACTION,21)}>To ATTRACTION page</div></li>
                <br/>
                <li><div className={styles.link} onClick={goToUserCabinet}>To USER PERSONAL CABINET</div></li>
                <br/>
                <li><Link to={RouteNames.FILTERED_PLACES}>To Filtered Places</Link></li>

            </ul>
            {/*<Footer/>*/}
        </>
    );
};

export default MainPage;