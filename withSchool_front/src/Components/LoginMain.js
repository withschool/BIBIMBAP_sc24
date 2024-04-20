import React, { useState } from 'react';
import auth from '../Services/Auth.js';

const LoginMain = ({handleLoginSuccess}) => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
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
      localStorage.setItem('login', user.accessToken? true: false);

      // 메인 페이지 이동
      handleLoginSuccess();

    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  return(
      <form className="flex relative flex-col px-14 pt-10 pb-20 mt-28 mb-8 max-w-full bg-white rounded-3xl border-0 border-solid border-zinc-400 w-[630px] max-md:px-5 max-md:mt-10">
        <h1 className="self-center mt-10 text-3xl font-bold tracking-normal text-center text-neutral-800">
          로그인
        </h1>
        <p className="self-center mt-9 font-semibold tracking-normal text-center text-neutral-800">
          생성하신 아이디와 비밀번호를 입력하여 로그인해주세요.
        </p>
        <label htmlFor="username" className="mt-10 font-semibold tracking-normal text-neutral-800 max-md:max-w-full">
          아이디
        </label>
        <input
          type="text"
          id="username"
          placeholder="아이디를 입력하세요."
          className="justify-center items-start px-4 py-5 mt-5 font-semibold tracking-normal whitespace-nowrap rounded-lg border border-solid bg-slate-100 border-zinc-300 text-neutral-400 max-md:pr-5 max-md:max-w-full"
          onChange={handleInputId}
        />
        <div className="flex gap-5 mt-11 font-semibold tracking-normal text-neutral-800 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <label htmlFor="password">비밀번호</label>
          <a href="#" className="flex-auto text-right">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요."
          className="justify-center items-start px-4 py-5 mt-5 font-semibold tracking-normal whitespace-nowrap rounded-lg border border-solid bg-slate-100 border-zinc-300 text-neutral-400 max-md:pr-5 max-md:max-w-full"
          onChange={handleInputPw}
        />
        <div className="flex gap-3 self-start mt-6 font-semibold tracking-normal text-neutral-800">
          <input type="checkbox" id="rememberMe" className="shrink-0 w-6 aspect-square" />
          <label htmlFor="rememberMe" className="flex-auto my-auto">
            비밀번호 기억하기
          </label>
        </div>
        <button
          type="submit"
          className="justify-center items-center self-center px-16 py-5 mt-14 max-w-full text-xl font-bold tracking-normal text-center text-white bg-blue-500 rounded-lg w-[418px] max-md:px-5 max-md:mt-10"
          onClick={onClickLogin}
        >
          로그인 하기
        </button>
        <div className="flex gap-5 justify-between self-center mt-5 mb-3.5 tracking-normal">
          <p className="font-semibold text-center text-neutral-800">학교랑 계정이 없으신가요?</p>
          <a href="/register" className="font-bold text-right text-blue-400 underline">
            계정 생성하기
          </a>
        </div>
      </form>
    );
}

export default LoginMain;
