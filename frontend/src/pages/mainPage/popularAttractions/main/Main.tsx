import React, {FC, ReactElement, useEffect, useState} from 'react';
import styles from './main.module.scss';
import {IPlaceResponse} from "../../../../models/place/IPlaceResponse";
import {PlaceService} from "../../../../services/place-service";
import PlaceCard from "../../../../components/placeCard/PlaceCard";

export interface MainProps {
    popularPlaces: IPlaceResponse[]

}

const Main:FC<MainProps> = ({}):ReactElement => {
    const [popularPlaces, setPopularPlaces] = useState<IPlaceResponse[]>([])

    useEffect(() => {
            Promise.resolve(PlaceService.getPlaces({ sortByRating: true }))
                .then((places) => {
                    console.log("PLACES",places)
                    setPopularPlaces(places.data.reverse())
                })
    }, [])

    return (
        <ul className={styles.wrapper}>
            {popularPlaces.map(place =>
                <li key={place.id} className={styles.card} >
                    <PlaceCard width={220} viewRating place={place} />
                </li>
            )}
        </ul>
    );
};

export default Main;