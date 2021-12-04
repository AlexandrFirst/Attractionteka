import React from 'react';
import styles from './pgError.module.scss';

const PgError: React.FC = () => {
    return (
        <main className={styles.wrapper}>
            <h1 className={styles.mainMessage}>SOMETHING WENT WRONG!</h1>
            <h2 className={styles.subMessage}>may you need to autorize</h2>
        </main>
    );
};

export default PgError;