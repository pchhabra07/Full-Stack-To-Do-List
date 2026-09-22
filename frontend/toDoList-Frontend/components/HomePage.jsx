import React from 'react';
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate=useNavigate();

  return (
    <div className="home-page-container bg-neon-orange-500" data-testid="home-page-container">
      <h1 className='heading text-neon-orange-600'>Welcome</h1>
      <p className="small-heading">A simple to-do app to get things done.</p>

      <div className="button-container">
        <button className="register-button bg-neon-orange-500 text-neon-orange-600" onClick={()=>navigate('/register')}>Register</button>
        <button className="login-button bg-neon-orange-500 text-neon-orange-600" onClick={()=>navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default HomePage;