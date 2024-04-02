import React from 'react';
import styles from "./style.module.css";
import { Link } from 'react-router-dom';

function CardSpeakers() {
  return (
    <div className={styles.speakers}>
      <Link to={'/headphones'} className={styles.card} onClick={() => {
                  return (
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })
                  )
                }}>
        <div className={styles.image1}></div>
        <div className={styles.textWrap}>
          <h2 className={styles.title}>HEADPHONES</h2>
          <span className={styles.text}>Shop <span>&#x27AF;</span></span>
        </div>
      </Link>
      <Link to={'/speakers'} className={styles.card} onClick={() => {
                  return (
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })
                  )
                }}>
        <div className={styles.image2}></div>
        <div className={styles.textWrap}>
          <h2 className={styles.title}>SPEAKERS</h2>
          <span className={styles.text}>Shop <span>&#x27AF;</span></span>
        </div>
      </Link>
      <Link to={'/earphones'} className={styles.card} onClick={() => {
                  return (
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })
                  )
                }}>
        <div className={styles.image3}></div>
        <div className={styles.textWrap}>
          <h2 className={styles.title}>EARPHONES</h2>
          <span className={styles.text}>Shop <span>&#x27AF;</span></span>
        </div>
      </Link>
    </div>
  )
}

export default CardSpeakers;
