import React from "react";
import headphones2 from "../../assets/image/category/category-headphones2.svg";
import speaker from "../../assets/image/category/category-speaker2.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

function Card1(props) {
    const {data} = props;
    const navigate = useNavigate();

    function handleClick() {
      navigate(`/about/${data.id}`);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

  return (
    <div className={styles.card}>
      <div className={styles.heroTexts}>
        <span className={styles.heroSpan}>NEW PRODUCT</span>
        <h2 className={styles.heroTitle}>{data.name}</h2>
        <p className={styles.heroText}>
          {data.description}
        </p>
        <button
          onClick={handleClick}
          className={styles.heroButton}
        >
          See Product
        </button>
      </div>
      <div className={styles.image}>
        <img className={styles.img} src={data.id == 3 ? headphones2 : speaker} alt="image" />
      </div>
    </div>
  );
}

export default Card1;
