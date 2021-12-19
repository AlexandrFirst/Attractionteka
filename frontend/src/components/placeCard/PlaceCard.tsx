import React, {FC, ReactElement} from 'react';
import styles from './placeCard.module.scss';
import {Link} from 'react-router-dom';
import * as util from '../../util'
import {IPlaceResponse} from "../../models/place/IPlaceResponse";
import noPhoto from './img/NoPhoto.png'
import star from './img/rating_full.svg'
import {RouteNames} from "../../routes";

export interface PlaceCardProps {
    place: IPlaceResponse
    width?: number | string
    viewRating?: boolean
}

const PlaceCard:FC<PlaceCardProps> = ({ place, width, viewRating }):ReactElement => {
    const {photos, shortDescription, name} = place
    return (
        <Link to={`${RouteNames.ATTRACTION}/${place.id}`} className={[styles.wrapper, styles.link].join(' ')} style={{ width }}>
            {viewRating &&
                <ul className={styles.rating_wrapper}>
                    <li>
                        <p className={styles.star_img_wrapper}><img className={styles.star_img} src={star} alt="star"/></p>
                    </li>
                    <li><p className={styles.rating}>{util.calcAverage(place.ratings)}</p></li>
                    <li><p className={styles.view_number}>({place.viewNumber})</p></li>
                </ul>}
            <p className={styles.img_wrapper}>
                <img className={styles.img} src={photos[0]?.url || noPhoto} alt={name}/>
            </p>
            <div className={styles.bottom_container}>
                <p className={styles.name}>{name}</p>
                <p className={styles.short_description}>{shortDescription}</p>
            </div>
        </Link>
    );
};

export default PlaceCard;