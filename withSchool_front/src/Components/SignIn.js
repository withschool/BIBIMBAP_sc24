import { useLocation } from 'react-router-dom';

const SignIn = () => {
    
    const location = useLocation();
    const userInfo = location.state;
    
    return(
        <h1>{userInfo}</h1>
    );
  };
  
  export default SignIn;

  // 이름 출력, 아이디, 비밀번호 확인/ 전화번호, 이메일 약관동의