import React, {FC, ReactElement} from 'react';
import styles from './sectionHeader.module.scss';
import backArrow from './img/arrow right.svg';

const SectionHeader:FC = ({children}):ReactElement => {
    return (
        <ul className={styles.wrapper}>
            <li><p className={styles.title}>{children}</p></li>

            {/*<li>*/}
            {/*    <p className={styles.view_all}>View all</p>*/}
            {/*    <p><img src={backArrow} alt="back"/></p>*/}
            {/*</li>*/}
        </ul>
    );
};

export default SectionHeader;