import React, { useRef, useState } from 'react'
import icon from "../../assets/image/home/image-removebg-preview-headphones.svg"
import styles from "./style.module.css"
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from '@mui/material';

function SignUp() {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false);
  const [words, setWords] = useState('');
  const navigate = useNavigate();
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const repassword = useRef()

  function validate(email, username, password, repassword) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.current.value) {
      email.current.focus();
      setError(true)
      setWords("Email bo'sh bo'lishi mumkin emas");
      setLoading(false)
      return false;
    }
    if (!email.current.value.match(validRegex)) {
      email.current.focus();
      setError(true);
      setWords('Invalid email adress! (Example:test@gmail.com)')
      setLoading(false)
      return false;
    }
    if (!username.current.value) {
      username.current.focus();
      setError(true)
      setWords("Username bo'sh bo'lishi mumkin emas");
      setLoading(false)
      return false;
    }
    if (username.current.value < 4) {
      username.current.focus();
      setError(true);
      setWords("Kuchli va murakkab user name yarating!");
      setLoading(false)
      return false;
    }
    if (!Number(password.current.value)) {
      password.current.focus();
      setError(true)
      setWords("Password bo'sh bo'lishi mumkin emas");
      setLoading(false)
      return false;
    }
    if (password.current.value !== repassword.current.value) {
      password.current.focus();
      repassword.current.value = '';
      setError(true)
      setWords("Parolni qayta kiriting!");
      setLoading(false)
      return false;
    }
    
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    }
    const isvalid = validate(email, username, password, repassword);
    if (isvalid) {
      username.current.value = '';
      email.current.value = '';
      password.current.value = '';
      repassword.current.value = '';
      setError(false);
      setLoading(true)
      setWords('')
      fetch(`https://auth-rg69.onrender.com/api/auth/signup`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
       .then(res => res.json())
       .then(data => {
        if (data.message == "User registered successfully!") {
          navigate('/login')
        }
          if (data.message == "Failed! Username is already in use!") {
            setError(true);
            setWords(data.message);
          }
          if (data.message == "Failed! Email is already in use!") {
            setError(true);
            setWords(data.message);
          }
       })
       .catch(err => {
        setError(true);
        setWords(err);
       })
       .finally(() => {
          setLoading(false)
       })
    }
  }


  return (
    <div className={styles.container}>
    <img width={40} height={36} src={icon} alt="icon" />

    <div className={styles.cardWrapperr}>
      <h1 className={styles.title}>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        {
          error && <Alert severity="error" sx={{bgcolor:'pink'}}>{`${words}`}</Alert>
        }
      <div className="form-floating mb-3">
        <input ref={email}  type="text" className={styles.formControl} id="floatingInput" placeholder="Email" />
      </div>
      <div className="form-floating mb-3">
        <input ref={username} type="text" className={styles.formControl} id="floatingInput" placeholder="Username" />
      </div>
      <div className="form-floating mb-3">
        <input ref={password} type="password" className={styles.formControl} id="floatingInput" placeholder="Password" />
      </div>
      <div className="form-floating mb-3">
        <input ref={repassword} type="password" className={styles.formControl} id="floatingInput" placeholder="Repassword" />
      </div>
      <button disabled = {loading ? true : false} className={styles.button}>{loading ? 'LOADING...' : 'Create an account'}</button>
      </form>

      <span className={styles.spanSignup}>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </span>

    </div>
  </div>
  )
}

export default SignUp