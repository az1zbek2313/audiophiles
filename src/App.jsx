// App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Headphones from "./pages/Headphones"
import Speakers from "./pages/Speakers"
import Earphones from "./pages/Earphones"
import About from "./pages/About"
import Checkout from './pages/Checkout'
import './App.css'
import Layout from './Layout/Layout';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children, redirectTo = "/login", isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {    
    if (!localStorage.getItem('token')) {
      setToken('');
    }
  }, [])

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/registr' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login setToken={setToken} />}></Route>

        {/* Protected Routes */}
        <Route element={<Layout/>}>
          <Route path='/' element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
                <Home></Home>
            </ProtectedRoute>
          }></Route>
          <Route path='/headphones' element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
                <Headphones></Headphones>
            </ProtectedRoute>
          }></Route>
          <Route path='/speakers' element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
                <Speakers></Speakers>
            </ProtectedRoute>
          }></Route>
          <Route path='/earphones' element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
                <Earphones></Earphones>
            </ProtectedRoute>
          }></Route>
          <Route path='/about/:id' element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
                <About></About>
            </ProtectedRoute>
          }></Route>
        </Route>        
        <Route path='/checkout/:id' element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
                <Checkout></Checkout>
            </ProtectedRoute>
          }></Route>
      </Routes> 
    </>
  )
}

export default App;
