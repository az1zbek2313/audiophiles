import styles from "./style.module.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import AddToCard from "../components/Modal1/AddToCard";
import { useSelector } from "react-redux";

function Layout() {
  const added = useSelector(state => state.add.value);
  console.log(added);

  return (
    <div className={!added ? styles.wrapper : styles.wrapper1}>
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
            added && <AddToCard />
          }
          <Outlet />
      </main>
      <div className={styles.bestAudio}>
        <div className={styles.beforeFooter}>
          <div className={styles.beforeFooterTexts}>
            <h1 className={styles.beforeFooterTitle}>
              Bringing you the <span>best</span> audio gear
            </h1>
            <p className={styles.beforeFooterText}>
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
          <div className={styles.beforeFooterImage} ></div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <nav className={styles.navbar}>
            <Link className={styles.logo}>audiophile</Link>
            <ul className={styles.listGroup}>
              <li className={styles.list}>
                <Link className={styles.link} to={"/"} onClick={() => {
                  return (
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })
                  )
                }}>
                  Home
                </Link>
              </li>
              <li className={styles.list}>
                <Link className={styles.link} to={"/headphones"} onClick={() => {
                  return (
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })
                  )
                }}>
                  Headphones
                </Link>
              </li>
              <li className={styles.list}>
                <Link className={styles.link} to={"/speakers"} onClick={() => {
                  return (
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })
                  )
                }}>
                  Speakers
                </Link>
              </li>
              <li className={styles.list}>
                <Link className={styles.link} to={"/earphones"} onClick={() => {
                  return (
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })
                  )
                }}>
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

export default Layout;
