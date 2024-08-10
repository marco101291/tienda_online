import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './components/Cart'
import { checkAuth } from './redux/authSlice';



export const App = () => {
  const user = useSelector((state)=> state.auth.user);
  const dispatch = useDispatch();
  console.log("user from App.jsx ", user)

  useEffect(()=> {

    dispatch(checkAuth());
    
  }, [dispatch])
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="login" />}></Route>
            <Route path='*' element={<Navigate to="/" />}></Route>
          </Routes>
        </div>
     </div>
    </Router>
    
  );
}


