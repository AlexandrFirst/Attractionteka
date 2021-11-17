import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {RouteNames} from "../../routes";
import styles from './mainPage.module.scss';
import Modal from "../../components/modal/modal";

const MainPage = () => {
    const history = useHistory();
    const [active, setActive] = React.useState(false);

    const openAttraction = (id: number) => {
        history.push(`${RouteNames.ATTRACTION}/${id}`)
    }

    return (
        <>
            {/*<Header/>*/}
            <ul>
                <li><Link to={RouteNames.LOGIN}>To Login page</Link></li>
                <br/>
                <li><Link to={RouteNames.EDIT}>To EDIT page</Link></li>
                <br/>
                <li><div className={styles.link} onClick={() => openAttraction(22)}>To ATTRACTION page</div></li>
            </ul>
            {/*<Footer/>*/}
        </>
    );
};

export default MainPage;