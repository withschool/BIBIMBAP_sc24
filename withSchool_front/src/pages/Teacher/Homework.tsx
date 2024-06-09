import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from '../../components/Dropdown';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconStar from '../../components/Icon/IconStar';
import IconSend from '../../components/Icon/IconSend';
import IconInfoHexagon from '../../components/Icon/IconInfoHexagon';
import IconFile from '../../components/Icon/IconFile';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconArchive from '../../components/Icon/IconArchive';
import IconBookmark from '../../components/Icon/IconBookmark';
import IconVideo from '../../components/Icon/IconVideo';
import IconChartSquare from '../../components/Icon/IconChartSquare';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconPlus from '../../components/Icon/IconPlus';
import IconRefresh from '../../components/Icon/IconRefresh';
import IconWheel from '../../components/Icon/IconWheel';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconOpenBook from '../../components/Icon/IconOpenBook';
import IconBook from '../../components/Icon/IconBook';
import IconTrash from '../../components/Icon/IconTrash';
import IconRestore from '../../components/Icon/IconRestore';
import { teacherNotice, getClassNotices, classNoticeEdit, deleteClassNotice, getClassNoticeDetail } from '../../service/form';
import { getHomeworkList, makeHomework } from '../../service/wow';
import { deleteHomework, editHomework } from '../../service/wow';
import IconMenu from '../../components/Icon/IconMenu';
import IconSearch from '../../components/Icon/IconSearch';
import IconSettings from '../../components/Icon/IconSettings';
import IconHelpCircle from '../../components/Icon/IconHelpCircle';
import IconUser from '../../components/Icon/IconUser';
import IconMessage2 from '../../components/Icon/IconMessage2';
import IconUsers from '../../components/Icon/IconUsers';
import IconTag from '../../components/Icon/IconTag';
import IconPaperclip from '../../components/Icon/IconPaperclip';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import IconArrowForward from '../../components/Icon/IconArrowForward';
import IconGallery from '../../components/Icon/IconGallery';
import IconFolder from '../../components/Icon/IconFolder';
import IconZipFile from '../../components/Icon/IconZipFile';
import IconDownload from '../../components/Icon/IconDownload';
import IconTxtFile from '../../components/Icon/IconTxtFile';
import { deleteAdminNotice } from '../../service/form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const Homework = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('과제 출제'));
    }, [dispatch]);

    const defaultParams = {
        id: null,
        from: 'vristo@mail.com',
        to: '',
        cc: '',
        title: '',
        file: null,
        due: '',
        description: '',
        displayDescription: '',
    };


    const [mailList, setMailList] = useState<any[]>([]);
    const [filteredMailList, setFilteredMailList] = useState<any[]>([]);
    const [pagedMails, setPagedMails] = useState<any[]>([]);
    const [selectedMail, setSelectedMail] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedTab, setSelectedTab] = useState('inbox');
    const [searchText, setSearchText] = useState('');
    const [isShowMailMenu, setIsShowMailMenu] = useState(false);
    const [ids, setIds] = useState<any>([]);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [selectedDate, setSelectedDate] = useState<any>();

    const [pager] = useState<any>({
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    });

    useEffect(() => {
        searchMails();
    }, [selectedTab, searchText, mailList]);

    const subjectId = localStorage.getItem('targetSubject');

    const fetchNotices = async () => {
        try {
            const childId = localStorage.getItem('schoolId');
            const notices = await getHomeworkList(subjectId || '');
            console.log(notices);
            if (notices && Array.isArray(notices)) {
                const formattedNotices = notices.map((notice: any) => ({
                    id: notice.homeworkId,
                    path: 'profile-15.jpeg',
                    firstName: 'd',
                    lastName: 'd',
                    email: 'test@test.com',
                    date: notice.regDate, // Convert regDate to Date object
                    time: '2:00 PM',
                    title: notice.title,
                    displayDescription: notice.title,
                    type: 'inbox',
                    isImportant: false,
                    isStar: false,
                    group: 'personal',
                    isUnread: false,
                    attachments: [
                        {
                            name: notice.fileURl,
                            type: 'file',
                        },
                    ],
                    description: notice.content,
                })).reverse(); // Reverse the order of notices
                console.log("응애"+formattedNotices);
                setMailList(notices);
                setFilteredMailList(formattedNotices);
                setPagedMails(formattedNotices.slice(0, 10));
            } else {
                console.error('No notices found or invalid data format');
            }
        } catch (error) {
            console.error('Failed to fetch notices:', error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const selectMail = async (item: any) => {
        if (item) {
            if (item.type !== 'draft') {
                if (item && item.isUnread) {
                    item.isUnread = false;
                }
                console.log(item);
                setSelectedMail(item);
            } else {
                openMail('draft', item);
            }
        } else {
            setSelectedMail('');
        }
    };

    const [fileExists, setFileExists] = useState<(boolean | 0)[]>([]);

    const openMail = (type: string, item: any) => {
        if (type === 'add') {
            setEdit(false);
            setIsShowMailMenu(false);
            setParams(JSON.parse(JSON.stringify(defaultParams)));
        } else if (type === 'draft') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({ ...data, from: defaultParams.from, to: data.email, displayDescription: data.email });
        } else if (type === 'reply') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({
                ...data,
                from: defaultParams.from,
                to: data.email,
                id: data.id,
                title: data.title,
                description : data.content,
                displayDescription: 'Re: ' + data.title,
            });
            setEdit(true);
        } else if (type === 'forward') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({
                ...data,
                from: defaultParams.from,
                to: data.email,
                title: 'Fwd: ' + data.title,
                displayDescription: 'Fwd: ' + data.title,
            });
        }
        setIsEdit(true);
    };

    const searchMails = (isResetPage = true) => {
        if (isResetPage) {
            pager.currentPage = 1;
        }

        let res;
        if (selectedTab === 'important') {
            res = mailList.filter((d) => d.isImportant);
        } else if (selectedTab === 'star') {
            res = mailList.filter((d) => d.isStar);
        } else if (selectedTab === 'personal' || selectedTab === 'work' || selectedTab === 'social' || selectedTab === 'private') {
            res = mailList.filter((d) => d.group === selectedTab);
        } else {
            res = mailList.filter((d) => d.type === selectedTab);
        }

        let filteredRes = res.filter(
            (d) =>
                (d.title && d.title.toLowerCase().includes(searchText)) ||
                (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
                (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
                (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
        );

        setFilteredMailList([
            ...res.filter(
                (d) =>
                    (d.title && d.title.toLowerCase().includes(searchText)) ||
                    (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
                    (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
                    (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
            ),
        ]);

        if (filteredRes.length) {
            pager.totalPages = pager.pageSize < 1 ? 1 : Math.ceil(filteredRes.length / pager.pageSize);
            if (pager.currentPage > pager.totalPages) {
                pager.currentPage = 1;
            }
            pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
            pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, filteredRes.length - 1);
            setPagedMails([...filteredRes.slice(pager.startIndex, pager.endIndex + 1)]);
        } else {
            setPagedMails([]);
            pager.startIndex = -1;
            pager.endIndex = -1;
        }
        clearSelection();
    };

    const [isLoading, setIsLoading] = useState(false);
    
    const saveNotice = async (type: any, id: any) => {
        if (!params.title) {
            showMessage('제목을 작성해 주세요.', 'error');
            return false;
        }

        if(!selectedDate ) {
            showMessage('마감일자를 지정해주세요.', 'error');
            return false;
        }

        if(selectedDate < new Date()){
            showMessage('마감일자를 내일 이후로 지정해주세요.', 'error');
            return false;
        }

        let maxId = 0;
        if (!params.id) {
            maxId = mailList.length ? mailList.reduce((max, character) => (character.id && character.id > max ? character.id : max), 0) : 0;
        }
        let cDt = new Date();

        let obj: any = {
            id: maxId + 1,
            path: '',
            firstName: '',
            lastName: '',
            email: params.to,
            date: cDt, // Set date as Date object
            time: cDt.toLocaleTimeString(),
            title: params.title,
            displayDescription: params.displayDescription,
            type: 'draft',
            isImportant: false,
            group: '',
            isUnread: false,
            description: params.description,
            attachments: null,
        };
        setIsLoading(true);
        if (type === 'save' || type === 'save_reply' || type === 'save_forward') {
            setMailList((prevMailList) => [obj, ...prevMailList]);
            searchMails();
            showMessage('Mail has been saved successfully to draft.');
        } else if (type === 'send' || type === 'reply' || type === 'forward') {
            try {
                const formData = new FormData();
                formData.append("id", subjectId !== null ? subjectId : 'mindong');
                formData.append("title", params.title);
                formData.append("content", params.description);
                if (selectedFiles) {
                    Array.from(selectedFiles).forEach(file => {
                        console.log(file);
                        formData.append("files", file);
                    });
                }
                formData.append("due", format(selectedDate, "yyyy-MM-dd")+"T00:00:00")
                setSelectedFiles(null);
                setSelectedDate('');   
                if(edit){
                    const response = await editHomework(formData, id);
                    obj.type = 'sent_notice';
                    setMailList((prevMailList) => {
                        const newMailList = [obj, ...prevMailList];
                        return newMailList;
                    });
                    setIsLoading(false);
                    showMessage('과제가 성공적으로 수정되었습니다.');
                    setEdit(false);
                    await fetchNotices();
                }
                else{
                    const response = await makeHomework(formData);
                    obj.type = 'sent_notice';
                    setMailList((prevMailList) => {
                        const newMailList = [obj, ...prevMailList];
                        return newMailList;
                    });
                    setIsLoading(false);
                    showMessage('과제가 성공적으로 작성되었습니다.');
                    await fetchNotices();
                }

            } catch (error) {
                showMessage('과제 작성에 실패했습니다.', 'error');
            }
        }

        setSelectedMail(null);
        setIsEdit(false);
    };

    const deleteNotice = async (id: any) => {
        await deleteHomework(id);
        showMessage('과제가 성공적으로 삭제되었습니다.');
        searchMails();
        fetchNotices();
        setSelectedMail(null);
    }

    const getFileSize = (file_type: any) => {
        let type = 'file';
        if (file_type.includes('image/')) {
            type = 'image';
        } else if (file_type.includes('application/x-zip')) {
            type = 'zip';
        }
        return type;
    };

    const getFileType = (total_bytes: number) => {
        let size = '';
        if (total_bytes < 1000000) {
            size = Math.floor(total_bytes / 1000) + 'KB';
        } else {
            size = Math.floor(total_bytes / 1000000) + 'MB';
        }
        return size;
    };

    const clearSelection = () => {
        setIds([]);
    };

    const tabChanged = (tabType: any) => {
        setIsEdit(false);
        setIsShowMailMenu(false);
        setSelectedMail(null);
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const handleCheckboxChange = (id: any) => {
        if (ids.includes(id)) {
            setIds((value: any) => value.filter((d: any) => d !== id));
        } else {
            setIds([...ids, id]);
        }
    };

    const checkAllCheckbox = () => {
        if (filteredMailList.length && ids.length === filteredMailList.length) {
            return true;
        } else {
            return false;
        }
    };

    const closeMsgPopUp = () => {
        setIsEdit(false);
        setSelectedTab('inbox');
        searchMails();
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

    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div
                    className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden ${isShowMailMenu ? '!block xl:!hidden' : ''}`}
                    onClick={() => setIsShowMailMenu(!isShowMailMenu)}
                ></div>
                <div
                    className={`panel xl:block p-4 dark:gray-50 w-[250px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden ${isShowMailMenu ? '!block' : ''
                        }`}
                >
                    <div className="flex flex-col h-full pb-16">
                        <div className="pb-5">
                            <button className="btn btn-primary w-full" type="button" onClick={() => openMail('add', null)}>
                                과제 작성하기
                            </button>
                        </div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'inbox' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedTab('inbox');
                                        tabChanged('inbox');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">과제 목록</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'list' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedTab('list');
                                        tabChanged('list');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">과제 조회</div>
                                    </div>
                                </button>
                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            </div>
                        </PerfectScrollbar>
                        
                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    {!selectedMail && !isEdit && (
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center flex-wrap-reverse gap-4 p-4">
                                <div className="flex items-center sm:w-auto w-full">
                                    <button type="button" className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" onClick={() => setIsShowMailMenu(!isShowMailMenu)}>
                                        <IconMenu />
                                    </button>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            className="form-input ltr:pr-8 rtl:pl-8 peer"
                                            placeholder="과제 검색하기"
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            onKeyUp={() => searchMails()}
                                        />
                                        <div className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                            <IconSearch />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            {mailList.length ? (
                                
                                <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                    <table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th className='w-1/3'>제목</th>
                                            <th className='text-center'>파일</th>
                                            <th className='text-center'>마감일자</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {mailList.map((mail: any) => {
                                                return (
                                                    <tr key={mail.id} className="cursor-pointer" onClick={() => selectMail(mail)}>
                                                        <td className='w-1/3'>
                                                            <div className="font-medium text-white-dark overflow-hidden min-w-[300px] line-clamp-1">
                                                                <span className={`${mail.isUnread ? 'text-gray-800 dark:text-gray-300 font-semibold' : ''}`}>
                                                                    <span>{mail.title}</span>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td  className='text-center'>
                                                            <div className="flex justify-center">
                                                                {mail.originalName != '' && (
                                                                    <div className="ltr:ml-4 rtl:mr-4">
                                                                        <IconPaperclip />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td >
                                                        <td  className='text-center'>
                                                            <div className="flex justify-center ">
                                                                {mail.due[0]}년 {mail.due[1]}월 {mail.due[2]}일
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="grid place-content-center min-h-[300px] font-semibold text-lg h-full">작성된 과제가 없습니다.</div>
                            )}
                        </div>
                    )}

                    {selectedMail && !isEdit && (
                        <div>
                            <div className="flex items-center justify-between flex-wrap p-4">
                                <div className="flex items-center">
                                    <button type="button" className="ltr:mr-2 rtl:ml-2 hover:text-primary" onClick={() => setSelectedMail(null)}>
                                        <IconArrowLeft className="w-5 h-5 rotate-180" />
                                    </button>
                                    <h4 className="text-base md:text-lg font-medium ltr:mr-2 rtl:ml-2">과제 세부 조회</h4>
                                </div>
                            </div>
                            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            <div className="p-4 relative">
                                <div className="flex flex-wrap">
                                    <div className="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                                        {selectedMail.path ? (
                                            <></>
                                        ) : (
                                            <img src="https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png" className="h-12 w-12 rounded-full object-cover" alt="avatar" />
                                        )}
                                    </div>
                                    <div className="ltr:mr-2 rtl:ml-2 flex-1">
                                        <div className="flex flex-col">
                                            <div className="text-lg ltr:mr-4 rtl:ml-4 whitespace-nowrap">
                                                {selectedMail.title}    
                                            </div>
                                            <div>
                                                <h1>마감 : {selectedMail.due[0]}년 {selectedMail.due[1]}월 {selectedMail.due[2]}일</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">                                     
                                            <Tippy content="수정">
                                            <button type="button" className="hover:text-info border border-gray-300 rounded-md p-1 mr-1" onClick={() => openMail('reply', selectedMail)}>
                                                <IconPlus className="rtl:hidden" />
                                            </button>
                                            </Tippy>
                                            <Tippy content="삭제">
                                            <button type="button" className="hover:text-info border border-gray-300 rounded-md p-1" onClick={() => deleteNotice(selectedMail.id)}>
                                                <IconTrash/>
                                            </button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="mt-8 prose dark:prose-p:text-white prose-p:text-sm md:prose-p:text-sm max-w-full prose-img:inline-block prose-img:m-0"
                                    dangerouslySetInnerHTML={{ __html: selectedMail.content }}
                                ></div>

                                {(selectedMail.filesURl != '' )&& (
                                    <div className="mt-8">
                                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                                        <div className="text-base mt-5 mb-4">첨부파일</div>
                                        <div className="flex items-center flex-wrap mt-6">
                                            {selectedMail.filesURl.map((attachment: any, i: number) => {
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
                                                            <p className="text-xs text-primary font-semibold">{selectedMail.originalName}</p>
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

                    {isEdit && (
                        isLoading ? (
                            <div className="flex items-center justify-center w-full h-full">
                                <div className="text-center">
                                    <p className='mt-5'>Loading....</p>
                                    <span className="animate-spin border-8 border-[#f1f2f3] border-l-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="py-4 px-6 flex items-center">
                                    <button type="button" className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" onClick={() => setIsShowMailMenu(!isShowMailMenu)}>
                                        <IconMenu />
                                    </button>
                                    <h4 className="text-lg text-gray-600 dark:text-gray-400 font-medium">{edit ? '과제 수정하기' : '과제 작성하기'}</h4>
                                </div>
                                <div className="h-px bg-gradient-to-l from-indigo-900/20 via-black dark:via-white to-indigo-900/20 opacity-[0.1]"></div>
                                <form className="p-6 grid gap-6">
                                    <div>
                                        <input id="title" type="text" className="form-input" placeholder="제목" defaultValue={params.title} onChange={(e) => changeValue(e)} />
                                    </div>

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

                                    <div>
                                        <input
                                            type="file"
                                            className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                            multiple
                                            accept="image/*,.zip,.pdf,.xls,.xlsx,.txt,.doc,.docx"
                                            required
                                            id="fileId"
                                            onChange={(e) => setSelectedFiles(e.target.files)}
                                        />
                                    </div>
                                    <div className="mb-5 flex justify-between gap-4">
                                        <div className="flex-3">
                                            <label htmlFor="tag">마감일자</label>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date : any) => setSelectedDate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="날짜를 선택하세요"
                                                className="form-input"/>
                                        </div>
                                    </div>
                                    <div className="flex items-center ltr:ml-auto rtl:mr-auto mt-8">
                                        <button type="button" className="btn btn-outline-danger ltr:mr-3 rtl:ml-3" onClick={closeMsgPopUp}>
                                            취소
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={() => saveNotice('send', params.id)}>
                                            {edit ? '과제 수정' : '과제 작성'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homework;