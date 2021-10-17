import React from 'react';

import { Link } from 'react-router-dom';
const Main = () => {
    return (
        <ul>
            <li><Link to={"/login"}>To Login page</Link></li>
            <br/>
            <li><Link to={"/edit"}>To EDIT page</Link></li>

        </ul>
    );
};

export default Main;