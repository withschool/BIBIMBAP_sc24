import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import MainPage from './MainPage.js';
import PrivateRoute from './PrivateRoute.js';
import Scroll from '../Components/Scroll.js';
import RegisterPage from './RegisterPage.js';

const Router = () => {
    const access = localStorage.getItem('login');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
      navigate(`/${userId}`);
    }

    return (
        <>
        <Scroll/>
        <Routes>
            <Route index element={access === "true" ? <Navigate to={`/${userId}`} /> : <LoginPage handleLoginSuccess={handleLoginSuccess} />} path="/login/*" />
            <Route path="/register/*" element={<RegisterPage/>} />
            <Route path="/*" element={<PrivateRoute authenticated={access} component={<MainPage />} />} />
        </Routes>
        </>
    );
};

export default Router;