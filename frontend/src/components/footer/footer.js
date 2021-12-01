import React, { Component } from 'react'
import './footer.css'
import ReactJkMusicPlayer from "react-jinke-music-player";
import 'react-jinke-music-player/assets/index.css'
import {useSelector} from "react-redux";



const Footer = (props) => {
    const {data: {audios}} = useSelector(state => state.place)
    const [audioPlayList, setAudioPlayList] = React.useState(0);

    // console.log(videos);

    React.useEffect(() => {
        makePlayList();
        // console.log(11111, audioPlayList);
    }, [audios])

    const makePlayList = () => {
        if(audios) {
            const playList = audios.map(audio => {
                return {
                    name: '',
                    musicSrc: audio.url,
                    cover: '',
                    key: audio.url
                }
            })
            setAudioPlayList(playList);
        }
    }

    console.log("audioPlayList....Foooter", audioPlayList);
    return (
        <footer className="footer">
            <div className="footer-audio">
                {/*<ReactJkMusicPlayer*/}
                {/*    // getAudioInstance={(instance) => {*/}
                {/*    //    props.setCurrentAudioPlayerInstance(instance)*/}
                {/*    // }}*/}
                {/*    audioLists={audioPlayList}*/}
                {/*    autoPlay={false}*/}
                {/*    playIndex={props.curAudio}*/}
                {/*    once*/}
                {/*/>*/}
            </div>
            {/*<ReactJkMusicPlayer*/}
            {/*    // getAudioInstance={(instance) => {*/}
            {/*    //    props.setCurrentAudioPlayerInstance(instance)*/}
            {/*    // }}*/}
            {/*    audioLists={audioPlayList}*/}
            {/*    autoPlay={false}*/}
            {/*    playIndex={props.curAudio}*/}
            {/*    once*/}
            {/*/>*/}
        </footer>
    )
}

export default Footer;