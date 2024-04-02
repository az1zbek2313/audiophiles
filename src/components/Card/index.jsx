import React from "react";
import headphones1 from "../../assets/image/category/category-headphones1.svg";
import headphones3 from "../../assets/image/category/category-headphones3.svg";
import earphones from "../../assets/image/category/category-earphones.svg";
import speaker from "../../assets/image/category/category-speaker1.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { data } = props;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/about/${data.id}`)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img
          className={styles.img}
          src={
            data.id == 2 ? headphones3 : data.id == 1 ? earphones : data.id == 6 ? speaker :  headphones1
          }
          alt="image"
        />
      </div>
      <div className={styles.heroTexts}>
        <span className={styles.heroSpan}>NEW PRODUCT</span>
        <h2 className={styles.heroTitle}>{data.name}</h2>
        <p className={styles.heroText}>{data.description}</p>
        <button
          onClick={handleClick}
          className={styles.heroButton}
        >
          See Product
        </button>
      </div>
    </div>
  );
}

export default Card;
