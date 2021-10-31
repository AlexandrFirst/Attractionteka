import React from 'react';
import {Link} from 'react-router-dom';

import './header.css'
import logo from '../../img/Attractionteka.png';
import iconmenu from './img/iconmenu.png'
import iconprofile from './img/iconprofile.png'
import header from './img/header.png'
import Search from '../search/search.js'
import {RouteNames} from "../../routes";


const Header = (props) => {
return (
        <header className="header">
            <img src={header} alt="Logo" className="header-background"/>
            <Link to={RouteNames.MAIN} className="link">
                <img src={logo} alt="Logo" className="header-logo"/>
            </Link>
            <Search flag_search={props.flag_search}/>
            <div className="icon-profile">
                <a href="https://www.youtube.com"><img src={iconprofile} alt="error"/></a>
            </div>
            <div className="icon-menu">
                <a href="https://www.youtube.com"><img src={iconmenu} alt="error"/></a>
            </div>

        </header>
    );
};

export default Header;