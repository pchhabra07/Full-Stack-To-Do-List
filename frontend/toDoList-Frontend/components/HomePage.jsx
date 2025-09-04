import React from 'react';
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate=useNavigate();

  return (
    <div className="home-page-container">
      <h1 className='heading'>Welcome</h1>
      <p className="small-heading">A simple to-do app to get things done.</p>

      <div className="button-container">
        <button className="register-button" onClick={()=>navigate('/register')}>Register</button>
        <button className="login-button" onClick={()=>navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default HomePage;