import React from 'react';
import {Link} from 'react-router-dom';

import './header.css'
import logo from '../../img/Attractionteka.png';
import iconmenu from './img/iconmenu.png'
import iconprofile from './img/iconprofile.png'
import header from './img/header.png'
import Search from '../search/search.tsx'
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
                <Link to={RouteNames.USER}>
                    <img src={iconprofile} alt="error"/>
                </Link>
            </div>
            <div className="icon-menu">
                <Link to={RouteNames.USER_EDIT}>
                    <img src={iconmenu} alt="error"/>
                </Link>
            </div>

        </header>
    );
};

export default Header;