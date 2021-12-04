import React, {ReactElement} from "react";
import ratingHalf from "../sections/attraction/totalRatingHeaderAttraction/img/rating_half.svg";
import ratingFull from "../sections/attraction/totalRatingHeaderAttraction/img/rating_full.svg";
import ratingZero from "../sections/attraction/totalRatingHeaderAttraction/img/rating_zero.svg";
import styles from "../sections/attraction/totalRatingHeaderAttraction/totalRatingHeaderAttraction.module.scss";


export const renderRatingStars = (possibleMarks: any[], averageRating: number):ReactElement[] => {
    return possibleMarks.map((value, index) => {
        let renderStar: string;
        if(averageRating > index && averageRating < index + 1) {
            renderStar = ratingHalf;
        }
        else if(averageRating > index) {
            renderStar = ratingFull
        } else {
            renderStar = ratingZero;
        }
        return (
            <img key={value + index} className={styles.star} src={renderStar} alt="star"/>
    )
    })
}