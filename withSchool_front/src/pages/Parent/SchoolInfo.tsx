import { Tab } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import { mappingStudent, listingStudent, getStudentInfoById } from '../../service/parent';
import { getSchoolNotice, getSchoolNoticeDetail, getSchoolInfo } from '../../service/school';
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

const SchoolInfo = () => {

    const [modal21, setModal21] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [schoolInfo, setSchoolInfo] = useState<any>([]);
    const [targetStudentInfo, setTargetStudentInfo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [targetStudent, setTargetStudent] = useState('');
    const [selectedNotice, setSelectedNotice] = useState<any>('');

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
        const fetchSchoolData = async () => {
            try {
                const data = await getSchoolInfo(localStorage.getItem('TargetStudent'));
                setSchoolInfo(data);
                console.log(data);    
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchSchoolData();
    }, []);

    const handlePopUp = async (noticeId : number) => {
        try {
            const noticeDetail = await getSchoolNoticeDetail(noticeId);
            setSelectedNotice(noticeDetail);
            console.log(noticeDetail);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching notice detail:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedNotice('');
    };

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
     
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/parent-home" className="text-primary hover:underline">
                        학부모
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>학교 정보</span>
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
                                        학교 공지사항
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
                                        반 공지사항
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
                                        학사일정
                                    </button>
                                )}
                            </Tab>
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
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    {(studentList.length === 0) ? (
                                        <><h1>연결된 학생이 없습니다.</h1></>
                                    ) : (
                                        <div className="table-responsive mb-10">
                                            {(noticeList.length === 0) ? (<h1>작성된 공지가 없습니다.</h1>) : (<></>)}
                                            {(selectedNotice == '') &&(<table className="table-hover text-center">
                                                <thead>
                                                    <tr>
                                                        <th>제목</th>
                                                        <th>작성자</th>
                                                        <th>작성일시</th>
                                                        <th className="text-center">파일</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {noticeList.slice().reverse().map((data: any, index, array) => (
                                                        <tr key={data.id} className="cursor-pointer" onClick={() => handlePopUp(array.length - index)}>
                                                            <td>
                                                                <div className="whitespace-nowrap">{data.title}</div>
                                                            </td>
                                                            <td>{data.user.name}</td>
                                                            <td>{data.regDate[0]}년 {data.regDate[1]}월 {data.regDate[2]}일 {data.regDate[3]}:{String(data.regDate[4]).padStart(2, '0')}</td>
                                                            <td className="text-center">
                                                                {(data.filesURL != null)
                                                                    ? (<Tippy content="파일 다운로드">
                                                                        <button type="button">
                                                                            <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                                                        </button>
                                                                    </Tippy>) : (<></>)
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>)}
                                            {(selectedNotice != '') && (
                                                <div>
                                                    <div className="flex items-center justify-between flex-wrap p-4">
                                                        <div className="flex items-center">
                                                            <button type="button" className="ltr:mr-2 rtl:ml-2 hover:text-primary" onClick={() => setSelectedNotice('')}>
                                                                <IconArrowLeft className="w-5 h-5 rotate-180" />
                                                            </button>
                                                            <h4 className="text-base md:text-lg font-medium ltr:mr-2 rtl:ml-2">{selectedNotice.title}</h4>
                                                            <div className="badge bg-info hover:top-0">{selectedNotice.type}</div>
                                                        </div>
                                                        <div>
                                                            <Tippy content="Print">
                                                                <button type="button">
                                                                    <IconPrinter />
                                                                </button>
                                                            </Tippy>
                                                        </div>
                                                    </div>
                                                    <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                                                    <div className="p-4 relative">
                                                    <div className="flex flex-wrap">
                                                        <div className="ltr:mr-2 rtl:ml-2 flex-1">
                                                            <div className="flex items-center justify-end">
                                                                <div className="text-sm ltr:mr-2 rtl:ml-4 whitespace-nowrap">
                                                                    작성자: {selectedNotice.user.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-2xl mb-4" dangerouslySetInnerHTML={{ __html: selectedNotice.content }}></div>
                                                    <p>{selectedNotice.user.name}님이 공지함</p>
                                                    <p>
                                                        {selectedNotice.regDate[0]}년 {selectedNotice.regDate[1]}월 {selectedNotice.regDate[2]}일 {selectedNotice.regDate[3]}시 {selectedNotice.regDate[4]}분 게시됨
                                                    </p>
                                                        {selectedNotice.filesURI && (
                                                            <div className="mt-8">
                                                                <div className="text-base mb-4">Attachments</div>
                                                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                                                                <div className="flex items-center flex-wrap mt-6">
                                                                    {selectedNotice.filesURI.map((attachment: any, i: number) => {
                                                                        return (
                                                                            <button
                                                                                key={i}
                                                                                type="button"
                                                                                className="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-white-light dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group"
                                                                            >
                                                                                {attachment.type === 'image' && <IconGallery />}
                                                                                {attachment.type === 'folder' && <IconFolder />}
                                                                                {attachment.type === 'zip' && <IconZipFile />}
                                                                                {attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder' && <IconTxtFile className="w-5 h-5" />}

                                                                                <div className="ltr:ml-3 rtl:mr-3">
                                                                                    <p className="text-xs text-primary font-semibold">{attachment.name}</p>
                                                                                    <p className="text-[11px] text-gray-400 dark:text-gray-600">{attachment.size}</p>
                                                                                </div>
                                                                                <div className="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block"></div>
                                                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10">
                                                                                    <IconDownload className="w-4.5 h-4.5" />
                                                                                </div>
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                            </div>
                                            )}
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
                                <div className="active pt-5">
                                    { (studentList.length == 0) ? (
                                        <><h1>연결된 학생이 없습니다.</h1></>
                                    ):(
                                        <div>
                                            <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                                                <h6 className="text-lg font-bold mb-5">학교 기본정보</h6>
                                                <div className="flex flex-col sm:flex-row">
                                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                        <div>
                                                            <label htmlFor="name">학교명</label>
                                                            <div className="form-input">{schoolInfo.SCHUL_NM}</div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="sex">소속 교육청</label>
                                                            <div className="form-input">{schoolInfo.ATPT_OFCDC_SC_NM}</div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="id">주소</label>
                                                            <div className="form-input" >{schoolInfo.ORG_RDNMA}</div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="phone">공립/사립</label>
                                                            <div className="form-input" >{schoolInfo.FOND_SC_NM}</div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email">학교 홈페이지</label>
                                                            <div className="form-input" >
                                                            <a href={schoolInfo.HMPG_ADRES} target="_blank" rel="noopener noreferrer">
                                                                {schoolInfo.HMPG_ADRES}
                                                            </a>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email">공학여부</label>
                                                            <div className="form-input" >{schoolInfo.COEDU_SC_NM}</div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email">학교 전화번호</label>
                                                            <div className="form-input" >{schoolInfo.ORG_TELNO}</div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email">학교 팩스번호</label>
                                                            <div className="form-input" >{schoolInfo.ORG_FAXNO}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        )}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );

}

export default SchoolInfo;