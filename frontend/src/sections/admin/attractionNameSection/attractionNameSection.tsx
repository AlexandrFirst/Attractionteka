import React from 'react';
import TextAreaWithVisibleError from "../../../components/textAreaWithVisibleError/textAreaWithVisibleError";
import {useSetDataUseEffect} from '../../../hooks/useSetDataUseEffect';

import styles from './attractionNameSection.module.scss';
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export interface AttractionNameSectionProps {
    name?: string;
}

const AttractionNameSection:React.FC<AttractionNameSectionProps> = ({name}) => {

    const {setAttractionName} = useActions();
    const [attractionNameData, setAttractionNameData] = React.useState('');
    const [isVisibleError, setIsVisibleError] = React.useState(false);
    const {attractionName} = useTypedSelector(state => state.editor);

    useSetDataUseEffect(name, setAttractionNameData);

    React.useEffect(() => {
        console.log("attractionNameData", attractionNameData);
        console.log("attractionName", attractionName);
        setAttractionName(attractionNameData);

    }, [attractionNameData, attractionName])

    const onBlur = () => {
        if(attractionNameData === '') {
            setIsVisibleError(true);
            return;
        }
        // setAttractionName(attractionNameData);
        // console.log("attractionName", attractionName);
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