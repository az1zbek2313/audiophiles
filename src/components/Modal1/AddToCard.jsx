import React, { useEffect, useState } from 'react'
import styles from './style.module.css'

import headphones1 from '../../assets/image/category/category-headphones1.svg'
import headphones2 from '../../assets/image/category/category-headphones2.svg'
import headphones3 from '../../assets/image/category/category-headphones3.svg'
import earphones from '../../assets/image/category/category-earphones.svg'
import speaker1 from '../../assets/image/category/category-speaker1.svg'
import speaker2 from '../../assets/image/category/category-speaker2.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../../redux/TernarySlice'
import { incrementByAmount } from '../../redux/conterSlice'

function AddToCard() {
  let count = 0;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[])

    useEffect(() => {
        const handleGlobalClick = (event) => {
          if (!event.target.closest('#myButton')) {
            dispatch(add(false))
          }
        };
    
        document.addEventListener('click', handleGlobalClick);
    
        return () => {
          document.removeEventListener('click', handleGlobalClick);
        };
      }, []);


      function handleClick() {
        dispatch(add(false));
        navigate(`/checkout/${params.id}`);
        dispatch(incrementByAmount())
      }

      function Deleted() {
        const isDelete = confirm("Rostdan ham barchasini o'chirmoqchimisiz?");
        if (isDelete) {
          localStorage.removeItem('cart');
          setCart([]);
          dispatch(add(false));
          window.location.reload();
        }
      }

    

  return (
    <div id='myButton'  className={styles.summary}>
            <div className={styles.summaryTitles}>
                <h2 className={styles.summaryTitle}>cart ({cart.length})</h2>
                <p onClick={Deleted} className={styles.summaryRemove}>Remove all</p>
            </div>

            {
              cart && cart.map((el, index) => {
                count += el.price*el.counter
                return (
                  <div key={index} className={styles.summaryItems}>
                    <div className={styles.ItemsPrimary}>
                      <div className={styles.summaryImage}>
                        <img src={
                          el.id == 1 && earphones ||
                          el.id == 2 && headphones3 ||
                          el.id == 3 && headphones2 ||
                          el.id == 4 && headphones1 ||
                          el.id == 6 && speaker1 ||
                          el.id == 5 && speaker2 
                          } alt="image" />
                      </div>
                      <div className={styles.summaryDesc}>
                        <h2 className={styles.ItemTitle}>{el.name.slice(0, 4)}</h2>
                        <p className={styles.ItemText}>$ {(el.price / 1000)*(el.counter) }</p>
                      </div>
                    </div>
                    <p className={styles.ItemAmount}>x{el.counter}</p>
                  </div>
                )
              })
            }
           

            <div className={styles.summaryPrice}>
              <p className={styles.PriceText}> TOTAL</p>
              <h2 className={styles.PriceTitle}>$ {count/1000}</h2>
            </div>

            <button onClick={handleClick}  className={styles.summaryButton}>checkout</button>
    </div>
  )
}

export default AddToCard