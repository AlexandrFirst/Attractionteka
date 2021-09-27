import React from 'react';
import {MarginerProps} from "./marginer";

import styles from "./marginer.module.scss";


const VerticalMargin:React.FC<MarginerProps> = ({margin}) => {
    return (
        <span style={{height: margin, display:"flex"}}/>
    );
};

export default VerticalMargin;