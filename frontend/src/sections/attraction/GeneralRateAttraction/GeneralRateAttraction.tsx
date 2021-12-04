import React, {FC, useEffect, useState} from 'react';
import styles from './generalRateAttraction.module.scss';

export interface GeneralRateAttractionProps {
    setRating: Function;
    placeId: number;
    mark: number;
}

const GeneralRateAttraction:FC<GeneralRateAttractionProps> = ({setRating, placeId, mark=0}) => {

    const [val, setVal] = useState(mark); // integer state

    useEffect(() => {
        setVal(mark);
    }, [mark])

    const rateOnClick = (val: number) => {
        setRating(val, placeId);
        setVal(val);
    }

    return (
        <div className={styles.rate}>
            <div className={styles.ratetext}>Rate Attraction</div>
            <div className={styles.ratingarea}>
                <input type="radio" id="star-5" name="rating" value="5" checked={val === 5} onClick={() => rateOnClick(5)}/>
                <label htmlFor="star-5" title="Оценка «5»"/>
                <input type="radio" id="star-4" name="rating" value="4" checked={val === 4} onClick={() => rateOnClick(4)}/>
                <label htmlFor="star-4" title="Оценка «4»"/>
                <input type="radio" id="star-3" name="rating" value="3" checked={val === 3} onClick={() => rateOnClick(3)}/>
                <label htmlFor="star-3" title="Оценка «3»"/>
                <input type="radio" id="star-2" name="rating" value="2" checked={val === 2} onClick={() => rateOnClick(2)}/>
                <label htmlFor="star-2" title="Оценка «2»"/>
                <input type="radio" id="star-1" name="rating" value="1" checked={val === 1} onClick={() => rateOnClick(1)}/>
                <label htmlFor="star-1" title="Оценка «1»"/>
            </div>
        </div>
    );
};

export default GeneralRateAttraction;