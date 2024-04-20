import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

    const navigate = useNavigate();

    const setlogout = () => {
        localStorage.clear();
        navigate(`/login`);
    }

    return (
        <div className="flex flex-col justify-center text-lg bg-white">
        <h1>MainPage</h1>
        <button onClick={setlogout}>logout</button>
        </div>
    );
}

export default MainPage;