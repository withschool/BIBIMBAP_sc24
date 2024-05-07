import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../../components/Register.js';
import SignIn from '../../components/SignIn.js';
import { Routes, Route } from 'react-router-dom';

const RegisterPage = () => {

    return (
        <div>
            <Routes>
                <Route index element={<Register/>} path="/"/>
                <Route path="/sign-in/*" element={<SignIn/>} />
            </Routes>
        </div>
    );
}

export default RegisterPage;