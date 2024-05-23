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

import { getClassNotice,getClassNoticeDetail, } from '../../service/form';

const ClassNotice = () => {

    // Define the type for a notice object
    interface Notice {
        noticeId: number;
        title: string;
        user: {
            name: string;
        };
        regDate: number[];
        filesURl: string[];
        // Add other properties as needed
    }

    interface NoticeDetail {
        title: string;
        type: string;
        originalName: string;
        user: {
            name: string;
        };
        content: string;
        regDate: number[];
        filesURl: { type: string; name: string; size: string }[];
    }

    // Use the type in the useState hook
    const [noticeList, setNoticeList] = useState<Notice[]>([]);

    const [modal21, setModal21] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [schoolInfo, setSchoolInfo] = useState([]);
    const [targetStudentInfo, setTargetStudentInfo] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [selectedNotice, setSelectedNotice] = useState<NoticeDetail | null>(null);

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
                const schoolId = localStorage.getItem('schoolId');
                if (schoolId) {
                    const data = await getClassNotice(Number(schoolId));
                    setNoticeList(data);
                    console.log(data);
                } else {
                    console.error('School ID is null');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchNoticeData();
    }, []);

    useEffect(() => {
        const fetchSchoolData = async () => {
            try {
                const data = await getSchoolInfo(localStorage.getItem('schoolId'));
                setSchoolInfo(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchSchoolData();
    }, []);

    const handlePopUp = async (noticeId: number) => {
        try {
            const noticeDetail = await getClassNoticeDetail(noticeId);
            setSelectedNotice(noticeDetail);
            console.log(noticeDetail);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching notice detail:', error);
        }
    };

    return (
        <div>
            <div className="panel" id="icon_pills">
                <div className="mb-5">
                    <h6 className="text-lg font-bold">반 공지 조회</h6>
                    <div className="active pt-5">
                        <div className="table-responsive mb-10">
                            {(selectedNotice === null) && (<table className="table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>제목</th>
                                        <th>작성자</th>
                                        <th className='text-center'>작성일시</th>
                                    </tr>
                                </thead>
                                {(noticeList.length === 0) ? (<h1>작성된 공지가 없습니다.</h1>) : (<></>)}
                                <tbody>
                                    {noticeList.slice().reverse().map((data, index, array) => (
                                        <tr key={data.noticeId} className="cursor-pointer" onClick={() => handlePopUp(data.noticeId)}>
                                            <td>
                                                <div className="whitespace-nowrap">{data.title}</div>
                                            </td>
                                            <td>{data.user.name}</td>
                                            <td className='text-center'>{data.regDate[0]}년 {data.regDate[1]}월 {data.regDate[2]}일 {data.regDate[3]}:{String(data.regDate[4]).padStart(2, '0')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>)}
                            {(selectedNotice !== null) && (
                                <div>
                                    <div className="flex items-center justify-between flex-wrap p-4">
                                        <div className="flex items-center">
                                            <button type="button" className="ltr:mr-2 rtl:ml-2 hover:text-primary" onClick={() => setSelectedNotice(null)}>
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
                                        {(selectedNotice.filesURl) && (
                                            <div className="mt-8">
                                                <br />
                                                <div className="text-base mb-4">Attachments</div>
                                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                                                <div className="flex items-center flex-wrap mt-6">
                                                    {selectedNotice.filesURl.map((attachment: any, i: number) => {
                                                        return (
                                                            <a
                                                                href={attachment}
                                                                key={i}
                                                                type="button"
                                                                className="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-white-light dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group"
                                                            >
                                                                {attachment.type === 'image' && <IconGallery />}
                                                                {attachment.type === 'folder' && <IconFolder />}
                                                                {attachment.type === 'zip' && <IconZipFile />}
                                                                {attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder' && <IconTxtFile className="w-5 h-5" />}

                                                                <div className="ltr:ml-3 rtl:mr-3">
                                                                    <p className="text-xs text-primary font-semibold">{selectedNotice.originalName}</p>
                                                                    <p className="text-[11px] text-gray-400 dark:text-gray-600">{attachment.size}</p>
                                                                </div>
                                                                <div className="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block"></div>
                                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10">
                                                                    <IconDownload className="w-4.5 h-4.5" />
                                                                </div>
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ClassNotice;