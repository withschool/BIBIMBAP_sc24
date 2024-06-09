import { Tab } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import { mappingStudent, listingStudent, getStudentInfoById } from '../../service/parent';
import { getSchoolNotice, getSchoolNoticeDetail, getSchoolInfo } from '../../service/school';
import { getClassInfo } from '../../service/class';
import { getSubjectList, getSubjectInfo } from '../../service/subject';
import IconZipFile from '../../components/Icon/IconZipFile';
import IconTxtFile from '../../components/Icon/IconTxtFile';

interface Subject {
    subjectName: string;
    year: string;
    grade: string;
    semester: string;
}

interface SubjectInfo {
    subject: Subject;
    students: Array<{ userId: string; userName: string; name: string }>;
}

const SubjectInfo = () => {
    const [subjectInfo, setSubjectInfo] = useState<SubjectInfo>({
        subject: { subjectName: '', year: '', grade: '', semester: '' },
        students: []
    });


    const [modal21, setModal21] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [targetStudentInfo, setTargetStudentInfo] = useState('');
    const [targetSubject, setTargetSubject] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState('');

    useEffect(() => {
        const fetchSubjectList = async () => {
            try { 
                const data = await getSubjectList();
                setSubjectList(data);
                console.log(data[0].subjectId);
                setTargetSubject(localStorage.getItem("targetSubject") || '');
            } catch (error) {
                console.error('Error fetching subject list:', error);
            }
        };
        fetchSubjectList();
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
        const fetchSubjectData = async () => {
            try {
                if(targetSubject){
                    const data = await getSubjectInfo(targetSubject);
                    console.log(data);    
                    setSubjectInfo(data);
                }
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };
        fetchSubjectData();
    }, [targetSubject]); 
     
    return (
        <div>
            <ul className="flex space-x-2 y-3 rtl:space-x-reverse">
                <li>
                    <Link to="/teacher/home" className="text-primary hover:underline">
                        교사
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>과목 관리</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>기본 정보</span>
                </li>
            </ul>
            <div className="active pt-5">
                <div>
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-5">과목 기본정보</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="subjectName">과목명</label>
                                    <div className="form-input">{subjectInfo.subject.subjectName}</div>
                                </div>
                                <div>
                                    <label htmlFor="year">학년도</label>
                                    <div className="form-input">{subjectInfo.subject.year}</div>
                                </div>
                                <div>
                                    <label htmlFor="grade">학년</label>
                                    <div className="form-input">{subjectInfo.subject.grade}</div>
                                </div>
                                <div>
                                    <label htmlFor="semester">학기</label>
                                    <div className="form-input">{subjectInfo.subject.semester}</div>
                                </div>
                                <div>
                                    <label htmlFor="email">수강 학생</label>
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
                                            {subjectInfo.students.map((data) => {
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

export default SubjectInfo;