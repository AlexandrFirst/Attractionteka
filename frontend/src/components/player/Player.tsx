import React, {FC, ReactElement} from 'react';
import styles from './player.module.scss';
import {useAudio} from "../../hooks/useAudio";
import play from './img/play.svg'
import pause from './img/pause.svg'

export interface PlayerProps {
    url: string
}

const Player:FC<PlayerProps> = ({ url }): ReactElement => {
    const [playing, toggle] = useAudio(url);

    return (
        <>
            {/*// @ts-ignore*/}
            <p className={styles.img_wrapper}><img className={styles.img} onClick={toggle} src={playing ? pause : play} alt="play/pause"/></p>
        </>
    );
};

export default Player;