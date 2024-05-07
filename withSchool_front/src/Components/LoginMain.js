import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../services/Auth.js';
import { useEffect, useState } from 'react';
import IconMail from './Icon/IconMail.js';

const LoginMain = ({handleLoginSuccess}) => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  }
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  }

  // login 버튼 클릭 이벤트
  const onClickLogin = async () => {
    try {
      // 로그인 요청
      const user = await auth.login(inputId, inputPw);
      
      // 로그인 성공 시 정보 로컬 스토리지에 저장
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('id', inputId);
      localStorage.setItem('login', user.accessToken ? true : false);

      // 메인 페이지 이동
      handleLoginSuccess();

    } catch (error) {
      alert("로그인 실패 : " + error.message);
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
                            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">로그인</h1>
                            <p className="text-base font-bold leading-normal text-white-dark">생성하신 아이디와 비밀번호를 입력하여 로그인해주세요.</p>
                        </div>
                        <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                            <div>
                                <label htmlFor="Email">Email</label>
                                <div className="relative text-white-dark">
                                    <input id="Email" type="email" placeholder="이메일을 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconMail fill={true} />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="Password">Password</label>
                                <div className="relative text-white-dark">
                                    <input id="Password" type="password" placeholder="비밀번호를 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconLockDots fill={true} />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                    <span className="text-white-dark">비밀번호 기억하기</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                로그인
                            </button>
                        </form>
                        <div className="relative my-7 text-center md:mb-9">
                            <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                            <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                        </div>
                        
                        <div className="font-semibold text-center dark:text-white">
                            학교랑 계정이 없으신가요? &nbsp;
                            <Link to="/auth/boxed-signup" className="font-bold uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                계정 생성하기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

};


export default LoginMain;
