import React from 'react';
import './MainPhotoAttraction.css'
import mainphoto from './img/mainphoto.png';

const MainPhotoAttracrtion = (props) => {
    return (
        <div className="block-main-photo">
            <img src={props.photo} alt="" className="main-photo" />
            {/*<h1>ТУТ МОГЛО БЫТЬ ВАШЕ ФОТО</h1>*/}
        </div>
    );
};


export default MainPhotoAttracrtion;