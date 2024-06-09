import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getLectureNoteList, createLectureNote, updateLectureNote, deleteLectureNote, getStudentList, enrollScore} from '../../service/subject';
import IconNotes from '../../components/Icon/IconNotes';
import IconNotesEdit from '../../components/Icon/IconNotesEdit';
import IconStar from '../../components/Icon/IconStar';
import IconSquareRotated from '../../components/Icon/IconSquareRotated';
import IconPlus from '../../components/Icon/IconPlus';
import IconMenu from '../../components/Icon/IconMenu';
import IconUser from '../../components/Icon/IconUser';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconEye from '../../components/Icon/IconEye';
import IconX from '../../components/Icon/IconX';
import IconGallery from '../../components/Icon/IconGallery';
import IconFolder from '../../components/Icon/IconFolder';
import IconZipFile from '../../components/Icon/IconZipFile';
import IconDownload from '../../components/Icon/IconDownload';
import IconTxtFile from '../../components/Icon/IconTxtFile';
import { C } from '@fullcalendar/core/internal-common';

const Score = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('성적 관리'));
    });
    const [studentList, setStudentList] = useState([]);

const navigate = useNavigate();

const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);


useEffect(() => {
    const fetchLectureNote = async () => {
        try {
            const studentList = await getStudentList(localStorage.getItem("targetSubject"));
            setStudentList(studentList);
        } catch (error) {
            console.error("Failed to fetch lectureNotes:", error);
        }
    };
    fetchLectureNote();
}, []);

    const defaultParams = { subjectLectureNoteId: null, title: '', description: '', tag: '', name: '', thumb: '' };
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [isDeleteNoteModal, setIsDeleteNoteModal] = useState<any>(false);
    const [isShowNoteMenu, setIsShowNoteMenu] = useState<any>(false);
    const [isViewNoteModal, setIsViewNoteModal] = useState<any>(false);
    const [filterdNotesList, setFilterdNotesList] = useState<any>([]);
    const [selectedTab, setSelectedTab] = useState<any>('');
    const [deletedNote, setDeletedNote] = useState<any>(null);
    const [prevTempScores, setPrevTempScores] = useState('');
    
    type TempScores = {
        [key: string]: string;
      };

    const [tempMidScores, setTempMidScores] = useState<TempScores>({});
    const [tempFinalScores, setTempFinalScores] = useState<TempScores>({});
    const [tempActivityScores, setTempActivityScores] = useState<TempScores>({});

    const searchNotes = () => {
        if (selectedTab !== 'fav') {
            if (selectedTab !== 'mid' || selectedTab === 'final') {
            } else {
                setFilterdNotesList(studentList);
            }
        } else {
        }
    };

    const tabChanged = (type: string) => {
        setSelectedTab(type);
        setIsShowNoteMenu(false);
        searchNotes();
    };
  
    const handleMidSubmit = () => {
        console.log(tempMidScores);
        const transformedObject = Object.keys(tempMidScores).map(key => ({
            studentSubjectId: parseInt(key),
            score: parseInt(tempMidScores[parseInt(key)])
        }));
        console.log(transformedObject);
        try{
            enrollScore("mid", transformedObject);
            alert("성적이 등록되었습니다");
        }
        catch(error){
            alert("유효하지 않은 입력값입니다.");
        }
    }

    const handleFinalSubmit = () => {
        console.log(tempFinalScores);
        const transformedObject = Object.keys(tempFinalScores).map(key => ({
            studentSubjectId: parseInt(key),
            score: parseInt(tempFinalScores[parseInt(key)])
        }));
        console.log(transformedObject);
        enrollScore("final", transformedObject);
        alert("성적이 등록되었습니다");
    }

    const handleActivitySubmit = () => {
        console.log(tempActivityScores);
        const transformedObject = Object.keys(tempActivityScores).map(key => ({
            studentSubjectId: parseInt(key),
            score: parseInt(tempActivityScores[parseInt(key)])
        }));
        console.log(transformedObject);
        enrollScore("activity", transformedObject);
        alert("성적이 등록되었습니다");
    }

    interface Student {
        userId: number;
        userName: string;
        midtermScore: string;
        finalScore: string;
        activityScore: string;
    }

    const fetchMidScore = () => {
        const initialTempScores: { [key: string]: string } = {};
        studentList.forEach((student : any) => {
            initialTempScores[student.studentSubjectId] = student.midtermScore;
        });
        setTempMidScores(initialTempScores);
    }

    const fetchFinalScore = () => {
        const initialTempScores: { [key: string]: string } = {};
        studentList.forEach((student : any) => {
            initialTempScores[student.studentSubjectId] = student.finalScore;
        });
        setTempFinalScores(initialTempScores);
    }

    const fetchActivityScore = () => {
        const initialTempScores: { [key: string]: string } = {};
        studentList.forEach((student : any) => {
            initialTempScores[student.studentSubjectId] = student.activityScore;
        });
        setTempActivityScores(initialTempScores);
    }

    useEffect(() => {
        if (studentList.length > 0) {
            fetchMidScore();
            fetchFinalScore();
            fetchActivityScore();
        }
    }, [studentList]);

    const handleMidScoreChange = (studentSubjectId : any, newScore : any) => {
        setTempMidScores((prevTempScores : any) => ({
            ...prevTempScores,
            [studentSubjectId]: newScore
        }));
    };

    const handleFinalScoreChange = (studentSubjectId : any, newScore : any) => {
        setTempFinalScores((prevTempScores : any) => ({
            ...prevTempScores,
            [studentSubjectId]: newScore
        }));
    };

    const handleActivityScoreChange = (studentSubjectId : any, newScore: any) => {
        setTempActivityScores((prevTempScores: any) => ({
            ...prevTempScores,
            [studentSubjectId]: newScore
        }));
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    useEffect(() => {
        searchNotes();
    }, [selectedTab, studentList]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className={`bg-black/60 z-10 w-full h-full rounded-md absolute hidden ${isShowNoteMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}></div>
                <div
                    className={`panel
                    p-4
                    flex-none
                    w-[240px]
                    absolute
                    xl:relative
                    z-10
                    space-y-4
                    h-full
                    xl:h-auto
                    hidden
                    xl:block
                    ltr:lg:rounded-r-md ltr:rounded-r-none
                    rtl:lg:rounded-l-md rtl:rounded-l-none
                    overflow-hidden ${isShowNoteMenu ? '!block h-full ltr:left-0 rtl:right-0' : 'hidden shadow'}`}
                >
                    <div className="flex flex-col h-full pb-16">
                        <div className="flex text-center items-center">
                            <div className="shrink-0">
                                <IconNotes />
                            </div>
                            <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">성적 입력</h3>
                        </div>

                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] my-4"></div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2  hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'mid' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('mid')}
                                >
                                    <div className="flex items-center">
                                        <IconNotesEdit className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">중간고사</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2  hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'final' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('final')}
                                >
                                    <div className="flex items-center">
                                        <IconNotesEdit className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">기말고사</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2  hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'activity' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('activity')}
                                >
                                    <div className="flex items-center">
                                        <IconNotesEdit className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">수행평가</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2  hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'total' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('total')}
                                >
                                    <div className="flex items-center">
                                        <IconNotesEdit className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">점수 조회</div>
                                    </div>
                                </button>
                                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                                
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
                <div className="panel flex-1 overflow-auto h-full">
                    <div className="pb-5">
                        <button type="button" className="xl:hidden hover:text-primary" onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}>
                            <IconMenu />
                        </button>
                    </div>
                    {filterdNotesList.length && selectedTab == "mid" ? (
                            <div className="table-responsive mb-5">
                            <p className='text-lg font-semibold ltr:ml-3 rtl:mr-3 pb-5'>중간고사 성적입력</p>
                            <table className="table-striped">
                                <thead>
                                    <tr>
                                        <th className="w-1/3">ID</th>
                                        <th className="w-1/3">이름</th>
                                        <th className="w-1/3 text-center">중간고사 성적</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentList.map((data : any) => {
                                        return (
                                            <tr key={data.studentSubjectId}>
                                                <td className="w-1/3">
                                                    <div className="whitespace-nowrap">{data.userId}</div>
                                                </td>
                                                <td className="w-1/3">
                                                    <div className="whitespace-nowrap">{data.userName}</div>
                                                </td>
                                                <td className="w-1/3 text-center">
                                                    <input
                                                        type="number"
                                                        className="w-10"
                                                        value={tempMidScores[data.studentSubjectId] || ''}
                                                        onChange={(e) => handleMidScoreChange(data.studentSubjectId, e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <button className="mt-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleMidSubmit}>제출</button>
                        </div>
                    ) : (
                        <div>
                        {filterdNotesList.length && selectedTab == "final" ? (
                            <div className="table-responsive mb-5">
                            <p className='text-lg font-semibold ltr:ml-3 rtl:mr-3 pb-5'>기말고사 성적입력</p>
                            <table className="table-striped">
                                <thead>
                                    <tr>
                                        <th className="w-1/3">ID</th>
                                        <th className="w-1/3">이름</th>
                                        <th className="w-1/3 text-center">기말고사 성적</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentList.map((data : any) => {
                                        return (
                                            <tr key={data.studentSubjectId}>
                                                <td className="w-1/3">
                                                    <div className="whitespace-nowrap">{data.userId}</div>
                                                </td>
                                                <td className="w-1/3">
                                                    <div className="whitespace-nowrap">{data.userName}</div>
                                                </td>
                                                <td className="w-1/3 text-center">
                                                    <input
                                                        type="number"
                                                        className="w-10"
                                                        value={tempFinalScores[data.studentSubjectId] || ''}
                                                        onChange={(e) => handleFinalScoreChange(data.studentSubjectId, e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <button className="mt-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleFinalSubmit}>제출</button>
                        </div>
                        
                        ) : (
                            <div>
                                {filterdNotesList.length && selectedTab == "activity" ? (
                                    <div className="table-responsive mb-5">
                                    <p className='text-lg font-semibold ltr:ml-3 rtl:mr-3 pb-5'>수행평가 성적입력</p>
                                    <table className="table-striped">
                                        <thead>
                                            <tr>
                                                <th className="w-1/3">ID</th>
                                                <th className="w-1/3">이름</th>
                                                <th className="w-1/3 text-center">수행평가 성적</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentList.map((data : any) => {
                                                return (
                                                    <tr key={data.studentSubjectId}>
                                                        <td className="w-1/3">
                                                            <div className="whitespace-nowrap">{data.userId}</div>
                                                        </td>
                                                        <td className="w-1/3">
                                                            <div className="whitespace-nowrap">{data.userName}</div>
                                                        </td>
                                                        <td className="w-1/3 text-center">
                                                            <input
                                                                type="number"
                                                                className="w-10"
                                                                value={tempActivityScores[data.studentSubjectId] || ''}
                                                                onChange={(e) => handleActivityScoreChange(data.studentSubjectId, e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <button className="mt-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleActivitySubmit}>제출</button>
                                </div>
                                
                                ) : (
                                    <div>
                                        {filterdNotesList.length && selectedTab == "total" ? (
                                            <div className="table-responsive mb-5">
                                            <p className='text-lg font-semibold ltr:ml-3 rtl:mr-3 pb-5'>전체 점수 조회</p>
                                            <table className="table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="w-1/6">ID</th>
                                                        <th className="w-1/6">이름</th>
                                                        <th className="w-1/6 text-center">중간고사</th>
                                                        <th className="w-1/6 text-center">기말고사</th>
                                                        <th className="w-1/6 text-center">수행평가</th>
                                                        <th className="w-1/6 text-center">총점</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {studentList.map((data : any) => {
                                                        return (
                                                            <tr key={data.studentSubjectId}>
                                                                <td className="w-1/6">
                                                                    <div className="whitespace-nowrap">{data.userId}</div>
                                                                </td>
                                                                <td className="w-1/6">
                                                                    <div className="whitespace-nowrap">{data.userName}</div>
                                                                </td>
                                                                <td className="w-1/6 text-center">
                                                                    <div className="whitespace-nowrap">{data.midtermScore}</div>
                                                                </td>
                                                                <td className="w-1/6 text-center">
                                                                    <div className="whitespace-nowrap">{data.finalScore}</div>
                                                                </td>
                                                                <td className="w-1/6 text-center">
                                                                    <div className="whitespace-nowrap">{data.activityScore}</div>
                                                                </td>
                                                                <td className="w-1/6 text-center">
                                                                    <div className="whitespace-nowrap">{data.totalScore}</div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    
                                    ) : (
                                    <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">시험 종류를 선택해주세요.</div>
                                    )}
                                    </div>
                                )}
                            </div>
                        )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Score;
