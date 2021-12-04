import React, {useEffect, useState} from 'react';
import './attractionPage.css'
import AttractionBox from '../../components/attractionBox/attractionBox'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import {useActions} from "../../hooks/useActions";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Spinner from "../../components/spinner/spinner";
import {UserService} from "../../services/user-service";

export interface AttractionPageProps {

}

const AttractionPage:React.FC<AttractionPageProps> = () => {

    const {data, error, isLoading} = useTypedSelector(state => state.place);
    const {data: comments} = useTypedSelector(state => state.comment);
    const {getPlace, getComments} = useActions();
    const params = useParams<{ id: string }>();

    const [mark, setMark] = useState(0);

    //
    useEffect(() => {
        const id = Number(params.id);
        getPlace(id);
        getComments(id);
        UserService.getUserMarkOfPlace(id)
            .then(res => setMark(res.data.mark))
    }, [])

    React.useEffect(() => {
        console.log("COMMENTS....", comments);
    }, [comments])

    if(isLoading) {
        return <Spinner classes="spinner"/>
    }
    if (error) {
       return <h1>{error}</h1>
    }

    return (
        <div className="boxContainer">
            <Header/>
            <AttractionBox comments={comments} mark={mark} placeData={data}/>
            <Footer/>
        </div>
    );
};

export default AttractionPage;