import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {RouteNames} from "../../routes";
import styles from './mainPage.module.scss';
import Modal from "../../components/modal/modal";
import Sidebar from "../../components/sidebar/sidebar";

const MainPage = () => {
    const history = useHistory();
    const [active, setActive] = React.useState(false);

    const openAttraction = (path: string, id: number) => {
        history.push(`${path}/${id}`)
    }

    return (
        <>
            {/*<Header/>*/}
            <ul>
                <li><Link to={RouteNames.LOGIN}>To Login page</Link></li>
                <br/>
                <li><Link to={RouteNames.EDIT}>To EDIT page</Link></li>
                <br/>
                <li><div className={styles.link} onClick={() => openAttraction(RouteNames.ATTRACTION,22)}>To ATTRACTION page</div></li>
                <br/>
                <li><div className={styles.link} onClick={() => openAttraction(RouteNames.USER,1)}>To USER PERSONAL CABINET</div></li>

            </ul>
            {/*<Footer/>*/}
        </>
    );
};

export default MainPage;