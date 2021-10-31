import React from 'react';
import './KeyWordsAttraction.css'

const KeyWordsAttraction = (props) => {
    const renderItems = props.keywords?.map(kw => <span className="item-key-word" key={kw}>{kw} </span>)
    return (
        <div className="block-key-words">
            {renderItems}
        </div>
    );
};


export default KeyWordsAttraction;