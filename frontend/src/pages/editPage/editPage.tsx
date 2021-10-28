import React from 'react';
import cn from "classnames";
import EditorSection from "../../sections/admin/editorSection/editorSection";
import AudioAdminSection from "../../sections/admin/audioAdminSection/audioAdminSection";
import VideoAdminSection from "../../sections/admin/videoAdminSection/videoAdminSection";
import {Link} from "react-router-dom";
import Container from "../../components/container/container";
import KeywordsSection from "../../sections/admin/keywordsSection/keywordsSection";
import Button from "../../components/button/button";

import arrowBack from "../../sections/admin/editorSection/img/arrow_icon.svg";
import styles from './editPage.module.scss';
import ShortDescriptionSection from "../../sections/admin/shortDescriptionSection/shortDescriptionSection";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {IMediaFileDTO} from "../../models/admin/IMediaFileDTO";
import {IMediaResponse} from "../../models/admin/IMediaResponse";
import AttractionNameSection from "../../sections/admin/attractionNameSection/attractionNameSection";

const EditPage = () => {
    const filesToSend = useTypedSelector(state => state.editor);

    const {addNewPlace} = useActions();

    const TryAddNewPlace = () => {
        // console.log(placeInfo);
        const photosToSend: IMediaFileDTO[] = prepareMediaToSend(filesToSend.photos.data),
              videosToSend: IMediaFileDTO[] = prepareMediaToSend(filesToSend.videos.data),
              audiosToSend: IMediaFileDTO[] = prepareMediaToSend(filesToSend.audios.data);

        // console.log(photoUrls);
        // console.log(audioUrls);
        // console.log(videoUrls);
        addNewPlace(photosToSend,audiosToSend,videosToSend,filesToSend);
    }

    const prepareMediaToSend = (arr: IMediaResponse[]): IMediaFileDTO[] => {
        return arr.map(({url,publicId,id}) => {
            return {
                url,
                publicId,
                id,
                uploadTime: new Date(),
            }
        });
    }

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
                    <AttractionNameSection/>
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