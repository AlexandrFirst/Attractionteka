import React, { Component } from 'react'
import './search.css'
import iconsearch from './img/iconsearch.png'

export default class Search extends Component {

    render() {
        if (this.props.flag_search) {
            return (
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="Search" />
                    <button type="submit" class="searchButton"><img src={iconsearch} alt="error" className="header-search"/>
                    </button>
                </div>
            )
        } else {
            return (
                <div class="search">
                </div>
            )
        }
    }
}