import React from 'react';
import EditorSection from "../../sections/editorSection/editorSection";
import AudioAdminSection from "../../sections/audioAdminSection/audioAdminSection";
import VideoAdminSection from "../../sections/videoAdminSection/videoAdminSection";
import {Link} from "react-router-dom";
import arrowBack from "../../sections/editorSection/img/arrow_icon.svg";

import styles from './editPage.module.scss';
import Container from "../../components/container/container";
import KeywordsSection from "../../sections/keywordsSection/keywordsSection";

const EditPage = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.working_place}>
                    <Link to={"/"} className={styles.img_wrapper}>
                        <img src={arrowBack} alt="back"/>
                    </Link>
                    <EditorSection/>
                    <KeywordsSection/>
                    <AudioAdminSection/>
                    <VideoAdminSection/>
                </div>
            </Container>
        </div>
    );
};

export default EditPage;