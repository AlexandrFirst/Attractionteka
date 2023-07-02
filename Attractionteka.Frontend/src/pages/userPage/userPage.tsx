import React from 'react';
import Sidebar from "../../components/sidebar/sidebar";
import {sideList, reactElements} from "./sideList";
import styles from './userPage.module.scss';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const UserPage = () => {
    const [nowIndex, setNowIndex] = React.useState(0);
    const [renderItem, setRenderItem] = React.useState<React.ReactElement>();

    React.useEffect(() => {
        setRenderItem(reactElements[nowIndex])
    }, [nowIndex])

    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar sideList={sideList} nowIndex={nowIndex} setNowIndex={setNowIndex}/>
                {renderItem}
            </div>
            <Footer />
        </>
    );
};

export default UserPage;