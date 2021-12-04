import React from 'react';
import {Link} from 'react-router-dom';
import './HeaderAttraction.css'
import pencil from './img/Pencil.svg';
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export interface HeaderAttractionProps {
    name: string;
    setVisibleQrCode: Function;
    isVisibleQrCode: boolean
}

const HeaderAttraction:React.FC<HeaderAttractionProps> = (props) => {
    const {user} = useTypedSelector(state => state.auth);

    return (
        <div className="header_attraction_wrapper">
            <h5 className="block-header">{props.name}</h5>
            {<Link to={'/edit'}>
                <img src={pencil} alt="edit attraction" className="attraction_edit"/>
            </Link>}
        </div>
    );
};


export default HeaderAttraction;