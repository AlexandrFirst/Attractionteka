import React, { Component } from 'react'
import './search.css'
import iconsearch from './img/iconsearch.png'
import useInput from "../../hooks/useInput";
import {useActions} from "../../hooks/useActions";
import {PlaceFilterDto} from "../../models/place/PlaceFilterDto";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../../routes";

export interface SearchProps {
    flag_search: boolean;
}

const Search:React.FC<SearchProps> = (props) => {
    const searchValue = useInput('');
    const {searchPlaces} = useActions();
    const history = useHistory()

    const searchAttractions = () => {
        const filteredPlace: PlaceFilterDto = {
            placeName: searchValue.value,
        }
        searchPlaces(filteredPlace);
    }

    const goToFilterPage = () => {
        history.push(RouteNames.FILTERED_PLACES)
    }

    if (props.flag_search) {
        return (
            <div className="search">
                <input {...searchValue} type="text" className="searchTerm" placeholder="Search" onFocus={goToFilterPage}/>
                <button
                    onClick={searchAttractions}
                    type="submit"
                    className="searchButton">
                    <img src={iconsearch} alt="error" className="header-search"/>
                </button>
            </div>
        )
    } else {
        return (
            <div className="search">
            </div>
        )
    }
}

export default Search;