import React from 'react';
import {useState, useRef} from 'react';
import {useNavigate} from 'react-router';

const LoginPage = () => {
  const navigate=useNavigate();
  
    const emailRef = useRef();
    const passwordRef = useRef();

    function loginButtonHandler(event){
      event.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const emailInput=document.getElementById('email-input');
      const passwordInput=document.getElementById('password-input');

      const emailLabel=document.getElementById('email-label');
      const passwordLabel=document.getElementById('password-label');

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

      if(password.trim() === ''){
        passwordInput.classList.add('input-invalid');
        passwordLabel.classList.add('label-invalid');

        alertMessage.innerHTML = 'Password is required';
        return;
      }
      else{
        passwordInput.classList.remove('input-invalid');
        passwordLabel.classList.remove('label-invalid');
        alertMessage.innerHTML = '';
      }

      axios.post('http://localhost:3000/user/login', {
        email,
        password
      })
      .then(response => {
        console.log(response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        navigate('/tasks')
      })
      .catch(error => {
        console.log('Error response:',error.response);
        const message=error.response.data.message;
        if(message==='User not found'){
          emailInput.classList.add('input-invalid');
          emailLabel.classList.add('label-invalid');
          alertMessage.innerHTML = 'User not found';
          return;
        }
        else{
          emailInput.classList.remove('input-invalid');
          emailLabel.classList.remove('label-invalid');
          alertMessage.innerHTML = '';
        }
        if(message==='Incorrect password'){
          passwordInput.classList.add('input-invalid');
          passwordLabel.classList.add('label-invalid');
          alertMessage.innerHTML = 'Incorrect password';
          return;
        }
        else{
          passwordInput.classList.remove('input-invalid');
          passwordLabel.classList.remove('label-invalid');
          alertMessage.innerHTML = '';
        }
      });
    }

  return (
    <div className='login-page-container'>
        <h1 className="heading login-page-heading">Log In</h1>

        <form action="" className="login-form">
          <div className="field-container">
            <label htmlFor="email" id='email-label'>Email</label>
            <input type="email" id="email-input" name="email" placeholder='you@example.com' ref={emailRef}/>
          </div>

          <div className="field-container">
            <label htmlFor="password" id='password-label'>Password</label>
            <input type="password" id="password-input" name="password" placeholder='Enter a password' ref={passwordRef}/>
          </div>

          <p className="alert-message"></p>

          <button type="submit" className="register-button register-page-button" onClick={loginButtonHandler}>Log In</button>

          <p className="register-redirect-para">
            New Here? <a href="/register" className="register-redirect-link">Create an account</a>
          </p>
        </form>
        
    </div>
  );
};

export default LoginPage;