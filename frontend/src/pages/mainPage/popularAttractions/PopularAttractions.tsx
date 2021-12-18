import React, {FC, ReactElement} from 'react';
import styles from './popularAttractions.module.scss';
import SectionHeader from "../sectionHeader/SectionHeader";
import Main from "./main/Main";
import {IPlaceResponse} from "../../../models/place/IPlaceResponse";

export interface PopularAttractionsProps {
    popularPlaces: IPlaceResponse[]
}

const PopularAttractions:FC<PopularAttractionsProps> = ({popularPlaces}):ReactElement => {
    return (
        <section className={styles.wrapper}>
            <SectionHeader>Popular attractions</SectionHeader>
            <Main popularPlaces={popularPlaces}/>
        </section>
    );
};

export default PopularAttractions;