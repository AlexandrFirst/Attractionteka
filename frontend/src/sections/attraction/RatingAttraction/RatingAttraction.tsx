import React, { useEffect, useState } from 'react'
import './RatingAttraction.scss'
import iconrating from './img/iconrating.png'
import * as util from '../../../util'
import { IRating } from '../../../models/place/IRating'
import Button from '../../../components/button/button'
import { LocalStorageKey } from '../../../types/LocalStorageKey'
import cn from 'classnames'

export interface RatingAttractionProps {
  averageRating: number
  ratings: IRating[]
  setIsLeaveComment: Function
  isLeaveComment: boolean
}

const RatingAttraction: React.FC<RatingAttractionProps> = ({ averageRating, ratings, setIsLeaveComment, isLeaveComment }) => {
  const possibleMarks = ['1', '2', '3', '4', '5']
  // const len = ratings.length;
  const isAuth = !!localStorage.getItem(LocalStorageKey.token)
  const buttonMessage = isAuth ? (!isLeaveComment ? 'Leave feedback' : 'Hide comment section') : 'Login first'

  const [filledRatings, setFilledRatings] = useState<number[]>([])
  const [ratingsTotalCount, setRatingsTotalCount] = useState(0)

  useEffect(() => {
    calcRanting(ratings)
  }, [ratings])

  useEffect(() => {
    console.log(filledRatings)
    console.log(ratingsTotalCount)
  }, [filledRatings, ratingsTotalCount])

  const calcRanting = (ratings: IRating[]) => {
    const copyFilledRating = [...filledRatings]
    copyFilledRating[0] = ratings.filter(({ rating }) => rating === 5).length
    copyFilledRating[1] = ratings.filter(({ rating }) => rating === 4).length
    copyFilledRating[2] = ratings.filter(({ rating }) => rating === 3).length
    copyFilledRating[3] = ratings.filter(({ rating }) => rating === 2).length
    copyFilledRating[4] = ratings.filter(({ rating }) => rating === 1).length

    setRatingsTotalCount(
      copyFilledRating.reduce((sum, elem) => {
        return sum + elem
      }, 0)
    )
    setFilledRatings(copyFilledRating)
  }

  return (
    <div className='block-rating'>
      <div className='audio-header'>
        <img src={iconrating} alt='' className='icon-information-header' />
        <div className='text-information-header'>Rating</div>
      </div>
      <div className='rating'>
        <div className='total-rating_wrapper'>
          <p className='total-rating_title'>
            <span className='total-rating_bold'>{averageRating.toFixed(1)}</span> out of <span className='total-rating_bold'>5</span>
          </p>
          <div className='stars_wrapper'>{util.renderRatingStars(['1', '2', '3', '4', '5'], averageRating)}</div>
          <div className='rating-based-on-total'>
            <p>
              Based on {ratings.length} {ratings.length > 1 ? 'ratings' : 'rating'}
            </p>
          </div>
        </div>
        <div className='rating-based-on-reviews'>
          <ul className='rating_stars_list'>
            <li>{util.renderRatingStars(possibleMarks, 5)}</li>
            <li>{util.renderRatingStars(possibleMarks, 4)}</li>
            <li>{util.renderRatingStars(possibleMarks, 3)}</li>
            <li>{util.renderRatingStars(possibleMarks, 2)}</li>
            <li>{util.renderRatingStars(possibleMarks, 1)}</li>
          </ul>
          <ul className='rating_lines_list'>
            {filledRatings.map((rating, index) => {
              const width = (rating / ratingsTotalCount) * 100 + '%'
              return (
                <li key={index} className='line_wrapper'>
                  <span className='bg_line' />
                  <span style={{ width }} className='fg_line' />
                </li>
              )
            })}
          </ul>
          <ul className='rating_marks_list'>
            {filledRatings.map((rating, index) => (
              <li className='rating_marks_item'>
                <p>{rating}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button onClick={() => setIsLeaveComment(!isLeaveComment)} disabled={!isAuth} classes={cn('btn', { btn_disabled: !isAuth })}>
        {buttonMessage}
      </Button>
    </div>
  )
}

export default RatingAttraction
