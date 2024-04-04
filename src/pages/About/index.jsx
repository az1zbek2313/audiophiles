import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CardSpeakers from "../../components/CardSpeakers";
import headphones1 from "../../assets/image/category/category-headphones1.svg"; //id=4
import headphones2 from "../../assets/image/category/category-headphones2.svg"; //id=3
import headphones3 from "../../assets/image/category/category-headphones3.svg"; //id=2
import earphones from "../../assets/image/category/category-earphones.svg"; //id=1
import speaker1 from "../../assets/image/category/category-speaker1.svg"; //id=6
import speaker2 from "../../assets/image/category/category-speaker2.svg"; //id=5
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../redux/conterSlice";
import { add } from "../../redux/TernarySlice";

// headphones1 gallery
import headphones1Gallery1 from "../../assets/image/category/category-headphones1/gallery/Bitmap1.png";
import headphones1Gallery2 from "../../assets/image/category/category-headphones1/gallery/Bitmap2.png";
import headphones1Gallery from "../../assets/image/category/category-headphones1/gallery/Bitmap.png";

// headphones2 gallery
import headphones2Gallery1 from "../../assets/image/category/category-headphones2/gallery/Bitmap1.png";
import headphones2Gallery2 from "../../assets/image/category/category-headphones2/gallery/Bitmap2.png";
import headphones2Gallery from "../../assets/image/category/category-headphones2/gallery/Bitmap.png";

// headphones3 gallery
import headphones3Gallery1 from "../../assets/image/category/category-headphones3/gallery/Bitmap1.png";
import headphones3Gallery2 from "../../assets/image/category/category-headphones3/gallery/Bitmap2.png";
import headphones3Gallery from "../../assets/image/category/category-headphones3/gallery/Bitmap.png";

// earphones gallery
import earphonesGallery1 from "../../assets/image/category/category-earphones/gallery/Bitmap1.png";
import earphonesGallery2 from "../../assets/image/category/category-earphones/gallery/Bitmap2.png";
import earphonesGallery from "../../assets/image/category/category-earphones/gallery/Bitmap.png";

// speaker1 gallery
import speaker1Gallery1 from "../../assets/image/category/category-speaker1/gallery/Bitmap1.png";
import speaker1Gallery2 from "../../assets/image/category/category-speaker1/gallery/Bitmap2.png";
import speaker1Gallery from "../../assets/image/category/category-speaker1/gallery/Bitmap.png";

// speaker2 gallery
import speaker2Gallery1 from "../../assets/image/category/category-speaker2/gallery/Bitmap1.png";
import speaker2Gallery2 from "../../assets/image/category/category-speaker2/gallery/Bitmap2.png";
import speaker2Gallery from "../../assets/image/category/category-speaker2/gallery/Bitmap.png";

function About() {
  const params = useParams();
  const [data, setData] = useState("");
  const [ads, setAdd] = useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();  
  const [message, setMessage] = useState({});
  const [cart, setCart] = useState(localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[])

  useEffect(() => {
    setLoader(true);
    fetch(`${import.meta.env.VITE_API}/data?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [navigate]);

  useEffect(() => {
        
    fetch(`http://localhost:3000/data?id=${params.id}`)
    .then(res => res.json())
    .then(d => {
      d[0].counter = counter;
      setMessage(d[0]);       
    })
    .catch(err => {
      console.log(err);
    })
    }, [counter]);


  function handleClick(id) {
    navigate(`/about/${id}`);
  }

  function AddCard() {
    let copied = JSON.parse(JSON.stringify(cart));
    let some = copied.some(el => el.id === message.id);
    if (some) {
      copied = copied.map((el, index) =>{
        if (el.id == message.id) {
          el.counter += counter;
        }
        return el;
      })
    } else {
      copied.push(message);
    }
    localStorage.setItem("cart", JSON.stringify(copied))
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setAdd(true);
    dispatch(add(true));
  } 

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

  return (
    <>
      {loader ? (
        <h1>LOADER...</h1>
      ) : (
        <div className={styles.about}>
          <Link to={"/"} className={styles.back}>
            Go Back
          </Link>
          <div className={styles.card}>
            <div className={styles.image}>
              <img
                className={styles.img}
                src={
                  (data.id == 1 && earphones) ||
                  (data.id == 2 && headphones3) ||
                  (data.id == 3 && headphones2) ||
                  (data.id == 4 && headphones1) ||
                  (data.id == 5 && speaker2) ||
                  (data.id == 6 && speaker1)
                }
                alt="image"
              />
            </div>
            <div className={styles.heroTexts}>
              <span className={styles.heroSpan}>NEW PRODUCT</span>
              <h2 className={styles.heroTitle}>{data.name}</h2>
              <p className={styles.heroText}>{data.description}</p>
              <h4 className={styles.price}>${data.price / 1000}</h4>
              <div className={styles.buttonGroup}>
                <button  className={styles.button}>
                  <span
                    onClick={() => dispatch(decrement())}
                    className={styles.change}
                  >
                    &#8722;
                  </span>
                  <span>{counter}</span>
                  <span
                    onClick={() => dispatch(increment())}
                    className={styles.change}
                  >
                    +
                  </span>
                </button>
                <button id="myButton" onClick={AddCard} className={styles.heroButton}>ADD TO CART</button>
              </div>
            </div>
          </div>
          {/* FEATURE  */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <h1 className={styles.featureTitle}>FEATURES</h1>
              <p className={styles.featureText}>{data.features}</p>
            </div>
            <div className={styles.inTheBox}>
              <h1 className={styles.inTheBoxTitle}>in the box</h1>
              {data &&
                data.includes.map((el, index) => {
                  return (
                    <div key={index} className={styles.inTheBoxText}>
                      <p className={styles.inTheBoxSpan}>{el.quantity}x</p>
                      <p>{el.item}</p>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* GALLERY  */}
          {(data.id == 1 && (
            <div className={styles.gallery}>
              <div className={styles.galleryTwoItem}>
                <div
                  style={{ backgroundImage: `url(${earphonesGallery1})` }}
                  className={styles.galleryImage1}
                ></div>
                <div
                  style={{ backgroundImage: `url(${earphonesGallery2})` }}
                  className={styles.galleryImag1}
                ></div>
              </div>
              <div
                style={{ backgroundImage: `url(${earphonesGallery})` }}
                className={styles.galleryItem1}
              ></div>
            </div>
          )) ||
            (data.id == 4 && (
              <div className={styles.gallery}>
                <div className={styles.galleryTwoItem}>
                  <div
                    style={{ backgroundImage: `url(${headphones1Gallery2})` }}
                    className={styles.galleryImage2}
                  ></div>
                  <div
                    style={{ backgroundImage: `url(${headphones1Gallery1})` }}
                    className={styles.galleryImag2}
                  ></div>
                </div>
                <div
                  style={{ backgroundImage: `url(${headphones1Gallery})` }}
                  className={styles.galleryItem2}
                ></div>
              </div>
            )) ||
            (data.id == 3 && (
              <div className={styles.gallery}>
                <div className={styles.galleryTwoItem}>
                  <div
                    style={{ backgroundImage: `url(${headphones2Gallery1})` }}
                    className={styles.galleryImage3}
                  ></div>
                  <div
                    style={{ backgroundImage: `url(${headphones2Gallery2})` }}
                    className={styles.galleryImag3}
                  ></div>
                </div>
                <div
                  style={{ backgroundImage: `url(${headphones2Gallery})` }}
                  className={styles.galleryItem3}
                ></div>
              </div>
            )) ||
            (data.id == 2 && (
              <div className={styles.gallery}>
                <div className={styles.galleryTwoItem}>
                  <div
                    style={{ backgroundImage: `url(${headphones3Gallery1})` }}
                    className={styles.galleryImage4}
                  ></div>
                  <div
                    style={{ backgroundImage: `url(${headphones3Gallery2})` }}
                    className={styles.galleryImag4}
                  ></div>
                </div>
                <div
                  style={{ backgroundImage: `url(${headphones3Gallery})` }}
                  className={styles.galleryItem4}
                ></div>
              </div>
            )) ||
            (data.id == 6 && (
              <div className={styles.gallery}>
                <div className={styles.galleryTwoItem}>
                  <div
                    style={{ backgroundImage: `url(${speaker1Gallery1})` }}
                    className={styles.galleryImage5}
                  ></div>
                  <div
                    style={{ backgroundImage: `url(${speaker1Gallery2})` }}
                    className={styles.galleryImag5}
                  ></div>
                </div>
                <div
                  style={{ backgroundImage: `url(${speaker1Gallery})` }}
                  className={styles.galleryItem5}
                ></div>
              </div>
            )) ||
            (data.id == 5 && (
              <div className={styles.gallery}>
                <div className={styles.galleryTwoItem}>
                  <div
                    style={{ backgroundImage: `url(${speaker2Gallery1})` }}
                    className={styles.galleryImage6}
                  ></div>
                  <div
                    style={{ backgroundImage: `url(${speaker2Gallery2})` }}
                    className={styles.galleryImag6}
                  ></div>
                </div>
                <div
                  style={{ backgroundImage: `url(${speaker2Gallery})` }}
                  className={styles.galleryItem6}
                ></div>
              </div>
            ))}
          {/* YOU MAY ALSO LIKE  */}
          <div className={styles.others}>
            <h1 className={styles.otherTitle}>you may also like</h1>
            <div className={styles.otherWrap}>
              {
                data.others && data.others.map((el,index) => {
                  return (
                    <div key={index} className={styles.cardWrap}>
                      <div className={styles.cardWrapImage}>
                        <img src={
                          index == 0 ?
                          ((data.id == 2 || data.id == 3) ? 
                          headphones1 :
                          (data.id == 1 || data.id == 4) ?
                          headphones2 :
                          data.id == 6 ? 
                          speaker2 :
                          speaker1) :
                          index == 1 ? 
                          ((data.id == 1 || data.id == 3 || data.id == 4) ? 
                            headphones3 :
                            headphones2
                          ):
                          (data.id == 5 || data.id == 6 ?
                            headphones3 :
                            speaker1)

                        } alt="image" />
                      </div>
                      <h2 className={styles.cardWrapTitle}>{el.name}</h2>
                      <button onClick={() => handleClick(el.id)} className={styles.heroButton}>See Product</button>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <CardSpeakers />
        </div>
      )}
    </>
  );
}

export default About;
