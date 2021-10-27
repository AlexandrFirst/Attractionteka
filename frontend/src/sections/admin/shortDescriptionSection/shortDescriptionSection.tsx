import React from 'react';
import styles from "./shortDescriptionSection.module.scss";
import cn from "classnames";
import ErrorMessage from "../../../components/errorMessage/errorMessage";
import {useActions} from "../../../hooks/useActions";

const ShortDescriptionSection = () => {
    const [shortDescriptionData, setShortDescriptionData] = React.useState<string>('');
    const [isVisibleError, setIsVisibleError] = React.useState(false);
    const {setShortDescription} = useActions();

    const saveShortDescToRedux = () => {
        if(shortDescriptionData === '') {
            setIsVisibleError(true);
            return;
        }
        setShortDescription(shortDescriptionData);
        setIsVisibleError(false);
    }

    return (
        <div className={styles.wrapper}>
            {/*<h5>Short description</h5>*/}
            <textarea
                value={shortDescriptionData}
                onChange={(e ) => setShortDescriptionData(e.target.value)}
                placeholder="Short description..."
                className={cn(styles.short_desc, {[styles.short_desc_wrong]: isVisibleError})}
                onBlur={saveShortDescToRedux}
            />
            <ErrorMessage
                isVisible={isVisibleError}
                classNames={styles.error}
            >Incorrect short description. It has to be filled</ErrorMessage>
        </div>
    );
};

export default ShortDescriptionSection;