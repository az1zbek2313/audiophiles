import React, { useRef, useState } from 'react'
import icon from "../../assets/image/home/image-removebg-preview-headphones.svg"
import styles from "./style.module.css"
import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import axios from 'axios';

function Login() {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false);
  const [words, setWords] = useState('');
  const navigate = useNavigate();
  const username = useRef()
  const password = useRef()

  function validate(username, password) {
    if (!username.current.value) {
      username.current.focus();
      setError(true)
      setWords("Username bo'sh bo'lishi mumkin emas");
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
    
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    }
    const isvalid = validate(username, password);
    if (isvalid) {
      username.current.value = '';
      password.current.value = '';
      setError(false);
      setLoading(true)
      setWords('')
      fetch(`https://auth-rg69.onrender.com/api/auth/signin`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
       .then(res => res.json())
       .then(data => {
        if (data.id) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          navigate('/')
        }
          if (data.message == "User Not found.") {
            setError(true);
            setWords(data.message);
          }
          if (data.message == "Invalid Password!") {
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


  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      try {
        const res = await axios.get(
          localStorage.setItem("token", JSON.stringify(response.code)),
          navigate("/")
        )
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    flow: 'auth-code',
  });

  return (
    <div className={styles.container}>
    <img width={40} height={36} src={icon} alt="icon" />

    <div className={styles.cardWrapperr}>
      <h1 className={styles.title}>Login</h1>

      <form onSubmit={handleSubmit}>
        {
          error && <Alert severity="error" sx={{bgcolor:'pink'}}>{`${words}`}</Alert>
        }
      <div className="form-floating mb-3">
        <input ref={username}  type="text" className={styles.formControl} id="floatingInput" placeholder="Username" />
      </div>
      <div className="form-floating mb-3">
        <input ref={password} type="password" className={styles.formControl} id="floatingInput" placeholder="Password" />
      </div>
      <button disabled = {loading ? true : false} className={styles.button}>{loading ? 'LOADING...' : 'Don’t have an account?'}</button>
      </form>

      <button onClick={() => login()} className={styles.googleBtn}>Sign in with Google 🚀</button>

      <span className={styles.spanSignup}>
        <p>Don’t have an account?</p>
        <Link to="/registr">Sign up</Link>
      </span>

    </div>
  </div>
  )
}

export default Login