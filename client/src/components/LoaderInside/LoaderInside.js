import React from 'react'


import styles from './LoaderInside.module.css'

const LoaderInside = () => {
  return (
    <div className={styles.lds__roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default LoaderInside