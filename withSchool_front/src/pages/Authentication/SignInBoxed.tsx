import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import React, { ChangeEvent } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { certify, DuplicateId, register } from '../../service/auth';
import { getSchoolList } from '../../service/school';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { login } from '../../service/auth';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import IconSettings from '../../components/Icon/IconSettings';
import IconLaptop from '../../components/Icon/IconLaptop';

const SignInBoxed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [sex, setSex] = useState('');
    const [year, setYear] = useState('2000');
    const [month, setMonth] = useState('01');
    const [day, setDay] = useState('01');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [loginError, setLoginError] = useState('');
    const [result, setResult] = useState(true);

    let userInfoString = localStorage.getItem('certifyinfo')!;
    const userInfo = JSON.parse(userInfoString);

    const isStudent = localStorage.getItem('isStudent') === 'true'; 

    useEffect(() => {
        dispatch(setPageTitle('Withschool-Register-SignIn'));
    });

    useEffect(() => {
        // 페이지 렌더링 시 실행되는 코드
        const certifyInfo = localStorage.getItem('certifyinfo');
      }, []);

    const handleSex = (event: ChangeEvent<HTMLInputElement>) => {
        setSex(event.target.value);
    }

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setYear(event.target.value);
    }
    
    const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMonth(event.target.value);
    }
    
    const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDay(event.target.value);
    }

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
        console.log("바뀜");
        setResult(true);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(event.target.value);
    }

    const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleCheckDuplicate = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            console.log(userInfo);

            if (await DuplicateId(id)) {
                alert("중복된 아이디입니다. 다시 설정해주세요.");
            }
            else if(id.length < 5){
                alert("아이디의 길이가 너무 짧습니다(5자 이상).")
            } 
            else {
                alert("사용 가능한 아이디입니다.");
                setResult(false);
            }
        } catch (error) {
            console.error("오류가 발생했습니다:", error);
        }
    };

    const formatPhoneNumber = (input: string) => {
        let cleaned = ('' + input).replace(/\D/g, '');
    
        if (cleaned.length > 11) {
            cleaned = cleaned.substring(0, 11);
        }
    
        let formatted = '';
        for (let i = 0; i < cleaned.length; i++) {
            if (i === 3 || i === 7) {
                formatted += '-';
            }
            formatted += cleaned[i];
        }
        return formatted;
    };

    const changePhoneForm = (Phone: string) => {
        const numberPattern = /\d+/g;
        const numbersArray = Phone.match(numberPattern);
        return numbersArray ? numbersArray.join('') : '';
    }

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const birthDate = `${(parseInt(year) % 100).toString().padStart(2, '0')}${month}${day}`;
        const reqphoneNumber = changePhoneForm(phoneNumber);
        try {
            // 무결성 검사
            if(
                (!isStudent && (name === '')) ||
                (sex === '') || 
                (phoneNumber === '')
                ){
                    throw new Error('기입하지 않는 항목이 있습니다. 입력해 주세요.');
                }
            else if(result){
                throw new Error('아이디 중복 확인 후 시도바랍니다.');
            }
            else if(password.length < 6 || password != checkPassword){
                throw new Error('비밀번호가 6자리 미만이거나 일치하지 않습니다.');
            }

            // 학생, 교사
            if(isStudent){
                const userCode: string = localStorage.getItem('userCode') ?? '';
                console.log(id, email, password, userInfo.user.userName, sex==="male", phoneNumber, "", userInfo.user.birthDate, -1)
                const data = await register(id, email, password, userInfo.user.userName, sex==="male", reqphoneNumber, "" , userInfo.user.birthDate, -1 , userCode);
            }

            // 학부모
            else{
                console.log(id, email, password, name, sex==="male", phoneNumber, "", birthDate, 1)
                const data = await register(id, email, password, name, sex==="male", reqphoneNumber, "" , birthDate, 1 , "");
            }

            alert("회원가입이 완료되었습니다.");
            navigate('/login');

        } catch (error: any) {
            alert(error.message);
        }

    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">회원가입</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">사용할 아이디와 비밀번호를 입력해주세요.</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <label htmlFor="Name">Name</label>
                                {isStudent ? (
                                <div>
                                    <div className="relative text-gray-500 bg-gray-300 rounded-md ps-10 p-2 flex items-center">
                                        <div>{userInfo.user.userName}</div>
                                        <span className="absolute start-3 top-1/2 -translate-y-1/2">
                                            <IconLaptop fill={true} />
                                        </span>
                                    </div>
                                </div>
                                ) : (
                                    <div>
                                        <div className="relative text-white-dark flex">
                                            <input id="Name" placeholder="이름을 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" value={name} onChange={handleName}  />
                                            <span className="absolute start-3 top-1/2 -translate-y-1/2">
                                                <IconLaptop fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <label htmlFor="Birth">Birth</label>
                                    <div className="flex relative text-white-dark">
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
                                <div>
                                    <label htmlFor="Sex">Sex</label>
                                    <div className="relative text-white-dark">
                                        <label><input id="male" type="radio" name="Sex" className="relative w-6 h-4 rounded border border-gray-400 mr-2" value="male" onChange={handleSex}/>남자</label>
                                        <label><input id="female" type="radio" name="Sex" className="relative w-6 h-4 rounded border border-gray-400 mr-2" value="female" onChange={handleSex}/>여자</label>
                                    </div>
                                </div>
                                <hr/>
                                <div>
                                    <label htmlFor="IndividualCode">ID</label>
                                    <div className="relative text-white-dark flex">
                                        <input id="Id" placeholder="아이디를 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" value={id} onChange={handleId}  />
                                        <button onClick={handleCheckDuplicate} className="ml-2 px-6 flex py-2 rounded-md bg-blue-500 text-white font-bold focus:outline-none hover:bg-blue-600">
                                            중복 확인
                                        </button>
                                        <span className="absolute start-3 top-1/2 -translate-y-1/2">
                                            <IconLaptop fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                    <input id="Password" type="password" placeholder="비밀번호를 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" value={password} onChange={handlePassword}  />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="CheckPassword">Confirm Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="CheckPassword" type="password" placeholder="비밀번호를 재입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" value={checkPassword} onChange={handleCheckPassword}/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                {password ? ( password.length >= 6 && checkPassword.length >= 6 ? (
                                    password === checkPassword ? (
                                        <p className="text-xs text-blue-500">비밀번호가 일치합니다.</p>
                                    ) : (
                                        <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
                                    )
                                ) : (
                                    <p className="text-xs text-red-500">비밀번호는 최소 6자 이상이어야 합니다.</p>
                                )) : (
                                    <></>
                                )}
                                <div>
                                    <label htmlFor="PhoneNumber">Phone Number</label>
                                    <div className="relative text-white-dark">
                                        <input id="PhoneNumber" type="tel" placeholder="핸드폰 번호를 입력해 주세요." value={formatPhoneNumber(phoneNumber)} className="form-input ps-10 placeholder:text-white-dark" onChange={handlePhoneNumber}/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="Email" type="email" placeholder="이메일을 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" value={email} onChange={handleEmail}/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                {loginError && <div className="text-red-500">회원가입에 실패하였습니다.</div>}
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    회원가입
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="font-semibold text-center dark:text-white mb-2">
                                학교랑 계정이 있으신가요? &nbsp;
                                <Link to="/login" className="font-bold uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    로그인 하러 가기
                                </Link>
                            </div>
                            <div className="font-semibold text-center dark:text-white">
                                사용자를 변경하고 싶으신가요? &nbsp;
                                <Link to="/register/choose" className="font-bold uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    사용자 선택 하러 가기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInBoxed;