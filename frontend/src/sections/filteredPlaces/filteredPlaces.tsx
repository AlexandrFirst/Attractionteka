import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import styles from './filteredPlaces.module.scss';
import {IPlaceResponse} from "../../models/place/IPlaceResponse";
import defaultAttraction from './img/NoPhoto.png';
import {RouteNames} from "../../routes";

export interface FilteredPlacesProps {
    filteredPlace:  IPlaceResponse;
}

const FilteredPlaces:React.FC<FilteredPlacesProps> = (
    {
        filteredPlace:
            {
                name, listKeyWords,content,shortDescription,photos,videos,audios,id,uploadTime
            }
    }) => {

    return (
            <div className={styles.block}>
                <Link className={styles.link} to={RouteNames.ATTRACTION + `/${id}`}>
                    <div className={styles.header}>
                        <h4>{name}</h4>
                    </div>


                    <div className={styles.img_wrapper}>
                        {photos[0] && photos[0].url ? <img className={styles.img} src={photos[0].url} alt="PHOTO ATTRACTION"/> : <img className={styles.img} src={defaultAttraction} alt="PHOTO ATTRACTION"/>}
                    </div>


                    <div className={styles.shortDesc}>
                        <h5>{shortDescription}</h5>
                    </div>
                </Link>
            </div>
    );
};

export default FilteredPlaces;