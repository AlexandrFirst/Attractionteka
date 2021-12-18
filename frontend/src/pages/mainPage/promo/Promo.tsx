import React, {FC} from 'react';
import styles from './promo.module.scss';
import backGroundImage from './img/promo.png';
import Container from "../../../components/container/container";

export interface PromoProps {

}

const Promo:FC<PromoProps> = () => {
    return (
        <section className={styles.wrapper}>
            <p className={styles.img_wrapper}>
                <img className={styles.img} src={backGroundImage} alt="promo"/>
            </p>
            <div className={styles.intyre_text_wrapper}>
                <h1 className={styles.title}>Attractionteka</h1>
                <h2 className={styles.subtitle}>Kharkiv is a cozy home for your soul</h2>
                <p className={styles.slogan}>Find interesting sights</p>
            </div>
        </section>
    );
};

export default Promo;