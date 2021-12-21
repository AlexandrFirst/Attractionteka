import React, {FC, useEffect, useState} from 'react';
import styles from './totalRatingHeaderAttraction.module.scss';
import starIcon from './img/star.svg';
import cn from "classnames";
import * as util from "../../../util";
import {IRating} from "../../../models/place/IRating";

export interface TotalRatingHeaderAttractionProps {
    viewNumber: number;
    totalMarks: number;
    averageRating: number;
}

const TotalRatingHeaderAttraction:FC<TotalRatingHeaderAttractionProps> = (
    {
        totalMarks,
        viewNumber,
        averageRating,

    }) => {




    const possibleRatings = [1,2,3,4,5]
    return (
        <div className={styles.wrapper}>
            <img src={starIcon} alt="star-rating"/>
            <p className={styles.text}>{averageRating.toFixed(1)}</p>
            <div className={styles.star_wrapper}>
                {util.renderRatingStars(possibleRatings, averageRating)}
            </div>
            <p className={styles.text}>({totalMarks})</p>
            <p className={cn(styles.text, styles.reviewNumber)}>{viewNumber} Reviews</p>
        </div>
    );
};

export default TotalRatingHeaderAttraction;