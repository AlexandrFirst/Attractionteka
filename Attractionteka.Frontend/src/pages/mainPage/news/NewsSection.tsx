import React, {FC, ReactElement, useEffect, useState} from 'react';
import styles from './newsSection.module.scss';
import SectionHeader from "../sectionHeader/SectionHeader";
import {PlaceService} from "../../../services/place-service";
import {IPlaceResponse} from "../../../models/place/IPlaceResponse";
import PlaceCard from "../../../components/placeCard/PlaceCard";

export interface NewsSectionProps {
    newPlaces: IPlaceResponse[]
}

const NewsSection:FC<NewsSectionProps> = ({}):ReactElement => {

    const [newPlaces, setNewPlaces] = useState<IPlaceResponse[]>([])

    useEffect(() => {
        Promise.resolve(PlaceService.getPlaces({ sortByDateTime: true }))
            .then(places => setNewPlaces(places.data))
    }, [])

    return (
        <section className={styles.wrapper}>
            <SectionHeader>News</SectionHeader>
            <ul className={styles.news_list_wrapper}>
                {newPlaces.map(place =>
                    <li key={place.id}>
                        <PlaceCard viewRating place={place} />
                    </li>
                )}
            </ul>

            <div className={styles.btn_wrapper}>
                <button className={styles.btn}>
                    View all
                </button>
            </div>
        </section>
    );
};

export default NewsSection;