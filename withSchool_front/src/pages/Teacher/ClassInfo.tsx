import { Tab } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import { mappingStudent, listingStudent, getStudentInfoById } from '../../service/parent';
import { getSchoolNotice, getSchoolNoticeDetail, getSchoolInfo } from '../../service/school';
import { getClassInfo } from '../../service/class';
import { getSubjectList } from '../../service/subject';
import { getUserInfobyId } from '../../service/auth';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconX from '../../components/Icon/IconX';
import IconAt from '../../components/Icon/IconAt';
import IconLock from '../../components/Icon/IconLock';
import IconDownload from '../../components/Icon/IconDownload';
import IconGallery from '../../components/Icon/IconGallery';
import Dropdown from '../../components/Dropdown';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconFolder from '../../components/Icon/IconFolder';
import IconZipFile from '../../components/Icon/IconZipFile';
import IconTxtFile from '../../components/Icon/IconTxtFile';

const ClassInfo = () => {

    const [modal21, setModal21] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [classInfo, setClassInfo] = useState({ class: {}, users: [] });
    const [targetStudentInfo, setTargetStudentInfo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState('');
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const data = await getUserInfobyId(localStorage.getItem('id'));
                console.log(data);    
                setUserInfo(data);
            } catch (error) {
                console.error('Error get UserInfo', error);
            }
        };
        getUserInfo();
    }, []);

    useEffect(() => {
        const fetchSubject = async () => {
            try { 
                const data = await getSubjectList();
                console.log(data);
            } catch (error) {
                console.error('Error fetching student list:', error);
            }
        };
        fetchSubject();
    }, []);
    
    useEffect(() => {
        const fetchNoticeData = async () => {
            try {
                const data = await getSchoolNotice(localStorage.getItem('TargetStudent'));
                setNoticeList(data);
                console.log(data);    
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchNoticeData();
    }, []);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const data = await getClassInfo(localStorage.getItem('classId'));
                console.log(data);    
                setClassInfo(data);
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };
        fetchClassData();
    }, []);

    const handleChange = (userId : string) => {
        setTargetStudent(userId);
        console.log(targetStudent);
    }
     
    return (
        <div>
            <ul className="flex space-x-2 y-3 rtl:space-x-reverse">
                <li>
                    <Link to="/teacher/home" className="text-primary hover:underline">
                        교사
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>반 관리</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>기본 정보</span>
                </li>
            </ul>
            <div className="active pt-5">
                <div>
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-5">학급 기본정보</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name">학년</label>
                                    <div className="form-input">{classInfo.class.grade}</div>
                                </div>
                                <div>
                                    <label htmlFor="sex">반</label>
                                    <div className="form-input">{classInfo.class.inClass}</div>
                                </div>
                                <div>
                                    <label htmlFor="id">담임</label>
                                    <div className="form-input">{userInfo.name}</div>
                                </div>
                                <div>
                                    <label htmlFor="phone">담임 연락처</label>
                                    <div className="form-input" >{userInfo.phoneNumber}</div>
                                </div>
                                <div>
                                    <label htmlFor="email">학생 목록</label>
                                    <div className="form-input" >
                                    <div className="table-responsive mb-5">
                                        <table className="table-hover">
                                            <thead>
                                                <tr className="!bg-transparent dark:!bg-transparent">
                                                    <th>유저 ID</th>
                                                    <th>ID</th>
                                                    <th>이름</th>
                                                    <th className="text-center"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {classInfo.users.map((data) => {
                                                return (
                                                    <tr key={data.userId}>
                                                        <td>{data.userId}</td>
                                                        <td>
                                                            <div className="whitespace-nowrap">{data.userName}</div>
                                                        </td>
                                                        <td>{data.name}</td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ClassInfo;