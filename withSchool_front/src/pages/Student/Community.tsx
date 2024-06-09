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
import { getListCommunity, makeListCommunity } from '../../service/community';
import { viewPostListCommunity, viewPostCommunity, makePostCommunity, editPostCommunity, deletePostCommunity } from '../../service/community';
import { likePostCommunity, likeReplyCommunity } from '../../service/community';
import { viewReplyCommunity, makeReplyCommunity, editReplyCommunity, deleteReplyCommunity } from '../../service/community';
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
import IconHeart from '../../components/Icon/IconHeart';
import IconChatDot from '../../components/Icon/IconChatDot';
import IconRestore from '../../components/Icon/IconRestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { getUserInfobyId } from '../../service/auth';

const Community = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('커뮤니티'));
    });
    const defaultParams = {
        id: null,
        category: '',
        teacher: 0,
        date: '',
    };

    const [page, setPage] = useState('1');
    const [maxPage, setMaxPage] = useState('');

    const [communityList, setCommunityList] = useState([]);

    const fetchCommunityList = async () => {
        try {
            const community = await getListCommunity("1", "10");
            setCommunityList(community);
            if (community.length > 0) {
                setSelectedTab(community[(community.length)-1].communityId);
            }
        } catch (error) {
            console.error("Failed to fetch community:", error);
        }
    };

    useEffect(() => {
        fetchCommunityList();
    }, []);

    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const userinfo = await getUserInfobyId(localStorage.getItem("id"));
            setUserId(userinfo.userId);
        };
        fetchData();
    }, []);

    const [communityName, setCommunityName] = useState('');
    const [communityCategory, setCommunityCategory] = useState('');

    const tryMakeCommunity = async () => {
        if(communityCategory && communityName){
        await makeListCommunity(communityCategory, communityName);
        setCommunityName('');
        setCommunityCategory('');
        setAddCommunityModal(false);
        fetchCommunityList();
        }
        else{
            alert("게시판 이름 및 카테고리를 입력해주세요.");
        }
    }
    
    const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCommunityName(e.target.value);
    };

    const handleCategoryChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCommunityCategory(e.target.value);
    };

    const handleLikeComment = async (replyId: string) => {
       await likeReplyCommunity(replyId);
        fetchCommentList();
    }

    
    const [post, setPost] = useState<any>([]);

    const fetchPost = async (postId : string) => {
        try {
            console.log(selectedTab);
            const posts = await viewPostCommunity(postId);
            setPost(posts);
        } catch (error) {
            console.error("Failed to fetch post list:", error);
            return;
        }
    };

    const isAdmin = (localStorage.getItem("accountType") == "ROLE_ADMIN")

    const handleLikeTask = async (postId:string ) => {
        await likePostCommunity(postId);
        fetchPost(postId);
        fetchPostList();
    }
    
    const handleDeleteComment = async (replyId: string) => {
        await deleteReplyCommunity(replyId);
        fetchCommentList();
    }

    const [postList, setPostList] = useState([]);

    const fetchPostList = async () => {
        try {
            console.log("현재"+page);
            const posts = await viewPostListCommunity(selectedTab, page, "10");
            console.log(posts);
            setPostList(posts.postList);
            let postnum = 0;
            if(posts.totalPosts % 10 == 0)
                postnum = posts.totalPosts / 10
            else
                postnum = posts.totalPosts / 10 + 1
            setMaxPage(Math.floor(postnum).toString());
        } catch (error) {
            console.error("Failed to fetch post list:", error);
        }
    };

    const [selectedTask, setSelectedTask] = useState<any>(defaultParams);
    const [selectedTab, setSelectedTab] = useState(''); // 게시판 Id

    useEffect(() => {
        fetchPostList();
    }, [selectedTab]);

    useEffect(() => {
        fetchCommentList();
    }, [post]);

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const fetchCommentList = async () => {
        try {
            const comments = await viewReplyCommunity(post.postId);
            setComments(comments);
            console.log(comments);
        } catch (error) {
            console.error("Failed to fetch post list:", error);
        }
    };

    useEffect(() => {
        fetchPostList();
    }, [page]);

    const handleAddComment = async () => {
        if(newComment != ''){
            console.log("댓글:"+newComment);
            const res = await makeReplyCommunity(post.postId, newComment);
        }
        else alert("댓글을 입력하세요.");
        setNewComment('');
        fetchCommentList();
        fetchPostList();
    }

    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [viewTaskModal, setViewTaskModal] = useState(false);
    const [addCommunityModal, setAddCommunityModal] = useState(false);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const [allTasks, setAllTasks] = useState([]);

    const fetchCounsels = async () => {
        try {
            const counsels = await getCounselInfo();
            setAllTasks(counsels);
        } catch (error) {
            console.error("Failed to fetch counsels:", error);
        }
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

    const tryRegisterCounsel = async () => {
        try {
            if(params.postId){
                await editPostCommunity(params.postId, selectedTab, params.category, params.description);
                alert("수정되었습니다.");
            }
            else{
                console.log(params.category, params.description);
                if(params.category == undefined || params.description == undefined){
                    alert("제목 또는 내용을 입력해주세요.");
                    return;
                }
                await makePostCommunity(selectedTab, params.category, params.description);
                alert("작성되었습니다.");
            }
            setAddTaskModal(false);
            setParams('');
            await fetchPostList();
        } catch (error) {
            console.error("Failed to register or edit counsel:", error);
        }
    };
    

    const [searchTask, setSearchTask] = useState<any>('');

    const filteredTasks = allTasks.filter((task : any) => {
        const categoryMatch = task.category.toLowerCase().includes(searchTask.toLowerCase());
        const scheduleMatch = task.schedule.join(' ').includes(searchTask);
        return categoryMatch || scheduleMatch;
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
        setMaxPage("1");
        setPage("1");
        setIsShowTaskMenu(false);
    };

    const deleteTask = async (postId : string) => {
        try{
            deletePostCommunity(postId);
            alert("삭제 완료!");
            await fetchPostList();
        }
        catch {
            console.error("Failed to delete counsel");
        }
    }

    const viewTask = async (item: any = null) => {
        setPost(item);
        setNewComment('');
        findTeacherName(item.answererId);
        console.log(item.schedule);
        setTimeout(() => {
            setViewTaskModal(true);
        });
        await fetchPostList();
    };

    const addEditTask = async (task: any | null) => {
        setIsShowTaskMenu(false);
        let json = JSON.parse(JSON.stringify(defaultParams));
        if (task) {
            console.log(task);
            let json1 = JSON.parse(JSON.stringify(task));
            json1.category = json1.title;
            json1.description = json1.content;
            delete json1.title;
            delete json1.content;
            console.log(json1);
            console.log(json1);
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
                                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">커뮤니티</h3>
                            </div>
                        </div>
                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] mb-5"></div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-4">
                                <div>게시판 목록</div>
                                {communityList.length > 0 ? (
                                    <div className="flex flex-col">
                                        {communityList.slice().reverse().map((community: any, index: number) => (
                                            <button
                                                key={community.communityId}
                                                type="button"
                                                className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === community.communityId || (index === 0 && !selectedTab) ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''}`}
                                                onClick={async () => {
                                                    tabChanged();
                                                    setSelectedTab(community.communityId);
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IconListCheck className="w-4.5 h-4.5 shrink-0" />
                                                    <div className="ltr:ml-3 rtl:mr-3">{community.communityName}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-xs">개설된 게시판이 없습니다.</div>
                                )}
                                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                            </div>
                        </PerfectScrollbar>
                        <div className="mb-12 ltr:left-0 rtl:right-0 absolute bottom-0 p-4 w-full">
                            { isAdmin && (
                            <button className="btn btn-primary w-full" type="button" onClick={() => setAddCommunityModal(true)}>
                                <IconPlus className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                게시판 생성
                            </button>)}
                        </div>
                        <div className="ltr:left-0 rtl:right-0 absolute bottom-0 p-4 w-full">
                            <button className="btn btn-primary w-full" type="button" onClick={() => addEditTask(null)}>
                                <IconPlus className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                글 작성하기
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
                                <div className="flex items-center">
                                    <div className="text-xl ltr:ml-3 rtl:mr-3">게시글</div>
                                </div>
                            </div>
                        </div>

                        {postList.length ? (
                            <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                <table className="table-hover">
                                    <tbody>
                                        {postList.map((task: any) => (
                                            <tr
                                                className={`group cursor-pointer ${
                                                    task.counselState === 1 ? 'bg-white-light/30 dark:bg-[#1a2941]' : ''
                                                } `}
                                                key={task.postId}
                                            >
                                                <td style={{ alignItems: "center", width: "50%" }}>
                                                    <div onClick={() => viewTask(task)} style={{ marginLeft: "1.5rem" }}>
                                                        <div
                                                            className={`group-hover:text-primary font-semibold text-base whitespace-nowrap ${task.counselState}`}
                                                        >
                                                            {task.title}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="mt-2" style={{ display: "flex", alignItems: "center", }}>
                                                    <IconHeart/>
                                                    <p style={{ marginLeft: "0.5rem", marginRight: "1rem" }}>{task.likeCount}</p>
                                                    <IconChatDot/>
                                                    <p style={{ marginLeft: "0.5rem" }}>{task.replyCount}</p>
                                                </td>
                                                <td>
                                                    <div className="flex justify-end space-x-2">
                                                        <div className="pr-3" style={{ display: "flex", alignItems: "center" }}>
                                                            {task.regDate && (
                                                                <p className="whitespace-nowrap text-white-dark font-medium">
                                                                    {task.regDate[0]}년 {task.regDate[1]}월 {task.regDate[2]}일
                                                                </p>
                                                            )}
                                                        </div>
                                                        {userId == task.userId && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => addEditTask(task)}
                                                                    className="flex items-center justify-center px-4 py-2 min-w-[90px] border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
                                                                >
                                                                    <IconPencilPaper className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                    <span className="!no-underline">수정</span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => deleteTask(task.postId)}
                                                                    className="flex items-center justify-center px-4 py-2 min-w-[90px] border border-red-600 text-red-600 rounded hover:bg-red-100"
                                                                >
                                                                    <IconTrashLines className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                    <span className="!no-underline">삭제</span>
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">
                                게시글이 없습니다.
                            </div>
                        )}
                         <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg">
                            <button 
                                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${parseInt(page) <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                disabled={parseInt(page) <= 1} 
                                onClick={() => {
                                    if (parseInt(page) > 1) {
                                        const newPage = (parseInt(page) - 1).toString();
                                        console.log(newPage);
                                        setPage(newPage);
                                    }
                                }}>
                                이전
                            </button>
                            <div className="mx-4 text-lg font-semibold">{page}/{maxPage}</div>
                            <button 
                                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${parseInt(page) >= parseInt(maxPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`} 
                                disabled={parseInt(page) >= parseInt(maxPage)} 
                                onClick={() => {
                                    if (parseInt(page) < parseInt(maxPage)) {
                                        const newPage = (parseInt(page) + 1).toString();
                                        console.log(newPage);
                                        setPage(newPage);
                                    }
                                }}>
                                다음
                            </button>
                        </div>
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
                                            {params.postId ? '게시글 수정' : '게시글 작성'}
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-5">
                                                <label htmlFor="category">제목</label>
                                                <input id="category" type="text" placeholder="게시글 제목을 입력해 주세요." className="form-input" value={params.category} onChange={(e) => changeValue(e)}/>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="assignee">내용</label>
                                                <div className="h-fit">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={params.description || ''}
                                                        defaultValue={params.description || ''}
                                                        onChange={(content, delta, source, editor) => {
                                                            params.description = content;
                                                            params.displayDescription = editor.getText();
                                                            setParams({
                                                                ...params,
                                                            });
                                                        }}
                                                        style={{ minHeight: '200px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddTaskModal(false)}>
                                                    취소
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => tryRegisterCounsel()}>
                                                    {params.postId ? '수정' : '저장'}
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
                    <Dialog static as="div" open={viewTaskModal} onClose={() => setViewTaskModal(false)} className="relative z-[51]">
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
                                            <div>게시물 조회</div>
                                        </div>
                                        <div className="p-5">
                                        <div className="p-5">
                                        <div className="mb-5 flex justify-between items-center">
                                            <div>
                                                <label htmlFor="category">제목</label>
                                                <p id="category" className="form-input">{post.title}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-base pb-2">작성자 익명</div>
                                                {post.regDate && (
                                                    <div className="text-sm text-gray-500">
                                                        {post.regDate[0]}년 {post.regDate[1]}월 {post.regDate[2]}일
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="category">내용</label>
                                            <p id="category" className="form-input" dangerouslySetInnerHTML={{ __html: post.content }} />
                                        </div>

                                        <div className="mb-5 flex items-center space-x-2">
                                            <button className="flex items-center" onClick={() => handleLikeTask(post.postId)}>
                                                ♥
                                                <span className="ml-2">{post.likeCount}</span>
                                            </button>
                                        </div>

                                        <div className="h-px w-full border-b border-gray-300 mb-5"></div>

                                        <div className="mb-5">
                                            <h3 className="text-lg font-semibold">댓글</h3>
                                            {comments.length > 0 && (
                                                <div className="mb-5">
                                                    {comments.map((comment: any, index: number) => (
                                                        <div key={index} className="mt-2 mb-4 border border-gray-300 p-3 rounded-lg">
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <div className="text-gray-700">익명</div>
                                                                    <div className="text-sm text-gray-500"></div>
                                                                    <p className="mt-1" dangerouslySetInnerHTML={{ __html: comment.content }}/>
                                                                </div>
                                                                <div>
                                                                    <button onClick={() => handleLikeComment(comment.replyId)} className="mr-2">♥ {comment.like}</button>
                                                                    {comment.userId == userId && (
                                                                        <button onClick={() => handleDeleteComment(comment.replyId)} className="text-red-500">삭제</button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="new-comment" className="block mb-2">댓글 작성</label>
                                            <input
                                                type="text"
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="bg-white p-2 border border-gray-300 rounded"
                                                style={{ height: '100px', width: '100%' }}
                                            />
                                            <button onClick={handleAddComment} className="mt-5 btn btn-primary">댓글 달기</button>
                                        </div>
                                    </div>
                                            <div className="flex justify-end items-center mt-2">
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

                <Transition appear show={addCommunityModal} as={Fragment}>
                    <Dialog as="div" open={addCommunityModal} onClose={() => setAddCommunityModal(false)} className="relative z-[51]">
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
                                            onClick={() => setAddCommunityModal(false)}
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            {params.postId ? '상담 수정' : '게시판 생성'}
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-5">
                                                <label htmlFor="category">게시판 이름</label>
                                                <input id="category" type="text" placeholder="게시판 이름을 입력해 주세요." className="form-input" value={communityName}  onChange={handleNameChange}/>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="category">카테고리</label>
                                                <input id="category" type="text" placeholder="카테고리를 입력해 주세요." className="form-input" value={communityCategory}  onChange={handleCategoryChange}/>
                                            </div>
                                            <div className="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddCommunityModal(false)}>
                                                    취소
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => tryMakeCommunity()}>
                                                    {params.postId ? '수정' : '생성'}
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

export default Community;
