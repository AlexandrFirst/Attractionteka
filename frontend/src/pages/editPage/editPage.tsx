import React from 'react';
import cn from "classnames";
import EditorSection from "../../sections/admin/editorSection/editorSection";
import AudioAdminSection from "../../sections/admin/audioAdminSection/audioAdminSection";
import VideoAdminSection from "../../sections/admin/videoAdminSection/videoAdminSection";
import {Link, useHistory} from "react-router-dom";
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
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import InfoMessage from "../../components/infoMessage/infoMessage";
import {RouteNames} from "../../routes";
import Modal from "../../components/modal/modal";
import ModalDeleteSection from "../../sections/admin/modalDeleteSection/modalDeleteSection";
import {IMediaData} from "../../store/reducers/editor/types";

const EditPage = () => {
    const {data: {
        name, listKeyWords, content, shortDescription,
        photos, videos, audios, id
    }} = useTypedSelector(state => state.place);

    const filesToSend = useTypedSelector(state => state.editor);
    const [firstTime, setFirstTime] = React.useState(true);
    const [isVisibleMessage, setIsVisibleMessage] = React.useState(false);
    const [isActiveDeleteModal, setIsActiveDeleteModal] = React.useState(false);
    const {addNewPlace, updatePlace, deletePlace} = useActions();
    const history = useHistory();

    React.useEffect(() => {
        setFirstTime(false);
        setIsVisibleMessage(false);
    }, [])

    React.useEffect(() => {
        if(!filesToSend.loadingAddNewPlace && filesToSend.errorAddNewPlace === '' && !firstTime) {
            displayMessage(5000);
            setFirstTime(false);
        }
    }, [filesToSend.loadingAddNewPlace, filesToSend.errorAddNewPlace])

    const TryDoSomethingWithPlace = (isUpdating: boolean) => {
        // console.log("filesToSend.photos.data", filesToSend.videos.data)
        // console.log("filesToSend.photos.data", filesToSend.audios.data)

        let photosToSend: IMediaFileDTO[] = [],
            videosToSend: IMediaFileDTO[] = [],
            audiosToSend: IMediaFileDTO[] = []
        if(filesToSend.photos.data) {
            photosToSend = prepareMediaToSend(filesToSend.photos.data);
            // console.log("filesToSend.photos.data", filesToSend.photos.data)
            // console.log("photosToSend", photosToSend)
        }
        if(filesToSend.videos.data) {
            videosToSend = prepareMediaToSend(filesToSend.videos.data);
        }
        if(filesToSend.audios.data) {
            audiosToSend = prepareMediaToSend(filesToSend.audios.data);
        }
        // console.log("content............", filesToSend.editorContent);
        if(!isUpdating) {
            // return console.log("ТО, ЧТО Я ОТПРАВЛЯЮ.......", filesToSend);
            addNewPlace(photosToSend, videosToSend, audiosToSend, filesToSend);
            // history.push(RouteNames.MAIN);
        } else {
            // const rg = /^[a-z]{3}[=]{1}$/;
            photosToSend = prepareMediaToSend(photos);
            console.log("ТО, ЧТО Я ОТПРАВЛЯЮ.......", photosToSend, videosToSend, audiosToSend);
            console.log("ТО, ЧТО Я ОТПРАВЛЯЮ.......", filesToSend);
            updatePlace(id, photosToSend, videosToSend, audiosToSend, filesToSend);
        }
    }

    const deleteExistingPlace = () => {
        if(id) {
            deletePlace(id);
            // history.push(RouteNames.MAIN);
        }
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

    const displayMessage = (milliseconds: number) => {
        setIsVisibleMessage(true);
        setTimeout(() => setIsVisibleMessage(false), milliseconds);
    }

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <Container>
                    {isVisibleMessage &&
                        <InfoMessage>The attraction information has been successfully updated!</InfoMessage>
                    }
                    <div className={styles.working_place}>
                        <Link to={"/"} className={styles.back_wrapper}>
                            <img src={arrowBack} alt="back"/>
                            <h5 className={styles.back_title}>Home - Attrations</h5>
                        </Link>
                        <div className={styles.save_delete_top}>
                            <Button
                                classes={cn(styles.btn_top, styles.save_top)}
                                onClick={() => TryDoSomethingWithPlace(id !== undefined)}
                            >Save</Button>
                            <Button
                                classes={cn(styles.btn_top, styles.delete_top)}
                                onClick={() => setIsActiveDeleteModal(true)}
                            >Delete</Button>
                        </div>
                        <AttractionNameSection name={name} />
                        <EditorSection initialContent={content} />
                        <ShortDescriptionSection shortDesc={shortDescription} />
                        <KeywordsSection initialKeywords={listKeyWords} />
                        <AudioAdminSection initialAudio={audios} />
                        <VideoAdminSection initialVideo={videos} />
                        <div
                            className={styles.btn_container}
                            onClick={() => TryDoSomethingWithPlace(id !== undefined)}
                        >
                            <Button classes={styles.save_btn}>Save</Button>
                        </div>
                    </div>
                </Container>
            </div>
            <Modal active={isActiveDeleteModal} setActive={setIsActiveDeleteModal}>
                <ModalDeleteSection
                    closeFunc={() => setIsActiveDeleteModal(false)}
                    deleteAttractionFunc={deleteExistingPlace}
                    id={id}
                />
            </Modal>
            <Footer/>
        </>
    );
};

export default EditPage;