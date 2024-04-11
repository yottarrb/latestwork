// Login.js
import React from 'react';
import RegistrationForm from './RegistrationForms';
import LoginForm from './LoginForms';

const Login = () => {
  return (
    <div style={{ display: 'flex' ,height: '50vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <div>
          <h2>This is Registration Form</h2>
          <RegistrationForm />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <div>
          <h2>This is Login Form</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
