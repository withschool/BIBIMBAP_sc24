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
import { getCounselInfo, getTeacherListStudent, registerCounsel, deleteCounsel, editCounsel} from '../../service/counsel';
import { getQnaList, getQna, makeQna, editQna, deleteQna } from '../../service/qna';
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
import { format } from 'date-fns';

const Answer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('교사 답변'));
    });
    const defaultParams = {
        id: null,
        category: '',
        teacher: 0,
        date: '',
    };
    const subjectId = localStorage.getItem("targetSubject");
    const [selectedTab, setSelectedTab] = useState('');
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [viewTaskModal, setViewTaskModal] = useState(false);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const [allTasks, setAllTasks] = useState([]);

    const fetchCounsels = async () => {
        try {
            const qnas = await getQnaList(subjectId || '');
            console.log(qnas);
            setAllTasks(qnas);
        } catch (error) {
            console.error("Failed to fetch counsels:", error);
        }
    };

    const findTeacherName = async (teacherId: number) => {
        const teacherInfo = await getUserInfobyPK(teacherId);
        setTeacherName(teacherInfo.name);
    };

    useEffect(() => {
        fetchCounsels();
    }, []);

    const [teacherList, setTeacherList] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState<any>();
    const [teacherId, setTeacherId] = useState<any>();
    const [teacherName, setTeacherName] = useState('');

    const handleTeacherId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setTeacherId(event.target.value);
    }

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

    const tryRegisterCounsel = async () => {
        try {
            if(params.subjectQuestionPostId){
                await editQna(params.subjectQuestionPostId ,'', params.answerContent);
                alert("답변되었습니다.");

            }
            else{
                console.log(params.description);
                await makeQna(params.questionContent, subjectId || '');
            }
            setAddTaskModal(false);
            setTeacherId('');
            setSelectedDate('');
            await fetchCounsels();
            window.location.reload();
        } catch (error) {
            console.error("Failed to register or edit counsel:", error);
        }
    };
    
    const [searchTask, setSearchTask] = useState<any>('');
    const [selectedTask, setSelectedTask] = useState<any>(defaultParams);
    const [isPriorityMenu] = useState<any>(null);
    const [isTagMenu] = useState<any>(null);

    const filteredTasks = allTasks.filter((task: any) => {
        const questionContentMatch = task.questionContent.toLowerCase().includes(searchTask.toLowerCase());
        return questionContentMatch;
    });

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

    const deleteTask = async (task : any) => {
        try{
            deleteQna(task.subjectQuestionPostId);
            alert("삭제 완료!");
            await fetchCounsels();
        }
        catch {
            console.error("Failed to delete counsel");
        }
    }

    const viewTask = async (item: any = null) => {
        setSelectedTask(item);
        findTeacherName(item.answererId);
        console.log(item.schedule);
        setTimeout(() => {
            setViewTaskModal(true);
        });
        await fetchCounsels();
    };

    const addEditTask = async (task: any | null) => {
        setIsShowTaskMenu(false);
        let json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (task) {
            if(!task.isAnswered){
                let json1 = JSON.parse(JSON.stringify(task));
                setParams(json1);
                setSelectedTask(json1);
            }
            else {
                alert("이미 답변 완료된 질문입니다.");
                return;
            }
        }
        setAddTaskModal(true);
    };

    function stripHtmlTags(html : any) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    function processContent(content: any) {
        const strippedContent = stripHtmlTags(content);
        const firstLine = strippedContent.split('\n')[0]; // 첫 줄만 가져오기
        if (firstLine.length > 30) {
            return firstLine.substring(0, 30) + '...'; // 최대 40자까지 표시
        }
        return firstLine;
    }

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
                                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">교사 답변</h3>
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
                                        placeholder="질문 검색"
                                        value={searchTask}
                                        onChange={(e) => setSearchTask(e.target.value)}
                                    />
                                    <div className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                        <IconSearch />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {filteredTasks.length ? (
                            <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                <table className="table-hover">
                                    <tbody>
                                        {filteredTasks.reverse().map((task: any) => (
                                            <tr
                                                className={`group cursor-pointer ${
                                                    task.isAnswered === 1 ? 'bg-white-light/30 dark:bg-[#1a2941]' : ''
                                                } `}
                                                key={task.subjectQuestionPostId}
                                            >
                                                <td className="w-1">
                                                <input
                                                   type="checkbox"
                                                   id={`chk-${task.subjectQuestionPostId}`}
                                                   className={`form-checkbox ${
                                                        task.isAnswered === 1 ? 'checked:bg-blue-700' : (task.counselState === 2 ? 'checked:bg-red-700' : '')
                                                    }`}
                                                   defaultChecked={task.isAnswered == 1}
                                                   disabled={true}
                                                />
                                                </td>
                                                <td>
                                                    <div onClick={() => viewTask(task)}>
                                                        <div
                                                            className={`group-hover:text-primary font-semibold text-base whitespace-nowrap ${task.counselState}`}
                                                            dangerouslySetInnerHTML={{ __html: processContent(task.questionContent) }}
                                                        >
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="w-full">
                                                    {task.schedule && (
                                                        <p className="whitespace-nowrap text-white-dark font-medium">
                                                            질문 일시 : {task.schedule[0]}년 {task.schedule[1]}월 {task.schedule[2]}일
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="w-full">
                                                    <p className="whitespace-nowrap text-white-dark font-medium">
                                                        질문자 : {task.questioner.name}
                                                    </p>
                                                </td>
                                                <td className="w-full">
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex items-center">
                                                            <div className="ltr:mr-2.5 rtl:ml-2.5 flex-shrink-0">
                                                                {task.path ? (
                                                                    <div>
                                                                        <img
                                                                            src={`/assets/images/${task.path}`}
                                                                            className="h-8 w-8 rounded-full object-cover"
                                                                            alt="avatar"
                                                                        />
                                                                    </div>
                                                                ) : task.teacherId ? (
                                                                    <div className="grid place-content-center h-8 w-8 rounded-full bg-primary text-white text-sm font-semibold">
                                                                        {task.teacherId.charAt(0) + '' + task.teacherId.charAt(task.teacherId.indexOf(' ') + 1)}
                                                                    </div>
                                                                ) : (
                                                                    <div className="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-8 w-8">
                                                                        <IconUser className="w-4.5 h-4.5" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex justify-end space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => addEditTask(task)}
                                                            className="flex items-center justify-center px-4 py-2 min-w-[90px] border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
                                                        >
                                                            <IconPencilPaper className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                            <span className="!no-underline">답변</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">
                                질문이 없습니다.
                            </div>
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
                                            {params.subjectQuestionPostId ? '답변하기' : '질문 신청'}
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-5">
                                                <div className='mb-5'>
                                                    <label htmlFor="category">질문 내용</label>
                                                    <p id="category" className="form-input" dangerouslySetInnerHTML={{ __html: selectedTask.questionContent }} />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="category">질문자</label>
                                                    {selectedTask.questioner ? (
                                                        <p id="category" className="form-input">{selectedTask.questioner.name}</p>
                                                    ) : (
                                                        <p id="category" className="form-input">질문자 정보가 없습니다.</p>
                                                    )}
                                                </div>
                                                <label htmlFor="category">답변 내용</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={params.answerContent || ''}
                                                    defaultValue={params.answerContent || ''}
                                                    onChange={(content, delta, source, editor) => {
                                                        params.answerContent = content;
                                                        params.displayDescription = editor.getText();
                                                        setParams({
                                                            ...params,
                                                        });
                                                    }}
                                                    style={{ minHeight: '250px' }}
                                                />
                                            </div>
                                            <div className="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddTaskModal(false)}>
                                                    취소
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => tryRegisterCounsel()}>
                                                    {params.subjectQuestionPostId ? '답변' : '저장'}
                                                </button>
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
                                            <div>질문 세부 내용</div>
                                        </div>
                                        <div className="p-5">
                                            <div className="p-5">
                                                <div className="mb-5">
                                                    <label htmlFor="category">질문 내용</label>
                                                    <p id="category" className="form-input" dangerouslySetInnerHTML={{ __html: selectedTask.questionContent }} />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="category">질문자</label>
                                                    {selectedTask.questioner ? (
                                                        <p id="category" className="form-input">{selectedTask.questioner.name}</p>
                                                    ) : (
                                                        <p id="category" className="form-input">질문자 정보가 없습니다.</p>
                                                    )}
                                                </div>
                                                <div className='mb-5'>
                                                <label htmlFor="category">답변 내용</label>
                                                    {selectedTask.answerContent ? (
                                                        <p id="category" className="form-input" dangerouslySetInnerHTML={{ __html: selectedTask.answerContent }} />
                                                    ) : (
                                                        <p id="category" className="form-input">아직 답변하지 않았습니다.</p>
                                                    )}
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="assigned">답변 여부</label>
                                                    {selectedTask.isAnswered == 0 ? ( 
                                                        <p id="category" className="form-input">답변 대기</p>
                                                    ) : (<></>
                                                    )}
                                                    {selectedTask.isAnswered == 1 ? ( 
                                                        <p id="category" className="form-input">답변 완료</p>
                                                    ) : (<></>
                                                    )}
                                                </div>
                                                {selectedTask.isAnswered == 1 ? ( 
                                                       <div className="mb-2">
                                                       <label htmlFor="assigned">답변 선생님</label>
                                                       <p id="category" className="form-input">{selectedTask.answerer.userName} 선생님</p>
                                                       </div>
                                                    ) : (<></>
                                                )}
                                            </div>
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

export default Answer;
