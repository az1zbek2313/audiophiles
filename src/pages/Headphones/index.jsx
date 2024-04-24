import React, { useEffect, useState } from 'react'
import CardSpeakers from '../../components/CardSpeakers'
import Card from '../../components/Card'
import Card1 from '../../components/Card1'
import styles from "./style.module.css"

function Headphones() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch("https://test-api-v7ua.onrender.com/data?category=headphones")
    .then(res => res.json())
    .then(data => {
      setData(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])
  return (
    <div className={styles.headphones}>
      
      <div className={styles.hero}>
        <h1 className={styles.title}>HEADPHONES</h1>
       </div>

      <div className={styles.main}>

        {
          data.map((el, index) => {
            return (
              index%2 == 1 ?
                <Card1 key={el.id} data={el}></Card1>
              :
                <Card key={el.id} data={el}></Card>
            )
          })
        }
        
        <CardSpeakers />
      </div>
    </div>
  )
}

export default Headphones