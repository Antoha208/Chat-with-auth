import React, { useState, useEffect } from 'react'


import styles from './BcgElements.module.css'
import { getTime } from './getTime.js'

const BcgElements = () => {
    const [date, setDate] = useState(getTime())
    useEffect( () => {
      const time = setInterval(()=>{
        setDate(getTime())
      }, 60000)
      return () => {
        clearInterval(time)
      }
    }, [])

    return (
        <div className = {styles.wrapper}>
            <div className = {styles.clockContainer}>
                <div className = {styles.clock}>
                    <div className = {styles.clock__inner}>
                        <div className = {styles.datetime}>
                            <div className = {styles.date}>
                                <span className = {styles.dayName}>
                                    {date.weekday + ','}
                                </span>
                                <span className = {styles.month}>
                                    {date.month}
                                </span>
                                <span className = {styles.dayNum}>
                                    {date.day + ','}
                                </span>
                                <span className = {styles.year}>
                                    {date.year}
                                </span>
                            </div>
                            <div className = {styles.time}>
                                <span className = {styles.hours}>
                                    {date.hours}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className = {styles.cupContainer}>
                <div className = {styles.plate}></div>
                <div className = {styles.cup}>
                    <div className= {styles.cup__top}>
                        <div className={styles.cup__topPar}>
                            <span className={styles.cup__topParSpan14}></span>
                            <span className={styles.cup__topParSpan2}></span>
                            <span className={styles.cup__topParSpan9}></span>
                            <span className={styles.cup__topParSpan17}></span>
                            <span className={styles.cup__topParSpan11}></span>
                            <span className={styles.cup__topParSpan12}></span>
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
        </div>
    );
}

export default BcgElements
