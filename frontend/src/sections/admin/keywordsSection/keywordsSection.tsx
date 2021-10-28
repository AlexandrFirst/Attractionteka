import React from 'react';

import styles from './keywordsSection.module.scss';
import {useActions} from "../../../hooks/useActions";
import ErrorMessage from "../../../components/errorMessage/errorMessage";
import TextAreaWithVisibleError from "../../../components/textAreaWithVisibleError/textAreaWithVisibleError";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export interface KeywordsSectionProps {

}

const KeywordsSection:React.FC<KeywordsSectionProps> = () => {
    const [keywordsData, setKeywordsData] = React.useState<string>('');
    const [isVisibleError, setIsVisibleError] = React.useState(false);
    const {setKeywords} = useActions();
    const {keywords} = useTypedSelector(state => state.editor);

    React.useEffect(()=>{
        console.log(keywords);
    },[keywords])

    const splitKeywords = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if(keywordsData === '') {
            setIsVisibleError(false);
            return;
        }
        try {
            // setKeywordsData(keywordsData.trim());
            const keywordsArray = keywordsData.trim().split(' ');
            for(const word of keywordsArray) {
                if(!word.startsWith('#')) {
                    setIsVisibleError(true);
                    return;
                }
                if(word.endsWith(',')) {
                    word.replace(',', '');
                }
            }
            setKeywords(keywordsArray);
            setIsVisibleError(false);
        } catch (e) {
            setIsVisibleError(true);
        } finally {
            // console.log("keywordsData....", keywordsData);
        }

    }

    return (
        <div className={styles.wrapper}>
            {/*<h5>Keywords</h5>*/}
           <TextAreaWithVisibleError
               valueToWrite={keywordsData}
               setValueToWrite={setKeywordsData}
               conditionOfError={isVisibleError}
               placeholderData={"Keywords..."}
               onBlurFunc={splitKeywords}
               isErrorToShow
               errorMessage={"Incorrect keywords. Try to add \"#\" before all words and set a space between them"}
           />
        </div>
    );
};

export default KeywordsSection;