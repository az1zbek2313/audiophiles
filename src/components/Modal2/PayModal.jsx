import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import headphones1 from "../../assets/image/category/category-headphones1.svg";
import headphones2 from "../../assets/image/category/category-headphones2.svg";
import headphones3 from "../../assets/image/category/category-headphones3.svg";
import earphones from "../../assets/image/category/category-earphones.svg";
import speaker1 from "../../assets/image/category/category-speaker1.svg";
import speaker2 from "../../assets/image/category/category-speaker2.svg";
import { useNavigate } from "react-router-dom";

function PayModal({id}) {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [cart, setCart] = useState(localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[])
  let count = 0;
  let total = 0;
  console.log(17, cart);
  cart && cart.forEach(el => {
    if (el.id == id) {
      count = el.counter 
    }
    total += el.price*el.counter
  });


  useEffect(() => {
    fetch(`https://test-api-v7ua.onrender.com/data?id=${id}`)
    .then(res => res.json())
    .then(data => {
        setData(data[0]);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  function handleClick() {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  return (
    <div id="myButton" className={styles.summary}>
      <div className={styles.summaryTitles}>
        <i className="fa-solid fa-check"></i>
      </div>

      <h1 className={styles.orderTitle}>THANK YOU FOR YOUR ORDER</h1>
      <p className={styles.orderText}>
        You will receive an email confirmation shortly.
      </p>

      <div className={styles.orders}>
        <div className={styles.orderGrey}>
          <div className={styles.summaryItems}>
            <div className={styles.ItemsPrimary}>
              <div className={styles.summaryImage}>
                <img src={
                  data.id == 1 && earphones ||
                  data.id == 2 && headphones3 ||
                  data.id == 3 && headphones2 ||
                  data.id == 4 && headphones1 ||
                  data.id == 6 && speaker1 ||
                  data.id == 5 && speaker2 
                } alt="image" />
              </div>
              <div className={styles.summaryDesc}>
                <h2 className={styles.ItemTitle}>{data.name}</h2>
                <p className={styles.ItemText}>$ {(data.price / 1000)*count}</p>
              </div>
            </div>
            <p className={styles.ItemAmount}>x{count}</p>
          </div>
          <p className={styles.orderGreyText}>and {cart.length - 1} other item(s)</p>
        </div>

        <div className={styles.orderBlack}>
          <h2 className={styles.orderBlackTitle}>GRAND TOTAL</h2>
          <p className={styles.orderBlackText}>$ {(total+50000+1079) / 1000}</p>
        </div>
      </div>

      <button onClick={handleClick} className={styles.summaryButton}>
        BACK TO HOME
      </button>
    </div>
  );
}

export default PayModal;
