import React from 'react';
import styles from './sidebar.module.scss';
import cn from "classnames";

export interface SidebarProps {
    sideList: string[];
    nowIndex: number;
    setNowIndex: Function;
}

const Sidebar:React.FC<SidebarProps> = (
    {
        sideList,
        nowIndex,
        setNowIndex
    }) => {

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.caption}>PERSONAL AREA</h2>
            <ul>
                {sideList.map((item, index) => (
                    <li key={item}>
                        <h4
                            className={cn(styles.listItem, {[styles.listItem_active]: nowIndex === index})}
                            onClick={() => setNowIndex(index)}
                        >{item}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;