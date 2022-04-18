import React from 'react';

import styles from './BcgElements.module.css'

const BcgElements = () => {

    return (
        <div className={styles.container}>
            <div className = {styles.plate}></div>
            <div className = {styles.cup}>
                <div className= {styles.cup__top}>
                    <div className={styles.cup__topPar}>
                        <span className={styles.cup__topParSpan1}></span>
                        <span className={styles.cup__topParSpan3}></span>
                        <span className={styles.cup__topParSpan16}></span>
                        <span className={styles.cup__topParSpan5}></span>
                        <span className={styles.cup__topParSpan13}></span>
                        <span className={styles.cup__topParSpan20}></span>
                        <span className={styles.cup__topParSpan6}></span>
                        <span className={styles.cup__topParSpan7}></span>
                        <span className={styles.cup__topParSpan10}></span>
                        <span className={styles.cup__topParSpan8}></span>
                        <span className={styles.cup__topParSpan17}></span>
                        <span className={styles.cup__topParSpan11}></span>
                        <span className={styles.cup__topParSpan12}></span>
                        <span className={styles.cup__topParSpan14}></span>
                        <span className={styles.cup__topParSpan2}></span>
                        <span className={styles.cup__topParSpan9}></span>
                        <span className={styles.cup__topParSpan15}></span>
                        <span className={styles.cup__topParSpan4}></span>
                        <span className={styles.cup__topParSpan19}></span>
                    </div>
                    <div className= {styles.cup__topCircle}>
                        <div className= {styles.cup__topCircleLiquid}></div>
                    </div>
                </div>
                <div className= {styles.cup__handle}></div>
            </div>
        </div>
    );
}

export default BcgElements