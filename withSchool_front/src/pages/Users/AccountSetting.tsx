import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { getUserInfobyId, editUser, login, editUserPw } from '../../service/auth';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';

const AccountSetting = () => {
    const [userinfo, setUserInfo] = useState<any>([]);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [islogined, setIslogined] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('프로필'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
              const id = localStorage.getItem('id');
              if (id) {
                const info = await getUserInfobyId(id);
                setUserInfo(info);
                setAddress(info.address);
                setEmail(info.email);
                setPhoneNumber(info.phoneNumber);
              }
            } catch (error) {
              console.error("Error fetching user info:", error);
            }
          };
        fetchUserInfo();
    }, []);

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

    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    const editinfo = async () =>{
        console.log(userinfo.userId, email, phoneNumber, address);
        await editUser(userinfo.userId, email, phoneNumber, address);
    }

    const editpasswordinfo = async () =>{
        await editUserPw(userinfo.userId, password);
        alert("비밀번호가 변경되었습니다.");
        setIslogined(false);
        setPassword('');
    }

    const getcertify = async() => {
        const logined = await login(userinfo.id, password);
        if(logined.accessToken){
            setIslogined(true);
        }
        setPassword('');
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        프로필
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>계정 설정</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">프로필 설정</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                내 프로필
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('preferences')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'preferences' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconUser className="w-5 h-5" />
                                비밀번호 변경
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('danger-zone')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'danger-zone' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconPhone />
                                계정 설정
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'home' ? (
                    <div>
                        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">내 정보</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src="https://www.handmk.com/news/photo/202306/16714_40371_5250.jpg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name">이름</label>
                                        <div id="name" className="form-input  text-gray-500 bg-gray-300">{userinfo.name}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="id">아이디</label>
                                        <div id="id" className="form-input  text-gray-500 bg-gray-300">{userinfo.id}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="sex">성별</label>
                                        <div id="sex" className="form-input  text-gray-500 bg-gray-300">{userinfo.sex ? "남자" : "여자"}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="address">주소</label>
                                        <input id="address" type="text" value={address} placeholder={userinfo.address} onChange={handleAddress} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">전화번호</label>
                                        <input id="phone" type="text" value={phoneNumber} placeholder={userinfo.email} onChange={handlePhoneNumber} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">이메일</label>
                                        <input id="email" type="email" value={email} onChange={handleEmail} placeholder={userinfo.email} className="form-input" />
                                    </div>
                                    <div className="sm:col-span-2 mt-3 mb-3">
                                        <hr className='pt-5'/>
                                        <button type="button" onClick={editinfo} className="btn btn-primary">
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'preferences' ? (
                    <div className="switch">
                    <div>
                        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">비밀번호 변경</h6>
                            <div className="flex flex-col sm:flex-row">
                            {islogined ? (
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <div>
                                            <label htmlFor="password">비밀번호 입력</label>
                                            <input id="password" type="password" value={password} onChange={handlePassword} placeholder="변경할 비밀번호를 입력하세요." className="form-input" />
                                        </div>
                                        <div>
                                            <label className='mt-5' htmlFor="checkpassword">비밀번호 재확인</label>
                                            <input id="checkpassword" type="password" value={checkPassword} onChange={handleCheckPassword} placeholder='변경할 비밀번호를 재입력하세요.' className="form-input" />
                                        </div>
                                        <div className='mt-5'>
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
                                        </div>
                                        
                                        <div className="sm:col-span-2 mt-3 mb-3">
                                            <hr className='pt-5'/>
                                            <button type="button" onClick={editpasswordinfo} className="btn btn-primary">
                                                변경하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <p className='mb-5'>본인 확인을 위한 비밀번호 입력을 합니다.</p>
                                    <div>
                                        <label htmlFor="password">비밀번호</label>
                                        <input id="password" type="password" value={password} onChange={handlePassword} placeholder="비밀번호를 입력해주세요." className="form-input" />
                                    </div>
                                    <div className="sm:col-span-2 mt-3 mb-3">
                                        <hr className='pt-5'/>
                                        <button type="button" onClick={getcertify} className="btn btn-primary">
                                            인증하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            )}
                            </div>
                        </div>
                    </div>
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'danger-zone' ? (
                    <div className="switch">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">내 정보 초기화</h5>
                                <p>내 프로필 정보를 초기화 시킵니다.</p>
                                <button className="btn btn-secondary">초기화</button>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">정보 비공개</h5>
                                <p>내 정보를 다른 사람들에게 비공개합니다.</p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox7" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">계정 삭제</h5>
                                <p>회원 탈퇴를 하고 계정 정보를 삭제합니다.</p>
                                <button className="btn btn-danger btn-delete-account">내 계정 삭제하기</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default AccountSetting;
