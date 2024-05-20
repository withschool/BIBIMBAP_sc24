import { Tab } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import { mappingStudent, listingStudent, getStudentInfoById } from '../../service/parent';
import { getSchoolNotice, getSchoolNoticeDetail, getSchoolInfo } from '../../service/school';
import { getClassInfo } from '../../service/class';
import { getSubjectList } from '../../service/subject';
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

const SubjectInfo = () => {

    const [modal21, setModal21] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [targetStudentInfo, setTargetStudentInfo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState('');

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
        const fetchStudents = async () => {
            try { 
                const data = await listingStudent();
                setStudentList(data);
            } catch (error) {
                console.error('Error fetching student list:', error);
            }
        };
        fetchStudents();
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
                setClassInfo(data);
                console.log(data);    
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
                        학부모
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>기본 정보</span>
                </li>
            </ul>
            <div className="active pt-5">
                <div>
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-5">학교 기본정보</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name">학교명</label>
                                    <div className="form-input"></div>
                                </div>
                                <div>
                                    <label htmlFor="sex">소속 교육청</label>
                                    <div className="form-input"></div>
                                </div>
                                <div>
                                    <label htmlFor="id">주소</label>
                                    <div className="form-input" ></div>
                                </div>
                                <div>
                                    <label htmlFor="phone">공립/사립</label>
                                    <div className="form-input" ></div>
                                </div>
                                <div>
                                    <label htmlFor="email">학교 홈페이지</label>
                                    <div className="form-input" >
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email">공학여부</label>
                                    <div className="form-input" ></div>
                                </div>
                                <div>
                                    <label htmlFor="email">학교 전화번호</label>
                                    <div className="form-input" ></div>
                                </div>
                                <div>
                                    <label htmlFor="email">학교 팩스번호</label>
                                    <div className="form-input" ></div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default SubjectInfo;