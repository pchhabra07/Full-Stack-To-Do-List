import React from 'react';
import { useState, useRef , useNavigate} from 'react'

const HomePage = () => {
    const serverURL='http://localhost:3000';
    const emailLoginInputRef=useRef('');
    const passwordLoginInputRef=useRef('');

    const emailSignUpInputRef=useRef('');
    const passwordSignUpInputRef=useRef('');

    const navigate=useNavigate();

    function loginHandler(){
        const loginData={
            email: emailLoginInputRef.current.value,
            password: passwordLoginInputRef.current.value
        }

        emailLoginInputRef.current.value='';
        passwordLoginInputRef.current.value='';

        axios.post(`${serverURL}/login`,loginData)
        .then((req,res)=>{
            const loginResult=res.data;
            if(loginResult.isAuthenticated){
                navigate('/tasks')
            }
            else{
                document.getElementById('error-message').innerText="Invalid Credentials...";
            }
        })

        console.log(loginData)
    }

    function signUpHandler(){
        const signUpData={
            email: emailSignUpInputRef.current.value,
            password: passwordSignUpInputRef.current.value
        }

        emailSignUpInputRef.current.value='';
        passwordSignUpInputRef.current.value='';
        
        console.log(signUpData)
    }

    function googleSignInHandler(){

    }

  return (
    <div>
        <h1 className="heading">Welcome to your To Do List App</h1>

        <h3 className='home-page-text'>Already a user?</h3>
        <br />
        <input placeholder='Enter email' type='email' ref={emailLoginInputRef} className='email-input'/>
        <br />
        <input placeholder='Enter password' type="password" ref={passwordLoginInputRef} className='password-input' />
        <br />
        <button className='login-button' onClick={loginHandler}>Login</button>
        <br />
        <p id='error-message' style={{color:'red'}}></p>
        <br />
        <h3 className="home-page-text">Or</h3>
        <button className="loginUsingGoogle" onClick={googleSignInHandler}>Sign In using Google</button>

        <br />
        <h3 className='home-page-text'>New user?</h3>
        <br />
        <input placeholder='Enter email' type='email' ref={emailSignUpInputRef} className='email-input'/>
        <br />
        <input placeholder='Enter password' type="password" ref={passwordSignUpInputRef} className='password-input' />
        <br />
        <button className='login-button' onClick={signUpHandler}>Register</button>
        <br />

        
    </div>
  );
};

export default HomePage;