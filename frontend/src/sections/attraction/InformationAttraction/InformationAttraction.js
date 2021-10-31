import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './InformationAttraction.css'
import iconinformation from './img/iconinformation.png';

const InformationAttraction = (props) => {
    return (
        <div className="block-information">
            <div className="information-header">
                <img src={iconinformation} alt="" className="icon-information-header" />
                <div className="text-information-header">Information</div>
                </div>
            <div className="information-main">{ReactHtmlParser(props.content)}</div>
        </div>
    );
};

export default InformationAttraction;