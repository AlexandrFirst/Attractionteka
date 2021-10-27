import React from 'react';
import EditorSection from "../../sections/admin/editorSection/editorSection";
import AudioAdminSection from "../../sections/admin/audioAdminSection/audioAdminSection";
import VideoAdminSection from "../../sections/admin/videoAdminSection/videoAdminSection";
import {Link} from "react-router-dom";
import Container from "../../components/container/container";
import KeywordsSection from "../../sections/admin/keywordsSection/keywordsSection";
import Button from "../../components/button/button";

import arrowBack from "../../sections/admin/editorSection/img/arrow_icon.svg";
import styles from './editPage.module.scss';
import cn from "classnames";
import ShortDescriptionSection from "../../sections/admin/shortDescriptionSection/shortDescriptionSection";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Spinner from "../../components/spinner/spinner";

const EditPage = () => {
    const {photos,videos,audios,loadingAddNewPlace,keywords,editorContent,shortDescription} = useTypedSelector(state => state.editor);

    const {addNewPlace} = useActions();

    const TryAddNewPlace = () => {
        // console.log(placeInfo);
        const photoUrls = photos.data.map(photo => photo.url);
        const videoUrls = videos.data.map(video => video.url);
        const audioUrls = audios.data.map(audio => audio.url);
        console.log(photoUrls);
        console.log(audioUrls);
        console.log(videoUrls);
        addNewPlace(photos.data,videos.data,audios.data,editorContent,keywords,shortDescription);
    }

    // if(loadingAddNewPlace) {
    //     return <Spinner/>
    // }

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.working_place}>
                    <Link to={"/"} className={styles.back_wrapper}>
                        <img src={arrowBack} alt="back"/>
                        <h5 className={styles.back_title}>Home - Attrations</h5>
                    </Link>
                    <div className={styles.save_delete_top}>
                        <Button
                            classes={cn(styles.btn_top, styles.save_top)}
                            onClick={TryAddNewPlace}
                        >Save</Button>
                        <Button classes={cn(styles.btn_top, styles.delete_top)}>Delete</Button>
                    </div>
                    <EditorSection/>
                    <ShortDescriptionSection/>
                    <KeywordsSection/>
                    <AudioAdminSection/>
                    <VideoAdminSection/>
                    <div
                        className={styles.btn_container}
                        onClick={TryAddNewPlace}
                    >
                        <Button classes={styles.save_btn}>Save</Button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default EditPage;