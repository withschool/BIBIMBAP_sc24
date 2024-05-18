import { Tab } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import { mappingStudent, listingStudent, getStudentInfoById} from '../../service/parent';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconX from '../../components/Icon/IconX';
import IconAt from '../../components/Icon/IconAt';
import IconLock from '../../components/Icon/IconLock';

const StudentInfo = () => {

    const [modal21, setModal21] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [targetStudent, setTargetStudent] = useState('');
    const [targetStudentInfo, setTargetStudentInfo] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await listingStudent();
                setStudentList(data);
                if (data.length > 0) {
                    setTargetStudent(data[0].user.userId);
                }
            } catch (error) {
                console.error('Error fetching student list:', error);
            }
        };
        fetchStudents();
    }, []);
    
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                if (targetStudent) {
                    const data = await getStudentInfoById(targetStudent);
                    setTargetStudentInfo(data);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudentData();
    }, [targetStudent]);

    const handleUserCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCode(event.target.value);
    }

    const getmappingStudent = async (userCode : string) => {
        const ismaped = await mappingStudent(userCode);
        if(ismaped) { 
            alert("학생 연결이 완료되었습니다.");
            setModal21(false);
        }
        else alert("학생 연결에 실패하였습니다.");
    }

    const handleChange = (userId : string) => {
        setTargetStudent(userId);
        console.log(targetStudent);
    }
     
    return(
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link to="/parent-home" className="text-primary hover:underline">
                            학부모
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>학생 정보</span>
                    </li>
                </ul>
                <div className="panel" id="icon_pills">
                    <div className="mb-5">
                        <Tab.Group>
                            <Tab.List className="mt-3 flex flex-wrap gap-2">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                                before:inline-block' -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                        >
                                            <IconHome className="ltr:mr-2 rtl:ml-2" />
                                            기본정보
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                                before:inline-block' -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                        >
                                            <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            성적조회
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'bg-warning text-white !outline-none' : ''}
                                                before:inline-block' -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                                        >
                                            <IconPhone className="ltr:mr-2 rtl:ml-2" />
                                            학생선택
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        { (studentList.length == 0) ? (
                                            <><h1>연결된 학생이 없습니다.</h1></>
                                        ):(
                                            <div>
                                                <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                                                    <h6 className="text-lg font-bold mb-5">{targetStudentInfo.name} 정보</h6>
                                                    <div className="flex flex-col sm:flex-row">
                                                        <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                                            <img src="https://www.handmk.com/news/photo/202306/16714_40371_5250.jpg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                                        </div>
                                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                            <div>
                                                                <label htmlFor="name">이름</label>
                                                                <div className="form-input">{targetStudentInfo.name}</div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="sex">성별</label>
                                                                <div className="form-input">{targetStudentInfo.sex ? '남성' : '여성'}</div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="id">학생의 아이디</label>
                                                                <div className="form-input" >{targetStudentInfo.id}</div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="phone">전화번호</label>
                                                                <div className="form-input" >{targetStudentInfo.phoneNumber}</div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="email">이메일</label>
                                                                <div className="form-input" >{targetStudentInfo.email}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div>
                                        <div className="flex items-start pt-5">
                                            <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                                                <img
                                                    src="/assets/images/profile-34.jpeg"
                                                    alt="img"
                                                    className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
                                                />
                                            </div>
                                            <div className="flex-auto">
                                                <h1>구현중입니닷</h1>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                <div className="panel">
                                    <div className="table-responsive mb-5">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>이름</th>
                                                    <th>학교</th>
                                                    <th>생년월일</th>
                                                    <th>등록일</th>
                                                    <th className="text-center">선택</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentList.map((data) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>
                                                                <div className="whitespace-nowrap">{data.user.name}</div>
                                                            </td>
                                                            <td>{data.user.schoolName}</td>
                                                            <td>
                                                                {Math.floor(data.user.birthdate / 10000) > 40 ? (
                                                                    <>
                                                                        19{Math.floor(data.user.birthdate / 10000)}년 {Math.floor((data.user.birthdate / 100) % 100)}월 {Math.floor(data.user.birthdate % 100)}일
                                                                    </>
                                                                ) : (
                                                                    Math.floor(data.user.birthdate / 10000) < 10 ? (
                                                                        <>
                                                                            200{Math.floor(data.user.birthdate / 10000)}년 {Math.floor((data.user.birthdate / 100) % 100)}월 {Math.floor(data.user.birthdate % 100)}일
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            20{Math.floor(data.user.birthdate / 10000)}년 {Math.floor((data.user.birthdate / 100) % 100)}월 {Math.floor(data.user.birthdate % 100)}일
                                                                        </>
                                                                    )
                                                                )}
                                                            </td>
                                                            <td>{data.regDate[0]}년 {data.regDate[1]}월 {data.regDate[2]}일</td>
                                                            <td className="text-center">
                                                                <Tippy content="전환">
                                                                    <button type="button" onClick={() => handleChange(data.user.userId)}>
                                                                        <IconTrashLines className="m-auto" />
                                                                    </button>
                                                                </Tippy>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="relative text-white-dark flex justify-end">
                                    <button type="button" onClick={() => setModal21(true)} className="btn btn-primary">
                                        학생 추가
                                    </button>
                                    <Transition appear show={modal21} as={Fragment}>
                                        <Dialog
                                            as="div"
                                            open={modal21}
                                            onClose={() => {
                                                setModal21(false);
                                            }}
                                        >
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="fixed inset-0" />
                                            </Transition.Child>
                                            <div id="register_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                                <div className="flex min-h-screen items-start justify-center px-4">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100 scale-100"
                                                        leaveTo="opacity-0 scale-95"
                                                    >
                                                        <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                                            <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                                                <h5>학생 추가하기</h5>
                                                                <button type="button" onClick={() => setModal21(false)} className="text-white-dark hover:text-dark">
                                                                    <IconX className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                            <div className="p-5">
                                                                <form>
                                                                    <div className="relative mb-4">
                                                                        <h2>연결하고자 하는 유저코드를 입력해 주세요.</h2>
                                                                        <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                            <IconUser className="w-5 h-5" />
                                                                        </span>
                                                                        <input type="text" placeholder="유저코드" className="form-input ltr:pl-10 rtl:pr-10" id="userCode" value ={userCode} onChange={handleUserCode}/>
                                                                    </div>
                                                                    <button type="button" onClick={() => getmappingStudent(userCode)} className="btn btn-primary w-full">
                                                                        추가하기
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </Dialog.Panel>
                                                    </Transition.Child>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </Transition>
                                </div>
                                </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
             </div>
        </div>
    )

}

export default StudentInfo;