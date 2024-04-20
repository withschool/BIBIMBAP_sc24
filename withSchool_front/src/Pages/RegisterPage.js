import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../Components/Register';

const RegisterPage = () => {

    const navigate = useNavigate();

    return (
        <div>
        <Register/>
        </div>
    );
}

export default RegisterPage;