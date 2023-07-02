import React from 'react';
import {Link} from "react-router-dom";

import styles from "./mutedLink.module.scss";
import cn from "classnames";

export interface LinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>{
    to:string;
    classes?: string;
}

const MutedLink:React.FC<LinkProps> = ({to, children, classes}) => {
    return (
        <Link
            to={to}
            className={cn(styles.mutedLink, classes)}
        >
            {children}
        </Link>
    );
};

export default MutedLink;