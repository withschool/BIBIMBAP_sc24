import React, { useState } from 'react';
import LoginMain from '../../components/LoginMain';
import { Routes, Route } from 'react-router-dom';

const LoginPage = ({handleLoginSuccess}) => {

  return (
          <Routes>
            <Route index element={<LoginMain handleLoginSuccess={handleLoginSuccess}/>} path="/"/>
          </Routes>
  );

};

export default LoginPage;