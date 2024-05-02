import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

    const navigate = useNavigate();

    const setlogout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        alert("로그아웃 되었습니다");
        navigate(`/login`);
    }
    
    return (
        <div>
        <h1>MainPage</h1>
        <button onClick={setlogout}>logout</button>
        </div>
    );
}

export default MainPage;