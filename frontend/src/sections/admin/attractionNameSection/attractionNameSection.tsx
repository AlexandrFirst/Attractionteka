import React from 'react';
import TextAreaWithVisibleError from "../../../components/textAreaWithVisibleError/textAreaWithVisibleError";

import styles from './attractionNameSection.module.scss';
import {useActions} from "../../../hooks/useActions";

const AttractionNameSection = () => {

    const {setAttractionName} = useActions();
    const [attractionNameData, setAttractionNameData] = React.useState('');
    const [isVisibleError, setIsVisibleError] = React.useState(false);

    const onBlur = () => {
        if(attractionNameData === '') {
            setIsVisibleError(true);
            return;
        }
        setAttractionName(attractionNameData);
        setIsVisibleError(false);
    }

    return (
        <div className={styles.wrapper}>
            <TextAreaWithVisibleError
                valueToWrite={attractionNameData}
                setValueToWrite={setAttractionNameData}
                onBlurFunc={onBlur}
                isErrorToShow
                conditionOfError={isVisibleError}
                errorMessage={"Incorrect name of attraction. It has to be filled"}
                placeholderData={"Name of attraction..."}
                classes={styles.attraction_name}
            />
        </div>
    );
};

export default AttractionNameSection;