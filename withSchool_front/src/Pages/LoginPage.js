import React, { useState } from 'react';
import LoginMain from '../Components/LoginMain';

const LoginPage = () => {

  const handleLoginSuccess = () => {
    alert("Success Login")
  }

  return (
    <LoginMain handleLoginSuccess={handleLoginSuccess}/>
  );
};

export default LoginPage;