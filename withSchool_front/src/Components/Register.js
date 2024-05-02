import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import auth from '../Services/Auth.js';
import school from '../Services/School.js';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
    const [individualCode, setIndividualCode] = useState('');
    const [selectedSchool, setSelectedSchool] = useState('');
    const [schoolList, setSchoolList] = useState([]); // 학교 목록을 저장할 상태 추가
    const [year, setYear] = useState('2000');
    const [month, setMonth] = useState('01');
    const [day, setDay] = useState('01');
    const [name, setName] = useState('');
    const [userInfo, setuserInfo] = useState('');
 
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const data = await school.getSchoolList(); // getSchoolList 함수를 호출하여 학교 목록을 가져옴
                setSchoolList(data); // 가져온 학교 목록을 상태에 저장
            } catch (error) {
                console.error('Error fetching school list:', error);
            }
        };
        fetchSchools(); // 학교 목록을 가져오는 함수 호출
    }, []);

    const handleIndividualCode = (e) => {
        setIndividualCode(e.target.value);
    }

    const handleSchoolChange = (e) => {
        setSelectedSchool(e.target.value);
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
    }

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    }

    const handleDayChange = (e) => {
        setDay(e.target.value);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleuserInfo = (e) => {
        setuserInfo(e.target.value);
    }

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const birthDate = `${year % 100}${month}${day}`;
        try {
            const data = await auth.certify(selectedSchool, name, birthDate, individualCode);
            if(data.message == "해당하는 유저가 없습니다.") {
                alert("해당하는 유저가 없습니다.");
                throw new SyntaxError("Can't find a user");
            }
            setuserInfo(data); // 가져온 학교 목록을 상태에 저장
            navigate('/register/sign-in');
        } catch (error) {
            console.error('Error during certifying:', error);
        }

    }

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <input
                type="text"
                placeholder="코드 입력하기"
                value={individualCode}
                onChange={handleIndividualCode}
                className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <div>
                <select
                    value={selectedSchool}
                    onChange={handleSchoolChange}
                    className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
                >
                    <option value="">학교 선택</option>
                    {schoolList && // 학교 목록이 있을 때만 map() 함수 실행
                        schoolList.map(school => (
                            <option key={school.schoolId} value={school.schoolId}>{school.org_RDNDA}</option>
                        ))}
                </select>
            </div>
            <input
                type="text"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={handleName}
                className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex mb-4">
                <select
                    value={year}
                    onChange={handleYearChange}
                    className="block w-1/3 px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                    {Array.from({ length: 75 }, (_, index) => 2024 - index).map(year => (
                        <option key={year} value={year}>{year}년</option>
                    ))}
                </select>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className="block w-1/3 px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                    {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>{month}월</option>
                    ))}
                </select>
                <select
                    value={day}
                    onChange={handleDayChange}
                    className="block w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                    {Array.from({ length: 31 }, (_, index) => index + 1).map(day => (
                        <option key={day} value={day.toString().padStart(2, '0')}>{day}일</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleSubmit}
                className="block w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
                인증하기
            </button>
            <a href="/login" className="block w-full text-right text-blue-500 hover:underline">
                로그인하기
            </a>
        </div>
    );
}

export default Register;
