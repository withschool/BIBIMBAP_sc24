import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { ChangeEvent } from 'react';
import { IRootState } from '../../store';
import { useEffect, useState, Fragment } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { certify } from '../../service/auth';
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
import { Dialog, Transition,Tab } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [individualCode, setIndividualCode] = useState('');
    const [selectedSchool, setSelectedSchool] = useState('');
    const [year, setYear] = useState('2000');
    const [month, setMonth] = useState('01');
    const [day, setDay] = useState('01');
    const [name, setName] = useState('');
    const [loginError, setLoginError] = useState('');
    const [searchModal, setSearchModal] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [schoolList, setSchoolList] = useState<SchoolType[]>([]);
    const [schoolInfo, setSchoolInfo] = useState('');
    const [filteredSchools, setFilteredSchools] = useState<SchoolType[]>([]);

    interface SchoolType {
        schoolId: string;
        schoolName: string;
        schoolAddress: string;
    }

    useEffect(() => {
        if (searchWord === '') {
          setFilteredSchools([]);
        } else {
          const lowercasedFilter = searchWord.toLowerCase();
          const filteredData : SchoolType[] = schoolList.filter(school =>
            school &&
            school.schoolName &&
            school.schoolName.toLowerCase().includes(lowercasedFilter)
          );
          setFilteredSchools(filteredData);
        }
    }, [searchWord, schoolList]);
      

    const handleSelect = (school : any) => {
        setSelectedSchool(school.schoolId);
        setSearchWord('');
        setSearchModal(false);
        setSchoolInfo(school.schoolName+' ('+school.schoolAddress+')');
    };

    const handleBlur = () => {
        setTimeout(() => setFilteredSchools([]), 100);
    };

    useEffect(() => {
        dispatch(setPageTitle('Withschool-Login'));
    });

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const data = await getSchoolList(); 
                setSchoolList(data); 
            } catch (error) {
                console.error('Error fetching school list:', error);
            }
        };
        fetchSchools(); 
    }, []);

    const handleIndividualCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndividualCode(event.target.value);
    }

    const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchool(event.target.value);
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

    const handleSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(event.target.value);
        console.log(searchWord);
    }

    const handleUserInfo = (data : string) => {
        const paramData = JSON.stringify(data);
        localStorage.setItem('certifyinfo', paramData);
        localStorage.setItem('userCode', individualCode);
    }

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const birthDate = `${(parseInt(year) % 100).toString().padStart(2, '0')}${month}${day}`;
        console.log(selectedSchool, name, birthDate, individualCode);
        try {
            const data = await certify(selectedSchool, name, birthDate, individualCode);
            console.log(data.message);
            if(data.message == "해당하는 유저가 없습니다.") {
                alert("해당하는 유저가 없습니다.");
                throw new SyntaxError("Can't find a user");
            }
            else if(data.message == "해당하는 유저는 이미 회원가입 되었습니다."){
                alert("이미 회원가입을 진행한 유저입니다.");
                throw new SyntaxError("Already Signed user");
            }
            else {
                await handleUserInfo(data);
                navigate('/register/sign-in');
            }
        } catch (error) {
            console.error('Error during certifying:', error);
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
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">본인인증</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">전달 받은 개인 코드를 통해 사용자를 인증합니다.</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="IndividualCode">Verify Code</label>
                                    <div className="relative  text-white-dark">
                                        <input id="IndividualCode" placeholder="인증코드를 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" value={individualCode} onChange={handleIndividualCode}  />
                                        <span className="absolute start-3 top-1/2 -translate-y-1/2">
                                            <IconLaptop fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="School">School</label>
                                    <div className="relative text-white-dark">
                                    <div className='flex'>
                                    <input
                                        value={schoolInfo}
                                        placeholder='학교를 검색해 주세요.'
                                        readOnly
                                        className="block w-full form-input px-9 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 placeholder:text-white-dark"
                                    >
                                    </input>

                                    <div className="mb-5">
                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => setSearchModal(true)}
                                                    className="ml-2 px-5 py-2 w-20 h-9 items-center btn btn-gradient rounded-md text-white font-bold uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] focus:outline-none hover:bg-blue-600 btn-text"
                                                >
                                                    검색
                                                </button>
                                                <Transition appear show={searchModal} as={Fragment}>
                                                    <Dialog
                                                        as="div"
                                                        open={searchModal}
                                                        onClose={() => setSearchModal(false)}
                                                        className="fixed inset-0 z-50 overflow-y-auto"
                                                    >
                                                        <div className="flex items-start justify-center min-h-screen px-4 text-center">
                                                            <Transition.Child
                                                                as={Fragment}
                                                                enter="ease-out duration-300"
                                                                enterFrom="opacity-0 scale-95"
                                                                enterTo="opacity-100 scale-100"
                                                                leave="ease-in duration-200"
                                                                leaveFrom="opacity-100 scale-100"
                                                                leaveTo="opacity-0 scale-95"
                                                            >
                                                                <Dialog.Panel className="panel border-0 py-2 w-full pb-4 rounded-lg overflow-hidden max-w-sm my-8 text-black dark:text-white-dark">
                                                                    <div className="flex items-center justify-between p-5 font-semibold text-lg text-primary md:text-xl dark:text-white">
                                                                        <h5>학교 찾기</h5>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setSearchModal(false)}
                                                                            className="text-white-dark hover:text-dark"
                                                                        >
                                                                        </button>
                                                                    </div>
                                                                    <div className="p-3">
                                                                        <div>
                                                                            <div className="relative mb-4">
                                                                            <input
                                                                                className = 'w-full border rounded px-3 py-2'
                                                                                type="text"
                                                                                placeholder="학교를 검색하세요."
                                                                                value={searchWord}
                                                                                onChange={handleSearchWord}
                                                                                onBlur={handleBlur}
                                                                            />
                                                                            {filteredSchools.length > 0 && (
                                                                                <ul>
                                                                                {filteredSchools.map((school :SchoolType) => (
                                                                                    <li className='mt-3 h-5 text-sm cursor-pointer flex' 
                                                                                    style={{ borderTop: filteredSchools.length > 0 ? '1px solid #ccc' : 'none' , paddingTop: '5px', paddingBottom: '5px' }}
                                                                                    key={school.schoolId} onMouseDown={() => handleSelect(school)}>
                                                                                    {school.schoolName} ({school.schoolAddress})
                                                                                    </li>
                                                                                ))}
                                                                                </ul>
                                                                            )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Dialog.Panel>
                                                            </Transition.Child>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </div>
                                        </div>
                                    </div>

                                    </div>
                                        <span className="absolute start-3 pb-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name">Name</label>
                                    <div className="relative text-white-dark">
                                        <input id="Name" placeholder="이름을 입력해 주세요." className="form-input ps-10 placeholder:text-white-dark" value={name} onChange={handleName}/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                {loginError && <div className="text-red-500">로그인에 실패하였습니다.</div>}
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    본인인증
                                </button>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
