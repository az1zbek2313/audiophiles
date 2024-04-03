import React from "react";
import styles from "./style.module.css";
import CardSpeakers from "../../components/CardSpeakers";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleClick(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        navigate(`/about/${data[0].id}`);
      })
      .catch(err => {
        console.log(err);
      })
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
  }
  
  return (
    <>  
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroTexts}>
            <span className={styles.heroSpan}>NEW PRODUCT</span>
            <h2 className={styles.heroTitle}>XX99 Mark II Headphones</h2>
            <p className={styles.heroText}>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <button onClick={() => handleClick(`${import.meta.env.VITE_API}/data?slug=xx99-mark-two-headphones`)} className={styles.heroButton}>See Product</button>
          </div>
          <div className={styles.heroImage}></div>
        </div>
      </div>
      <div className={styles.homePage}>
        <CardSpeakers />
        <section className={styles.sections}>
          <div className={styles.ZX9}>
            <div className={styles.zx9Image}>

            </div>
            <div className={styles.zx9Text}>
              <h2 className={styles.zx9Title}>ZX9 SPEAKER</h2>
              <p className={styles.zx9Desc}>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <button onClick={() => handleClick(`${import.meta.env.VITE_API}/data?slug=zx9-speaker`)} className={styles.zx9Button}>
                See Product
              </button>
            </div>
          </div>
          <div className={styles.ZX7}>
            <div className={styles.zx7Text}>
            <h2 className={styles.zx7Title}>
                ZX7 SPEAKER
              </h2>
              <button onClick={() => handleClick(`${import.meta.env.VITE_API}/data?slug=zx7-speaker`)} className={styles.zx7Button}>
                See Product
              </button>
            </div>
          </div>
          <div className={styles.YX1}>
            <div className={styles.yx1Image}></div>
            <div className={styles.yx1Text}>
              <h1 className={styles.yx1Title}>YX1 EARPHONES</h1>
              <button onClick={() => handleClick(`${import.meta.env.VITE_API}/data?slug=yx1-earphones`)} className={styles.zx7Button}>See Product</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
