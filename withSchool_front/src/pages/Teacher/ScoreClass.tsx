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
import { getSugangListStudent } from '../../service/subject';
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

interface ClassInfoType {
    class: {
        grade: string;
        inClass: string;
    };
    users: Array<{ userId: string; userName: string; name: string }>;
}

interface UserInfoType {
    name: string;
    phoneNumber: string;
    userId: string;
}

const ScoreClass = () => {

    const [modal21, setModal21] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [targetStudent, setTargetStudent]  = useState('');
    const [noticeList, setNoticeList] = useState([]);
    const [targetStudentInfo, setTargetStudentInfo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState('');

    const [classInfo, setClassInfo] = useState<ClassInfoType>({
        class: { grade: '', inClass: '' },
        users: []
    });

    const [userInfo, setUserInfo] = useState<UserInfoType>({ name: '', phoneNumber: '', userId: ''});

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

    const [subjectList, setSubjectList] = useState([]);

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

    const fetchSubject = async (studentId: string) => {
        try { 
            const data = await getSugangListStudent(studentId);
            console.log(data);
            setSubjectList(data);
        } catch (error) {
            console.log(studentId);
            console.error('Error fetching student list:', error);
        }
    };
    
    const handleChangeStudent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetStudent(event.target.value);
    };
    
    useEffect(() => {
        if (targetStudent) {
            fetchSubject(targetStudent);
        }
    }, [targetStudent]);
  
     
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
                    <span>성적 조회</span>
                </li>
            </ul>
            <div className="active pt-5">
                <div>
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-5">학급 성적 조회</h6>
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
                                    <label htmlFor="email">학생 성적</label>
                                    <div className='w-1/2'>
                                        <select className="form-select flex text-white-dark mb-3" value={targetStudent} onChange={e => handleChangeStudent(e)}>
                                            <option disabled value="">학생 선택</option>
                                            {classInfo.users
                                                .filter((data: any) => data.userId !== userInfo.userId)
                                                .map((data: any) => (
                                                    <option key={data.userId} value={data.userId}>
                                                        {`${data.name} (${data.userName})`}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="form-input" >
                                    <div className="table-responsive mb-3">
                                        <table className="table-hover">
                                            <thead>
                                                <tr>
                                                    <th>과목명</th>
                                                    <th>중간고사</th>
                                                    <th>기말고사</th>
                                                    <th>수행평가</th>
                                                    <th>총점</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {subjectList.length > 0 ? (
                                                subjectList.map((data: any) => (
                                                    <tr key={data.subjectId}>
                                                        <td>
                                                            <div className="whitespace-nowrap">{data.subject}</div>
                                                        </td>
                                                        <td>{data.midtermScore}점</td>
                                                        <td>{data.finalScore}점</td>
                                                        <td>{data.activityScore}점</td>
                                                        <td>{parseInt(data.midtermScore) + parseInt(data.finalScore) + parseInt(data.activityScore)}점</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="text-center">학생을 선택해주세요</td>
                                                </tr>
                                            )}
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

export default ScoreClass;