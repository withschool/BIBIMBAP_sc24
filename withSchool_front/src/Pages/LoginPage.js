import React, { useState } from 'react';
import LoginMain from '../Components/LoginMain';
import { Routes, Route } from 'react-router-dom';

const LoginPage = ({handleLoginSuccess}) => {

  function Logo() {
    return (
      <div className="justify-center self-start text-xl font-extrabold text-neutral-800">
        <span className="">With</span>
        <span className="text-neutral-800">School</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center text-lg bg-white">
      <div className="flex flex-col justify-center w-full bg-blue-500 max-md:max-w-full">
        <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 w-full min-h-[1070px] max-md:px-5 max-md:max-w-full">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a4d5b21bb71e79c5eae6b3131351a8ecbf4218442b8a0dfcd923c2e37f4cd8e?apiKey=6c27dd538c5e41f9ab3d9f134fa3c4ae&" alt="" className="object-cover absolute inset-0 size-full" />
          <Logo />
          <Routes>
            <Route index element={<LoginMain handleLoginSuccess={handleLoginSuccess}/>} path="/"/>
          </Routes>
        </div>
      </div>
    </div>
  );

};

export default LoginPage;