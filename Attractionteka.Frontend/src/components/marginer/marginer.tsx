import React from 'react';
import HorizontalMargin from "./HorizontalMargin";
import VerticalMargin from "./VerticalMargin";

export interface MarginerProps {
    direction?: "horizontal" | "vertical";
    margin: string;
}

const Marginer:React.FC<MarginerProps> = ({direction="horizontal", margin}, props) => {

    if (direction === "horizontal") return <HorizontalMargin margin={margin} {...props} />;
    else {
        return <VerticalMargin margin={margin} {...props} />;
    }
}

export default Marginer;