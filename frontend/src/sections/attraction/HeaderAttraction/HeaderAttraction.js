import React from 'react';
import './HeaderAttraction.css'

const HeaderAttraction = (props) => {
    return (
        <div className="block-header">{props.name}</div>
    );
};


export default HeaderAttraction;