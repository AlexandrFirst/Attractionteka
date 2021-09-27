import React from 'react';
import {MarginerProps} from "./marginer";
import styles from "./marginer.module.scss";

const HorizontalMargin:React.FC<MarginerProps> = ({margin}) => {
    return (
        <span style={{width: margin, display: "flex"}}/>
    );
};


export default HorizontalMargin;