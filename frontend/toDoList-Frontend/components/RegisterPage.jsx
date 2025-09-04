import React from 'react';
import {useState, useRef} from 'react';
import {useNavigate} from 'react-router';

const RegisterPage = () => {
  const navigate=useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function regitserButtonHandler(event){
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const emailInput=document.getElementById('email-input');
    const passwordInput=document.getElementById('password-input');
    const confirmPasswordInput=document.getElementById('confirm-password-input');

    const emailLabel=document.getElementById('email-label');
    const passwordLabel=document.getElementById('password-label');
    const confirmPasswordLabel=document.getElementById('confirm-password-label');

    const alertMessage = document.querySelector('.alert-message');

    if(email.trim() === ''){
      emailInput.classList.add('input-invalid');
      emailLabel.classList.add('label-invalid');
      alertMessage.innerHTML = 'Email is required';
      return;
    }
    else{
      emailInput.classList.remove('input-invalid');
      emailLabel.classList.remove('label-invalid');
      alertMessage.innerHTML = '';
    }

    if(password.trim() === '' || confirmPassword.trim() ===''){
      passwordInput.classList.add('input-invalid');
      passwordLabel.classList.add('label-invalid');

      confirmPasswordInput.classList.add('input-invalid')
      confirmPasswordLabel.classList.add('label-invalid');

      alertMessage.innerHTML = 'Password is required';
      return;
    }
    else{
      passwordInput.classList.remove('input-invalid');
      passwordLabel.classList.remove('label-invalid');
      confirmPasswordInput.classList.remove('input-invalid')
      confirmPasswordLabel.classList.remove('label-invalid');
      alertMessage.innerHTML = '';
    }

    if(password !== confirmPassword){
      passwordInput.classList.add('input-invalid');
      passwordLabel.classList.add('label-invalid');

      confirmPasswordInput.classList.add('input-invalid');
      confirmPasswordLabel.classList.add('label-invalid');

      alertMessage.innerHTML = 'Passwords do not match';
      return;
    }
    else{
      passwordInput.classList.remove('input-invalid');
      passwordLabel.classList.remove('label-invalid');
      confirmPasswordInput.classList.remove('input-invalid')
      confirmPasswordLabel.classList.remove('label-invalid');
      alertMessage.innerHTML = '';
    }

    axios.post('http://localhost:3000/user/register', {
      email,
      password
    })
    .then(response => {
      console.log(response.data);
      sessionStorage.setItem('user', JSON.stringify(response.data));
      navigate('/tasks')
    })
    .catch(error => {
      console.log(error.response.data);
      const message=error.response.data.message;
      if(message==='User already exists'){
        emailInput.classList.add('input-invalid');
        emailLabel.classList.add('label-invalid');
        alertMessage.innerHTML = 'User already exists';
        return;
      }
      else{
        emailInput.classList.remove('input-invalid');
        emailLabel.classList.remove('label-invalid');
        alertMessage.innerHTML = '';
      }
    });
  }
  return (
    <div className='register-page-container'>
        <h1 className="heading register-page-heading">Create Account</h1>

        <form action="" className="regitser-form">
          <div className="field-container">
            <label htmlFor="email" id='email-label'>Email</label>
            <input type="email" id="email-input" name="email" placeholder='you@example.com' ref={emailRef}/>
          </div>

          <div className="field-container">
            <label htmlFor="password" id='password-label'>Password</label>
            <input type="password" id="password-input" name="password" placeholder='Enter a password' ref={passwordRef}/>
          </div>

          <div className="field-container">
            <label htmlFor="confirm-password" id='confirm-password-label'>Confirm Password</label>
            <input type="password" id="confirm-password-input" name="confirm-password" placeholder='Re-enter password' ref={confirmPasswordRef}/>
          </div>

          <p className="alert-message"></p>

          <button type="submit" className="register-button register-page-button" onClick={regitserButtonHandler}>Register</button>

          <p className="login-redirect-para">
            Already have an account? <a href="/login" className="login-redirect-link">Login Here</a>
          </p>
        </form>
        
    </div>
  );
};

export default RegisterPage;