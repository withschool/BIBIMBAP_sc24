import React, { useState } from 'react';
import auth from '../Services/Auth.js'

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
      localStorage.setItem('token', user.token);
      localStorage.setItem('id', inputId);
      localStorage.setItem('login', user.token? true: false);

      handleLoginSuccess();
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  return(
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            아이디
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="input_id"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color
              sm:text-sm sm:leading-6"
              placeholder="아이디"
              value={inputId}
              onChange={handleInputId}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              비밀번호
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="input_pw"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
              placeholder="비밀번호" 
              value={inputPw}
              onChange={handleInputPw}
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={onClickLogin}
            className="flex w-full justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            로그인
          </button>
        </div>
      </form>

      <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/login/findId" className="text-sm font-semibold text-gray-900 hover:text-main-color"
              >
              아이디 찾기
          </a>
        <a href="/login/findPassword" className="text-sm font-semibold text-gray-900 hover:text-main-color"
          >
          비밀번호 찾기
        </a>
        <a href="/login/join" className="text-sm font-semibold text-gray-900 hover:text-main-color">
          회원 가입
        </a>
      </div>
    </div>
  );
}

export default LoginMain;
