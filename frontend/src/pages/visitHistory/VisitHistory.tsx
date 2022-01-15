import React, { FC, ReactElement, useEffect, useState } from 'react'
import styles from './visitHistory.module.scss'
import { UserService } from '../../services/user-service'
import { IVisitHistory } from '../../models/user/IVisitHistory'
import PlaceCard from '../../components/placeCard/PlaceCard'

const VisitHistory: FC = (): ReactElement => {
  const [visitHistory, setVisitHistory] = useState<IVisitHistory[]>([])

  useEffect(() => {
    Promise.resolve(UserService.getHistory()).then((history) => setVisitHistory(history.data))
  }, [])

  useEffect(() => {
    console.log('visitHistory', visitHistory)
  }, [visitHistory])

  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {visitHistory.map(({ visitedPlace, visitTime }) => (
          <li key={visitTime.toString()}>
            <PlaceCard width={400} viewRating place={visitedPlace} />
            <p className={styles.visitTime}>Date of visit: {visitTime.toString().substring(0, 10)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default VisitHistory
