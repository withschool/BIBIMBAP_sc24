import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import auth from '../Services/Auth.js';

const Register = () => {
    const [individualCode, setIndividualCode] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [birth, setBirth] = useState('2000-01-01');
    const [name, setName] = useState('');

    const handleIndividualCode = (e) => {
        setIndividualCode(e.target.value);
      }

    const handleBirth = (e) => {
       setBirth(e);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        console.log(individualCode);
        console.log(birth);
        console.log(name);
    }

    return(
        <div>
            <input type="text" placeholder="코드 입력하기" value={individualCode} onChange={handleIndividualCode} />
            <input type="text" placeholder="이름을 입력하세요." value={name} onChange={handleName} />
            <DatePicker selected={birth} onChange={handleBirth} dateFormat="yyyy-MM-dd" />
            {/* Add more input fields for other data */}
            <button onClick={handleSubmit}>
            Register
            </button>
            <a href="/login" className="flex-auto text-right">
            로그인하기
            </a>
        </div>
    );
}

export default Register;