import React from 'react';
import Header from "../../components/header/header";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import FilteredPlaces from "../../sections/filteredPlaces/filteredPlaces";
import styles from './filteredPlacesPage.module.scss';
import Container from "../../components/container/container";

const FilteredPlacesPage = () => {
    const {filteredPlaces} = useTypedSelector(state => state.place);

    return (
        <>
            <Header flag_search/>
            <div className={styles.wrapper}>
                {filteredPlaces.length === 0 ? <h1>NO SEARCH NAME AVAILABLE</h1>
                : filteredPlaces.map(place => <FilteredPlaces key={place.id} filteredPlace={place}/>)}
            </div>
        </>
    );
};

export default FilteredPlacesPage;