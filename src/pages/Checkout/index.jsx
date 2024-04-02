import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PayModal from '../../components/Modal2/PayModal'
import headphones1 from '../../assets/image/category/category-headphones1.svg'
import headphones2 from '../../assets/image/category/category-headphones2.svg'
import headphones3 from '../../assets/image/category/category-headphones3.svg'
import earphones from '../../assets/image/category/category-earphones.svg'
import speaker1 from '../../assets/image/category/category-speaker1.svg'
import speaker2 from '../../assets/image/category/category-speaker2.svg'

function Checkout() {
  const [add, setAdd] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let count = 0;
  const params = useParams();
  const [cart, setCart] = useState(localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[])
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [error5, setError5] = useState(false);
  const [error6, setError6] = useState(false);
  const [error7, setError7] = useState(false);
  const name = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const adress = useRef();
  const zipCode = useRef();
  const city = useRef();
  const country = useRef();
  const payM = useRef();
  const payC = useRef();

  function validate(name, email, phoneNumber, address, zipCode, city, country) {
    if (!name.current.value.trim()) {
      name.current.focus();
      setError1(true);
      return false;
    }
    if (!email.current.value.trim()) {
      email.current.focus();
      setError1(false);
      setError2(true);
      return false;
    }
    if (!phoneNumber.current.value.trim()) {
      phoneNumber.current.focus();
      setError1(false);
      setError2(false);
      setError3(true);
      return false;
    }
    if (!address.current.value.trim()) {
      address.current.focus();
      setError1(false);
      setError2(false);
      setError3(false);
      setError4(true);
      return false;
    }
    if (!zipCode.current.value.trim()) {
      zipCode.current.focus();
      setError1(false);
      setError2(false);
      setError3(false);
      setError4(false);
      setError5(true);
      return false;
    }
    if (!city.current.value.trim()) {
      city.current.focus();
      setError1(false);
      setError2(false);
      setError3(false);
      setError4(false);
      setError5(false);
      setError6(true);
      return false;
    }
    if (!country.current.value.trim()) {
      country.current.focus();
      setError1(false);
      setError2(false);
      setError3(false);
      setError4(false);
      setError5(false);
      setError6(false);
      setError7(true);
      return false;
    }

    return true;
  }

 
  useEffect(() => {
    // GET DATA 
    fetch(`http://localhost:3000/data?id=${params.id}`)
    .then(res => res.json())
    .then(data => {
        setData(data[0]);
    })
    .catch(err => {
      console.log(err);
    })

    // MODAL 
    const handleGlobalClick = (event) => {
      if (!event.target.closest('#myButton')) {
        setAdd(false)
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  function handleClick() {
    const isValid = validate(name, email, phoneNumber, adress, zipCode, city, country);
    if (isValid) {
      data.counter = 1;
      const user = {
        user:{
          id:Date.now(),
          name:name.current.value,
          email:email.current.value,
          phoneNumber:phoneNumber.current.value,
          adress:adress.current.value,
          zipCode:zipCode.current.value,
          city:city.current.value,
          country:country.current.value,
          payment:payC.current.checked && payC.current.defaultValue || payM.current.checked && payM.current.defaultValue 
        },
        product:[data]
      }
      let copied = JSON.parse(JSON.stringify(avatar));
      let userIndex = copied.findIndex((el) => el.user.email === user.user.email);
  
      if (userIndex !== -1) {
        // Foydalanuvchi allaqachon mavjud
        let productIndex = copied[userIndex].product.findIndex((el) => el.id === data.id);
        if (productIndex !== -1) {
          // Mahsulot allaqachon mavjud
          copied[userIndex].product[productIndex].counter++;
        } else {
          // Mahsulot  mavjud emas
          data.counter = 1;
          copied[userIndex].product.push(data);
        }
      } else {
        // Yangi foydalanuvchi
        copied.push(user);
      }
      localStorage.setItem('users', JSON.stringify(copied))
      
      
      name.current.value = ''
      email.current.value = ''
      phoneNumber.current.value = ''
      adress.current.value = ''
      zipCode.current.value = ''
      city.current.value = ''
      country.current.value = ''
      setError1(false);
      setError2(false);
      setError3(false);
      setError4(false);
      setError5(false);
      setError6(false);
      setError7(false);
      console.log(user);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setAdd(true)
    }
  }

  return (
    <div className={!add ? styles.wrapper : styles.wrapper1}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link className={styles.logo}>audiophile</Link>
          <ul className={styles.listGroup}>
            <li className={styles.list}>
              <Link className={styles.link} to={"/"}>
                Home
              </Link>
            </li>
            <li className={styles.list}>
              <Link className={styles.link} to={"/headphones"}>
                Headphones
              </Link>
            </li>
            <li className={styles.list}>
              <Link className={styles.link} to={"/speakers"}>
                Speakers
              </Link>
            </li>
            <li className={styles.list}>
              <Link className={styles.link} to={"/earphones"}>
                Earphones
              </Link>
            </li>
          </ul>
          <Link>
            <i className={`fa-solid fa-cart-shopping ${styles.cart}`}></i>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
      {
        add && <PayModal id={params.id}/>
      }
        <p onClick={() => navigate('/')} className={styles.back}>Go Back</p>

        <div className={styles.checkoutGroup}>
          <div className={styles.checkout}>
            <h1 className={styles.checkTitle}>CHECKOUT</h1>

            <h2 className={styles.formTitle}>billing details</h2>

            <form className={styles.billing}>
              <div className={error1 ? styles.inputError : styles.inputGroup}>
                <label className={styles.label} htmlFor="floatingInput">Name</label>
                <input type="text" ref={name} className={styles.input} id="floatingInput" placeholder="Alexei Ward"/>
              </div>
              <div className={error2 ? styles.inputError : styles.inputGroup}>
                <label className={styles.label} htmlFor="floatingInput">Email Address</label>
                <input type="email" ref={email} className={styles.input} id="floatingInput" placeholder="alexei@mail.com"/>
              </div>
              <div className={error3 ? styles.inputError : styles.inputGroup}>
                <label className={styles.label} htmlFor="floatingInput">Phone Number</label>
                <input type="number" ref={phoneNumber} className={styles.input} id="floatingInput" placeholder="+998 88 123-45-67"/>
              </div>
            </form>

            <h2 className={styles.formTitle}>shipping info</h2>

            <form className={styles.billing}>
              <div className={error4 ? styles.inputError1 : styles.inputGroup1}>
                  <label className={styles.label} htmlFor="floatingInput">Address</label>
                  <input type="text" ref={adress} className={styles.input} id="floatingInput" placeholder="1137 Williams Avenue"/>
                </div>
              <div className={error5 ? styles.inputError : styles.inputGroup}>
                  <label className={styles.label} htmlFor="floatingInput">ZIP Code</label>
                  <input type="number" ref={zipCode} className={styles.input} id="floatingInput" placeholder="10001"/>
                </div>
                <div className={error6 ? styles.inputError : styles.inputGroup}>
                  <label className={styles.label} htmlFor="floatingInput">City</label>
                  <input type="text" ref={city} className={styles.input} id="floatingInput" placeholder="New York"/>
                </div>
                <div className={error7 ? styles.inputError : styles.inputGroup}>
                  <label className={styles.label} htmlFor="floatingInput">Country</label>
                  <input type="text" ref={country} className={styles.input} id="floatingInput" placeholder="United States"/>
                </div>
            </form>

            <h2 className={styles.formTitle}>payment details</h2>

            <form className={styles.billing}>

                <div className={styles.radioButtons}>
                  <div className={styles.radioTitle}>Payment Method</div>
                  <div className={styles.radios}>
                    <div className={styles.inputGroup2}>
                      <input  ref={payM} type="radio" value="e-Money" checked={true} name="payments" className={styles.input} id="floatingInput" placeholder="e-Money"/>
                      <label htmlFor="floatingInput">e-Money</label>
                    </div>
                    <div className={styles.inputGroup2}>
                      <input ref={payC} type="radio" name="payments" value="Cash on Delivery"  className={styles.input} id="floatingInput" placeholder="Cash on Delivery"/>
                      <label htmlFor="floatingInput">Cash on Delivery</label>
                    </div>
                  </div>
                </div>
            
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="floatingInput">e-Money Number</label>
                  <input type="text" className={styles.input} id="floatingInput" placeholder="238521993"/>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="floatingInput">e-Money PIN</label>
                  <input type="text" className={styles.input} id="floatingInput" placeholder="6891"/>
                </div>
              </form>
            {/* <checkText></checkText> */}
          </div>

          <div className={styles.summary}>
            <h1 className={styles.summaryTitle}>summary</h1>
            {
              cart && cart.map((el, index) => {
                count += el.price;
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
                        <p className={styles.ItemText}>$ {el.price / 1000}</p>
                      </div>
                    </div>
                    <p className={styles.ItemAmount}>x{el.counter}</p>
                  </div>
                )
              })
            }
            <div className={styles.summaryPrices}>
              <p className={styles.PriceText}>TOTAL</p>
              <h2 className={styles.PriceTitle}>$ {count / 1000}</h2>
            </div>
            <div className={styles.summaryPrices}>
              <p className={styles.PriceText}>SHIPPING</p>
              <h2 className={styles.PriceTitle}>$ 50</h2>
            </div>
            <div className={styles.summaryPrices}>
              <p className={styles.PriceText}>VAT (INCLUDED)</p>
              <h2 className={styles.PriceTitle}>$ 1.079</h2>
            </div>
            <div className={styles.summaryPrice}>
              <p className={styles.PriceText}>GRAND TOTAL</p>
              <h2 className={styles.PriceTitle}>$ {+count/1000 + 50 + 1.079}</h2>
            </div>

            <button id="myButton" onClick={handleClick} className={styles.summaryButton}>CONTINUE & PAY</button>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <nav className={styles.navbar}>
            <Link className={styles.logo}>audiophile</Link>
            <ul className={styles.listGroup}>
              <li className={styles.list}>
                <Link className={styles.link} to={"/"}>
                  Home
                </Link>
              </li>
              <li className={styles.list}>
                <Link className={styles.link} to={"/headphones"}>
                  Headphones
                </Link>
              </li>
              <li className={styles.list}>
                <Link className={styles.link} to={"/speakers"}>
                  Speakers
                </Link>
              </li>
              <li className={styles.list}>
                <Link className={styles.link} to={"/earphones"}>
                  Earphones
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.footerDiv}>
            <section className={styles.footerText}>
              <p className={styles.text}>
                Audiophile is an all in one stop to fulfill your audio needs.
                We're a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we’re open 7 days a week.
              </p>
              <span className={styles.span}>
                Copyright 2021. All Rights Reserved
              </span>
            </section>
            <article className={styles.icons}>
              <Link>
                <i
                  className={`fa-brands fa-square-facebook fa-fade ${styles.iconn}`}
                ></i>
              </Link>
              <Link>
                <i
                  className={`fa-brands fa-twitter fa-fade ${styles.iconn}`}
                ></i>
              </Link>
              <Link>
                <i
                  className={`fa-brands fa-instagram fa-fade ${styles.iconn}`}
                ></i>
              </Link>
            </article>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Checkout;
