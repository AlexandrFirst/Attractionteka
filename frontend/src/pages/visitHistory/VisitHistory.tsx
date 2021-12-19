import React, {FC, ReactElement, useEffect, useState} from 'react';
import {UserService} from "../../services/user-service";
import {IVisitHistory} from "../../models/user/IVisitHistory";
import PlaceCard from "../../components/placeCard/PlaceCard";

const VisitHistory:FC = ():ReactElement => {

    const [visitHistory, setVisitHistory] = useState<IVisitHistory[]>([])

    useEffect(() => {
        Promise.resolve(UserService.getHistory())
            .then((history) => setVisitHistory(history.data))
    }, [])

    return (
        <section>
            <ul>
                {visitHistory.map(history =>
                    <li>
                        <PlaceCard width={400} viewRating place={history.visitedPlace} />
                        <p>{history.visitTime.toString().substring(0, 10)}</p>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default VisitHistory;