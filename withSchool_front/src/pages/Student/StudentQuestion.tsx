import { useState, useEffect, Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getCounselInfo, getTeacherListStudent, registerCounsel, deleteCounsel} from '../../service/counsel';
import { getUserInfobyPK } from '../../service/auth';
import IconClipboardText from '../../components/Icon/IconClipboardText';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconThumbUp from '../../components/Icon/IconThumbUp';
import IconStar from '../../components/Icon/IconStar';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconSquareRotated from '../../components/Icon/IconSquareRotated';
import IconPlus from '../../components/Icon/IconPlus';
import IconSearch from '../../components/Icon/IconSearch';
import IconMenu from '../../components/Icon/IconMenu';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconX from '../../components/Icon/IconX';
import IconRestore from '../../components/Icon/IconRestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createQuestion } from '../../service/question';


const StudentQuestion = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('학생 상담'));
    });
    const defaultParams = {
        id: null,
        title: '',
        teacher: 0,
        date: '',
    };

    const [selectedTab, setSelectedTab] = useState('');
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [viewTaskModal, setViewTaskModal] = useState(false);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        const fetchCounsels = async () => {
            try {
                const counsels = await getCounselInfo();
                setAllTasks(counsels);
            } catch (error) {
                console.error("Failed to fetch counsels:", error);
            }
        };

        fetchCounsels();
    }, [allTasks]);

    const [teacherList, setTeacherList] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState<any>();
    const [teacherId, setTeacherId] = useState<any>();
    const [teacherName, setTeacherName] = useState('');

    const handleTeacherId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setTeacherId(event.target.value);
    }

    const findTeacherName = async (teacherId: number) => {
        const teacherInfo = await getUserInfobyPK(teacherId);
        setTeacherName(teacherInfo.name);
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teachers = await getTeacherListStudent();
                setTeacherList(teachers);
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            }
        };
        fetchTeachers();
    }, []);

    const tryCreateQuestion = async () => {
        try {
            const newQuestion = await createQuestion(params.title);
            if (newQuestion) {
                console.log('Question created successfully:', newQuestion);
                // 추가적인 로직이 필요하다면 여기에 작성
            }
        } catch (error) {
            console.error('Failed to create question:', error);
        }
    };

    const [searchTask, setSearchTask] = useState<any>('');
    const [selectedTask, setSelectedTask] = useState<any>(defaultParams);
    const [isPriorityMenu] = useState<any>(null);
    const [isTagMenu] = useState<any>(null);

    const [pager] = useState<any>({
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    });

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };


    const tabChanged = () => {
        setIsShowTaskMenu(false);
    };

    const deleteTask = (counselId : number) => {
        deleteCounsel(counselId);
        alert("삭제 완료!");
    }

    const viewTask = (item: any = null) => {
        setSelectedTask(item);
        findTeacherName(item.answererId);
        setTimeout(() => {
            setViewTaskModal(true);
        });
    };

    const addEditTask = (task: any = null) => {
        setIsShowTaskMenu(false);
        let json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (task) {
            let json1 = JSON.parse(JSON.stringify(task));
            setParams(json1);
        }
        setAddTaskModal(true);
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div
                    className={`panel p-4 flex-none w-[240px] max-w-full absolute xl:relative z-10 space-y-4 xl:h-auto h-full xl:block ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none hidden ${isShowTaskMenu && '!block'
                        }`}
                >
                    <div className="flex flex-col h-full pb-16">
                        <div className="pb-5">
                            <div className="flex text-center items-center">
                                <div className="shrink-0">
                                    <IconClipboardText />
                                </div>
                                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">학생 상담</h3>
                            </div>
                        </div>
                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] mb-5"></div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === '' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconListCheck className="w-4.5 h-4.5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">전체</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                       
                                    </div>
                                </button>
                                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                            </div>
                        </PerfectScrollbar>
                        <div className="ltr:left-0 rtl:right-0 absolute bottom-0 p-4 w-full">
                            <button className="btn btn-primary w-full" type="button" onClick={() => addEditTask()}>
                                <IconPlus className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                상담 신청하기
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden ${isShowTaskMenu && '!block xl:!hidden'}`} onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}></div>
                <div className="panel p-0 flex-1 overflow-auto h-full">
                    <div className="flex flex-col h-full">
                        <div className="p-4 flex sm:flex-row flex-col w-full sm:items-center gap-4">
                            <div className="ltr:mr-3 rtl:ml-3 flex items-center">
                                <button type="button" className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}>
                                    <IconMenu />
                                </button>
                                <div className="relative group flex-1">
                                    <input
                                        type="text"
                                        className="form-input peer ltr:!pr-10 rtl:!pl-10"
                                        placeholder="상담 검색"
                                        value={searchTask}
                                        onChange={(e) => setSearchTask(e.target.value)}
                                    />
                                    <div className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                        <IconSearch />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {allTasks.length ? (
                            <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                <table className="table-hover">
                                    <tbody>
                                        {allTasks.map((task: any) => {
                                            return (
                                                <tr className={`group cursor-pointer ${task.counselState == 1 ? 'bg-white-light/30 dark:bg-[#1a2941]' : ''} ${task.counselState == 2 ? 'line-through' : ''}`} key={task.counselId}>
                                                    <td className="w-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`chk-${task.counselId}`}
                                                            className={`form-checkbox${task.counselState === 1 ? ' checked:bg-gray-700' : ''} disabled:opacity-50`}
                                                            disabled={true}
                                                            defaultChecked={task.counselState === 1}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div onClick={() => viewTask(task)}>
                                                            <div className={`group-hover:text-primary font-semibold text-base whitespace-nowrap ${task.counselState}`}>
                                                                {task.category}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="w-1">
                                                    {task.schedule && (
                                                            <p className={`whitespace-nowrap text-white-dark font-medium`}>상담 일시 : {task.schedule[0]}년 {task.schedule[1]}월 {task.schedule[2]}일</p>
                                                    )}
                                                    </td>
                                                    <td className="w-1">
                                                        <div className="flex items-center justify-between w-max ltr:ml-auto rtl:mr-auto">
                                                            <div className="ltr:mr-2.5 rtl:ml-2.5 flex-shrink-0">
                                                                {task.path && (
                                                                    <div>
                                                                        <img src={`/assets/images/${task.path}`} className="h-8 w-8 rounded-full object-cover" alt="avatar" />
                                                                    </div>
                                                                )}
                                                                {!task.path && task.teacherId ? (
                                                                    <div className="grid place-content-center h-8 w-8 rounded-full bg-primary text-white text-sm font-semibold">
                                                                        {task.teacherId.charAt(0) + '' + task.teacherId.charAt(task.teacherId.indexOf(' ') + 1)}
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {!task.path && !task.teacherId ? (
                                                                    <div className="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-8 w-8">
                                                                        <IconUser className="w-4.5 h-4.5" />
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                            <div className="dropdown">
                                                                <Dropdown
                                                                    offset={[0, 5]}
                                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                    btnClassName="align-middle"
                                                                    button={<IconHorizontalDots className="rotate-90 opacity-70" />}
                                                                >
                                                                    <ul className="whitespace-nowrap">
                                                                        {selectedTab !== 'trash' && (
                                                                            <>
                                                                                <li>
                                                                                    <button type="button" onClick={() => addEditTask(task.counselId)}>
                                                                                        <IconPencilPaper className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        수정
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button" onClick={() => deleteTask(task.counselId)}>
                                                                                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        삭제
                                                                                    </button>
                                                                                </li>
                                                                            </>
                                                                        )}
                                                                    </ul>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">상담이 없습니다.</div>
                        )}
                    </div>
                </div>

                <Transition appear show={addTaskModal} as={Fragment}>
                    <Dialog as="div" open={addTaskModal} onClose={() => setAddTaskModal(false)} className="relative z-[51]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[black]/60" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => setAddTaskModal(false)}
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            {params.id ? '상담 수정' : '상담 신청'}
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-5">
                                                <label htmlFor="title">제목</label>
                                                <input id="title" type="text" placeholder="상담 제목을 입력해 주세요." className="form-input" value={params.title} onChange={(e) => changeValue(e)}/>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="assignee">대상</label>
                                                <select className="form-select" value={teacherId} onChange={(e) => handleTeacherId(e)}>
                                                {teacherList.length > 0 ? (
                                                    teacherList.map((teacher) => (
                                                        <option key={teacher.userId} value={teacher.userId}>
                                                            {teacher.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                <option>상담 가능한 선생님이 없습니다.</option>
                                                )}
                                                </select>
                                            </div>
                                            <div className="mb-5 flex justify-between gap-4">
                                                <div className="flex-1">
                                                    <label htmlFor="tag">상담일자</label>
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={(date : any) => setSelectedDate(date)}
                                                        dateFormat="yyyy/MM/dd"
                                                        placeholderText="날짜를 선택하세요"
                                                        className="form-input"/>
                                                </div>
                                            </div>
                                            <div className="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddTaskModal(false)}>
                                                    취소
                                                </button>
                                                {/* <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => tryRegisterCounsel()}>
                                                    {params.id ? '저장' : '저장'}
                                                </button> */}
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={viewTaskModal} as={Fragment}>
                    <Dialog as="div" open={viewTaskModal} onClose={() => setViewTaskModal(false)} className="relative z-[51]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[black]/60" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => setViewTaskModal(false)}
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="flex items-center flex-wrap gap-2 text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">   
                                            <div>상담 세부 내용</div>
                                        </div>
                                        <div className="p-5">
                                            <div className="p-5">
                                                <div className="mb-5">
                                                    <label htmlFor="title">제목</label>
                                                    <p id="title" className="form-input">{selectedTask.category}</p>
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="assignee">대상</label>
                                                    <p id="title" className="form-input">{teacherName} 선생님</p>
                                                </div>
                                                <div className="mb-5 flex justify-between gap-4">
                                                    <div className="flex-1">
                                                        <label htmlFor="tag">상담일자</label>
                                                        {selectedTask.schedule && (
                                                            <p id="title" className="form-input">{selectedTask.schedule[0]}년 {selectedTask.schedule[1]}월 {selectedTask.schedule[2]}일</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="assigned">승인 여부</label>
                                                    {selectedTask.counselState == 0 ? ( 
                                                        <p id="title" className="form-input">신청 중</p>
                                                    ) : (<></>
                                                    )}
                                                    {selectedTask.counselState == 1 ? ( 
                                                        <p id="title" className="form-input">승인</p>
                                                    ) : (<></>
                                                    )}
                                                    {selectedTask.counselState == 2 ? ( 
                                                        <p id="title" className="form-input">반려</p>
                                                    ) : (<></>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-base prose" dangerouslySetInnerHTML={{ __html: selectedTask.description }}></div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setViewTaskModal(false)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default StudentQuestion;
