import React from 'react';

import styles from './keywordsSection.module.scss';
export interface KeywordsSectionProps {

}

const KeywordsSection:React.FC<KeywordsSectionProps> = () => {
    const [keywords, setKeywords] = React.useState('');

    return (
        <div className={styles.wrapper}>
            <textarea
                value={keywords}
                onChange={(e ) => setKeywords(e.target.value)}
                className={styles.keywords}
            />
        </div>
    );
};

export default KeywordsSection;