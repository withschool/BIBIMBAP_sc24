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

const Counsel = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('학생 상담'));
    });
    const defaultParams = {
        id: null,
        title: '',
        description: '',
        descriptionText: '',
        assignee: '',
        path: '',
        tag: '',
        priority: 'low',
    };

    const [selectedTab, setSelectedTab] = useState('');
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [viewTaskModal, setViewTaskModal] = useState(false);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const [allTasks, setAllTasks] = useState([
        {
            id: 1,
            title: '수학 문제 이해가 안 돼요',
            date: '2023년 10월 10일',
            description:
                '선생님, 수학 문제 중에서 분수 계산 부분이 이해가 잘 안 돼요. 어떻게 풀어야 할지 모르겠어요. 도와주실 수 있나요?',
            descriptionText:
                '선생님, 수학 문제 중에서 분수 계산 부분이 이해가 잘 안 돼요. 어떻게 풀어야 할지 모르겠어요. 도와주실 수 있나요?',
            tag: '수학',
            priority: 'medium',
            assignee: '김철수',
            path: '',
            status: 'before',
        },
        {
            id: 2,
            title: '과학 실험 보고서 작성 방법',
            date: '2023년 10월 09일',
            description:
                '선생님, 과학 실험 보고서를 어떻게 작성해야 할지 모르겠어요. 어떤 내용을 포함해야 하는지 알려주실 수 있나요?',
            descriptionText:
                '선생님, 과학 실험 보고서를 어떻게 작성해야 할지 모르겠어요. 어떤 내용을 포함해야 하는지 알려주실 수 있나요?',
            tag: '과학',
            priority: 'low',
            assignee: '이영희',
            path: 'profile-15.jpeg',
            status: 'before',
        },
        {
            id: 3,
            title: '영어 단어 외우기 어려워요',
            date: '2023년 10월 08일',
            description:
                '선생님, 영어 단어를 외우는 게 너무 어려워요. 효과적으로 외울 수 있는 방법이 있을까요?',
            descriptionText:
                '선생님, 영어 단어를 외우는 게 너무 어려워요. 효과적으로 외울 수 있는 방법이 있을까요?',
            tag: '영어',
            priority: 'medium',
            assignee: '박민수',
            path: 'profile-1.jpeg',
            status: 'complete',
        },
        {
            id: 4,
            title: '역사 숙제 도움 요청',
            date: '2023년 10월 07일',
            description:
                '선생님, 역사 숙제 중에서 조선시대 부분이 이해가 잘 안 돼요. 어떤 자료를 참고하면 좋을까요?',
            descriptionText:
                '선생님, 역사 숙제 중에서 조선시대 부분이 이해가 잘 안 돼요. 어떤 자료를 참고하면 좋을까요?',
            tag: '역사',
            priority: 'low',
            assignee: '최지우',
            path: 'profile-16.jpeg',
            status: 'before',
        },
    ]);

    const [filteredTasks, setFilteredTasks] = useState<any>(allTasks);
    const [pagedTasks, setPagedTasks] = useState<any>(filteredTasks);
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

    useEffect(() => {
        searchTasks();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [selectedTab, searchTask, allTasks]);

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const priorityLabels: { [key: string]: string } = {
        low: '중요도 낮음',
        medium: '중요도 중간',
        high: '중요도 높음',
    };

    const tagLabels: { [key: string]: string } = {
        daily: '일상',
        score: '성적',
    };

    const searchTasks = (isResetPage = true) => {
        if (isResetPage) {
            pager.currentPage = 1;
        }
        let res;
        if (selectedTab === 'complete' || selectedTab === 'save' || selectedTab === 'trash') {
            res = allTasks.filter((d) => d.status === selectedTab);
        } else if (selectedTab === 'before') {
            res = allTasks.filter((d) => d.status === 'before');
        } else {
            res = allTasks.filter((d) => d.status !== 'trash');
        }

        if (selectedTab === 'daily' || selectedTab === 'score') {
            res = res.filter((d) => d.tag === selectedTab);
        } else if (selectedTab === 'high' || selectedTab === 'medium' || selectedTab === 'low') {
            res = res.filter((d) => d.priority === selectedTab);
        }
        setFilteredTasks([...res.filter((d: any) => d.title?.toLowerCase().includes(searchTask))]);
        getPager(res.filter((d: any) => d.title?.toLowerCase().includes(searchTask)));
    };


    const getPager = (res: any) => {
        setTimeout(() => {
            if (res.length) {
                pager.totalPages = pager.pageSize < 1 ? 1 : Math.ceil(res.length / pager.pageSize);
                if (pager.currentPage > pager.totalPages) {
                    pager.currentPage = 1;
                }
                pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
                pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, res.length - 1);
                setPagedTasks(res.slice(pager.startIndex, pager.endIndex + 1));
            } else {
                setPagedTasks([]);
                pager.startIndex = -1;
                pager.endIndex = -1;
            }
        });
    };

    const setPriority = (task: any, name: string = '') => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.priority = name;
        searchTasks(false);
    };

    const setTag = (task: any, name: string = '') => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.tag = name;
        searchTasks(false);
    };

    const tabChanged = () => {
        setIsShowTaskMenu(false);
    };

    const taskComplete = (task: any = null) => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.status = item.status === 'complete' ? 'before' : 'complete';
        searchTasks(false);
    };

    const setsave = (task: any = null) => {
        let item = filteredTasks.find((d: any) => d.id === task.id);
        item.status = item.status === 'save' ? '' : 'save';
        searchTasks(false);
    };

    const viewTask = (item: any = null) => {
        setSelectedTask(item);
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

    const deleteTask = (task: any, type: string = '') => {
        if (type === 'delete') {
            task.status = 'trash';
        }
        if (type === 'deletePermanent') {
            setAllTasks(allTasks.filter((d: any) => d.id !== task.id));
        } else if (type === 'restore') {
            task.status = '';
        }
        searchTasks(false);
    };

    const saveTask = () => {
        if (!params.title) {
            showMessage('제목을 입력해 주세요.', 'error');
            return false;
        }
        if (params.id) {
            //score task
            setAllTasks(
                allTasks.map((d: any) => {
                    if (d.id === params.id) {
                        d = params;
                    }
                    return d;
                })
            );
        } else {
            const maxId = allTasks?.length ? allTasks.reduce((max, obj) => (obj.id > max ? obj.id : max), allTasks[0].id) : 0;
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth());
            const yyyy = today.getFullYear();
            const monthNames: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let task = params;
            task.id = maxId + 1;
            task.date = monthNames[mm] + ', ' + dd + ' ' + yyyy;
            allTasks.unshift(task);
            searchTasks();
        }
        showMessage('상담 신청이 완료되었습니다.');
        setAddTaskModal(false);
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
                                        {allTasks && allTasks.filter((d) => d.status !== 'trash').length}
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === 'complete' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('complete');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconThumbUp className="w-5 h-5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">상담 완료</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {allTasks && allTasks.filter((d) => d.status === 'complete').length}
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === 'before' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'}`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('before');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconStar className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">상담 이전</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {allTasks && allTasks.filter((d) => d.status === 'before').length}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === 'save' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('save');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconStar className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">저장</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {allTasks && allTasks.filter((d) => d.status === 'save').length}
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === 'trash' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('trash');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconTrashLines className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">휴지통</div>
                                    </div>
                                </button>
                                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                                <div className="text-white-dark px-1 py-3">태그</div>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-success ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'daily' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('daily');
                                    }}
                                >
                                    <IconSquareRotated className="fill-success shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">일상</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-warning ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'low' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('low');
                                    }}
                                >
                                    <IconSquareRotated className="fill-warning shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">중요도 낮음</div>
                                </button>

                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-primary ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'medium' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('medium');
                                    }}
                                >
                                    <IconSquareRotated className="fill-primary shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">중요도 중간</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-danger ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'high' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('high');
                                    }}
                                >
                                    <IconSquareRotated className="fill-danger shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">중요도 높음</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-info ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'score' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => {
                                        tabChanged();
                                        setSelectedTab('score');
                                    }}
                                >
                                    <IconSquareRotated className="fill-info shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">성적</div>
                                </button>
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
                                        onKeyUp={() => searchTasks()}
                                    />
                                    <div className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                        <IconSearch />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                                <p className="ltr:mr-3 rtl:ml-3">{pager.startIndex + 1 + '-' + (pager.endIndex + 1) + ' of ' + filteredTasks.length}</p>
                                <button
                                    type="button"
                                    disabled={pager.currentPage === 1}
                                    className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={() => {
                                        pager.currentPage--;
                                        searchTasks(false);
                                    }}
                                >
                                    <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                </button>
                                <button
                                    type="button"
                                    disabled={pager.currentPage === pager.totalPages}
                                    className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={() => {
                                        pager.currentPage++;
                                        searchTasks(false);
                                    }}
                                >
                                    <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                </button>
                            </div>
                        </div>
                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

                        {pagedTasks.length ? (
                            <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                <table className="table-hover">
                                    <tbody>
                                        {pagedTasks.map((task: any) => {
                                            return (
                                                <tr className={`group cursor-pointer ${task.status === 'complete' ? 'bg-white-light/30 dark:bg-[#1a2941]' : ''}`} key={task.id}>
                                                    <td className="w-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`chk-${task.id}`}
                                                            className="form-checkbox"
                                                            disabled={selectedTab === 'trash'}
                                                            onClick={() => taskComplete(task)}
                                                            defaultChecked={task.status === 'complete'}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div onClick={() => viewTask(task)}>
                                                            <div className={`group-hover:text-primary font-semibold text-base whitespace-nowrap ${task.status === 'complete' ? 'line-through' : ''}`}>
                                                                {task.title}
                                                            </div>
                                                            <div className={`text-white-dark overflow-hidden min-w-[300px] line-clamp-1 ${task.status === 'complete' ? 'line-through' : ''}`}>
                                                                {task.descriptionText}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="w-1">
                                                        <div className="flex items-center ltr:justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                                                            {task.priority && (
                                                                <div className="dropdown">
                                                                    <Dropdown
                                                                        offset={[0, 5]}
                                                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                        btnClassName="align-middle"
                                                                        button={
                                                                            <span
                                                                                className={`badge rounded-full capitalize hover:top-0 hover:text-white ${task.priority === 'medium'
                                                                                    ? 'badge-outline-primary hover:bg-primary'
                                                                                    : task.priority === 'low'
                                                                                        ? 'badge-outline-warning hover:bg-warning'
                                                                                        : task.priority === 'high'
                                                                                            ? 'badge-outline-danger hover:bg-danger'
                                                                                            : task.priority === 'medium' && isPriorityMenu === task.id
                                                                                                ? 'text-white bg-primary'
                                                                                                : task.priority === 'low' && isPriorityMenu === task.id
                                                                                                    ? 'text-white bg-warning'
                                                                                                    : task.priority === 'high' && isPriorityMenu === task.id
                                                                                                        ? 'text-white bg-danger'
                                                                                                        : ''
                                                                                    }`}
                                                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}

                                                                            >
                                                                                {priorityLabels[task.priority]}
                                                                            </span>
                                                                        }
                                                                    >
                                                                        <ul className="text-sm text-medium">
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="w-full text-danger ltr:text-left rtl:text-right"
                                                                                    onClick={() => setPriority(task, 'high')}
                                                                                >
                                                                                    중요도 높음
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="w-full text-primary ltr:text-left rtl:text-right"
                                                                                    onClick={() => setPriority(task, 'medium')}
                                                                                >
                                                                                    중요도 중간
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="w-full text-warning ltr:text-left rtl:text-right"
                                                                                    onClick={() => setPriority(task, 'low')}
                                                                                >
                                                                                    중요도 낮음
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </Dropdown>
                                                                </div>
                                                            )}

                                                            {task.tag && (
                                                                <div className="dropdown">
                                                                    <Dropdown
                                                                        offset={[0, 5]}
                                                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                        btnClassName="align-middle"
                                                                        button={
                                                                            <span
                                                                                className={`badge rounded-full capitalize hover:top-0 hover:text-white ${task.tag === 'daily'
                                                                                    ? 'badge-outline-success hover:bg-success'
                                                                                    : task.tag === 'score'
                                                                                        ? 'badge-outline-info hover:bg-info'
                                                                                        : task.tag === 'daily' && isTagMenu === task.id
                                                                                            ? 'text-white bg-success '
                                                                                            : task.tag === 'score' && isTagMenu === task.id
                                                                                                ? 'text-white bg-info '
                                                                                                : ''
                                                                                    }`}
                                                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}

                                                                            >
                                                                                {tagLabels[task.tag]}
                                                                            </span>
                                                                        }
                                                                    >
                                                                        <ul className="text-sm text-medium">
                                                                            <li>
                                                                                <button type="button" className="text-success" onClick={() => setTag(task, 'daily')}>
                                                                                    일상
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button type="button" className="text-info" onClick={() => setTag(task, 'score')}>
                                                                                    성적
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button type="button" onClick={() => setTag(task, '')}>
                                                                                    없음
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </Dropdown>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="w-1">
                                                        <p className={`whitespace-nowrap text-white-dark font-medium ${task.status === 'complete' ? 'line-through' : ''}`}>{task.date}</p>
                                                    </td>
                                                    <td className="w-1">
                                                        <div className="flex items-center justify-between w-max ltr:ml-auto rtl:mr-auto">
                                                            <div className="ltr:mr-2.5 rtl:ml-2.5 flex-shrink-0">
                                                                {task.path && (
                                                                    <div>
                                                                        <img src={`/assets/images/${task.path}`} className="h-8 w-8 rounded-full object-cover" alt="avatar" />
                                                                    </div>
                                                                )}
                                                                {!task.path && task.assignee ? (
                                                                    <div className="grid place-content-center h-8 w-8 rounded-full bg-primary text-white text-sm font-semibold">
                                                                        {task.assignee.charAt(0) + '' + task.assignee.charAt(task.assignee.indexOf(' ') + 1)}
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {!task.path && !task.assignee ? (
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
                                                                                    <button type="button" onClick={() => addEditTask(task)}>
                                                                                        <IconPencilPaper className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        수정
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button" onClick={() => deleteTask(task, 'delete')}>
                                                                                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        삭제
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button" onClick={() => setsave(task)}>
                                                                                        <IconStar className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        <span>{task.status === 'save' ? '저장 안함' : '저장'}</span>
                                                                                    </button>
                                                                                </li>
                                                                            </>
                                                                        )}
                                                                        {selectedTab === 'trash' && (
                                                                            <>
                                                                                <li>
                                                                                    <button type="button" onClick={() => deleteTask(task, 'deletePermanent')}>
                                                                                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        최종 삭제
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button" onClick={() => deleteTask(task, 'restore')}>
                                                                                        <IconRestore className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                        되돌리기
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
                                            <form>
                                                <div className="mb-5">
                                                    <label htmlFor="title">제목</label>
                                                    <input id="title" type="text" placeholder="상담 제목을 입력해 주세요." className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="assignee">대상</label>
                                                    <select id="assignee" className="form-select" value={params.assignee} onChange={(e) => changeValue(e)}>
                                                        <option value="">대상 선택</option>
                                                        <option value="John Smith">반 담임</option>
                                                        <option value="Kia Vega">과목 1</option>
                                                        <option value="Sandy Doe">과목 2</option>
                                                        <option value="Jane Foster">과목 3</option>
                                                    </select>
                                                </div>
                                                <div className="mb-5 flex justify-between gap-4">
                                                    <div className="flex-1">
                                                        <label htmlFor="tag">태그</label>
                                                        <select id="tag" className="form-select" value={params.tag} onChange={(e) => changeValue(e)}>
                                                            <option value="">카테고리를 선택해 주세요</option>
                                                            <option value="daily">일상</option>
                                                            <option value="score">성적</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex-1">
                                                        <label htmlFor="priority">중요도</label>
                                                        <select id="priority" className="form-select" value={params.priority} onChange={(e) => changeValue(e)}>
                                                            <option value="">중요도 선택</option>
                                                            <option value="low">중요도 낮음</option>
                                                            <option value="medium">중요도 중간</option>
                                                            <option value="high">중요도 높음</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label>세부 내용</label>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={params.description}
                                                        defaultValue={params.description}
                                                        onChange={(content, delta, source, editor) => {
                                                            params.description = content;
                                                            params.descriptionText = editor.getText();
                                                            setParams({
                                                                ...params,
                                                            });
                                                        }}
                                                        style={{ minHeight: '200px' }}
                                                    />
                                                </div>
                                                <div className="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setAddTaskModal(false)}>
                                                        취소
                                                    </button>
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => saveTask()}>
                                                        {params.id ? '저장' : '저장'}
                                                    </button>
                                                </div>
                                            </form>
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
                                            <div>{selectedTask.title}</div>
                                            {selectedTask.priority && (
                                                <div
                                                    className={`badge rounded-3xl capitalize ${selectedTask.priority === 'medium'
                                                        ? 'badge-outline-primary'
                                                        : selectedTask.priority === 'low'
                                                            ? 'badge-outline-warning '
                                                            : selectedTask.priority === 'high'
                                                                ? 'badge-outline-danger '
                                                                : ''
                                                        }`}
                                                >
                                                    {selectedTask.priority}
                                                </div>
                                            )}
                                            {selectedTask.tag && (
                                                <div
                                                    className={`badge rounded-3xl capitalize ${selectedTask.tag === 'daily' ? 'badge-outline-success' : selectedTask.tag === 'score' ? 'badge-outline-info ' : ''
                                                        }`}
                                                >
                                                    {selectedTask.tag}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
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

export default Counsel;
