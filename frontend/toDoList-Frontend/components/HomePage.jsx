import React from 'react';
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router';

const HomePage = () => {
  let navigate = () => {};
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = () => {};
  }

  return (
    <div data-testid="home-page-container" className="home-page-container neon-orange-theme bg-neon-orange-500 text-neon-orange-600">
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