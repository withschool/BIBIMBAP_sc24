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
import { teacherNotice } from '../../service/form';
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

const TeacherNotice = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('teacher-notice'));
    });
    const [mailList, setMailList] = useState([
        {
            id: 1,
            path: 'profile-15.jpeg',
            firstName: '김',
            lastName: '창수',
            email: 'laurieFox@mail.com',
            date: new Date(),
            time: '2:00 PM',
            title: '학교 운동회 안내',
            displayDescription: '다가오는 학교 운동회 일정 안내입니다.',
            type: 'inbox',
            isImportant: false,
            isStar: true,
            group: 'social',
            isUnread: false,
            attachments: [
                {
                    name: '운동회 일정표.txt',
                    size: '450KB',
                    type: 'file',
                },
                {
                    name: '운동회 규칙.pdf',
                    size: '2.1MB',
                    type: 'file',
                },
            ],
            description: `
                              <p class="mail-content">안녕하세요, 학부모님들께 알려드립니다. 오는 5월 15일 금요일에 학교 운동회가 개최됩니다. 자세한 일정과 규칙은 첨부된 파일을 확인해 주시기 바랍니다. 많은 참여 부탁드립니다.</p>
                              <div class="gallery text-center">
                                  <img alt="image-gallery" src="${'/assets/images/sports_day1.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${'/assets/images/sports_day2.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${'/assets/images/sports_day3.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                              </div>
                              <p>참가를 원하시는 학부모님께서는 미리 신청서를 제출해 주시기 바랍니다. 감사합니다.</p>
                              `,
        },
        {
            id: 2,
            path: 'profile-14.jpeg',
            firstName: '동현',
            lastName: '민',
            email: 'kingAndy@mail.com',
            date: new Date(),
            time: '6:28 PM',
            title: '학부모 상담 주간 안내',
            displayDescription: '학부모 상담 주간 일정 안내입니다.',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `
                              <p class="mail-content">안녕하세요, 다음 주는 학부모 상담 주간입니다. 자녀의 학습 진도 및 행동 발달에 대해 논의할 수 있는 좋은 기회입니다. 상담을 원하시는 학부모님께서는 미리 예약해 주시기 바랍니다.</p>
                              <p>상담은 오전 9시부터 오후 4시까지 가능합니다. 감사합니다.</p>
                              `,
        },
    ]);

    const defaultParams = {
        id: null,
        from: 'vristo@mail.com',
        to: '',
        cc: '',
        title: '',
        file: null,
        description: '',
        displayDescription: '',
    };

    const [isShowMailMenu, setIsShowMailMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTab, setSelectedTab] = useState('inbox');
    const [filteredMailList, setFilteredMailList] = useState<any>(mailList.filter((d) => d.type === 'inbox'));
    const [ids, setIds] = useState<any>([]);
    const [searchText, setSearchText] = useState<any>('');
    const [selectedMail, setSelectedMail] = useState<any>(null);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [pagedMails, setPagedMails] = useState<any>([]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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

    const refreshMails = () => {
        setSearchText('');
        searchMails(false);
    };

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const setArchive = () => {
        if (ids.length) {
            let items = filteredMailList.filter((d: any) => ids.includes(d.id));
            for (let item of items) {
                item.type = item.type === 'archive' ? 'inbox' : 'archive';
            }
            if (selectedTab === 'archive') {
                showMessage(ids.length + ' 공지를 저장에 삭제하였습니다.');
            } else {
                showMessage(ids.length + ' 공지를 저장에 추가하였습니다.');
            }
            searchMails(false);
        }
    };

    const setSpam = () => {
        if (ids.length) {
            let items = filteredMailList.filter((d: any) => ids.includes(d.id));
            for (let item of items) {
                item.type = item.type === 'spam' ? 'inbox' : 'spam';
            }
            if (selectedTab === 'spam') {
                showMessage(ids.length + ' Mail has been removed from Spam.');
            } else {
                showMessage(ids.length + ' Mail has been added to Spam.');
            }
            searchMails(false);
        }
    };

    const setGroup = (group: any) => {
        if (ids.length) {
            let items = mailList.filter((d: any) => ids.includes(d.id));
            for (let item of items) {
                item.group = group;
            }

            showMessage(ids.length + ' Mail has been grouped as ' + group.toUpperCase());
            clearSelection();
            setTimeout(() => {
                searchMails(false);
            });
        }
    };

    const setAction = (type: any) => {
        if (ids.length) {
            const totalSelected = ids.length;
            let items = filteredMailList.filter((d: any) => ids.includes(d.id));
            for (let item of items) {
                if (type === 'trash') {
                    item.type = 'trash';
                    item.group = '';
                    item.isStar = false;
                    item.isImportant = false;
                    showMessage(totalSelected + ' Mail has been deleted.');
                    searchMails(false);
                } else if (type === 'read') {
                    item.isUnread = false;
                    showMessage(totalSelected + ' Mail has been marked as Read.');
                } else if (type === 'unread') {
                    item.isUnread = true;
                    showMessage(totalSelected + ' Mail has been marked as UnRead.');
                } else if (type === 'important') {
                    item.isImportant = true;
                    showMessage(totalSelected + ' Mail has been marked as Important.');
                } else if (type === 'unimportant') {
                    item.isImportant = false;
                    showMessage(totalSelected + ' Mail has been marked as UnImportant.');
                } else if (type === 'star') {
                    item.isStar = true;
                    showMessage(totalSelected + ' Mail has been marked as Star.');
                }
                //restore & permanent delete
                else if (type === 'restore') {
                    item.type = 'inbox';
                    showMessage(totalSelected + ' Mail Restored.');
                    searchMails(false);
                } else if (type === 'delete') {
                    setMailList(mailList.filter((d: any) => d.id !== item.id));
                    showMessage(totalSelected + ' Mail Permanently Deleted.');
                    searchMails(false);
                }
            }
            clearSelection();
        }
    };

    const selectMail = (item: any) => {
        if (item) {
            if (item.type !== 'draft') {
                if (item && item.isUnread) {
                    item.isUnread = false;
                }
                setSelectedMail(item);
            } else {
                openMail('draft', item);
            }
        } else {
            setSelectedMail('');
        }
    };

    const setStar = (mailId: number) => {
        if (mailId) {
            let item = filteredMailList.find((d: any) => d.id === mailId);
            item.isStar = !item.isStar;
            setTimeout(() => {
                searchMails(false);
            });
        }
    };

    const setImportant = (mailId: number) => {
        if (mailId) {
            let item = filteredMailList.find((d: any) => d.id === mailId);
            item.isImportant = !item.isImportant;
            setTimeout(() => {
                searchMails(false);
            });
        }
    };

    const showTime = (item: any) => {
        const displayDt: any = new Date(item.date);
        const cDt: any = new Date();
        if (displayDt.toDateString() === cDt.toDateString()) {
            return item.time;
        } else {
            if (displayDt.getFullYear() === cDt.getFullYear()) {
                var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return monthNames[displayDt.getMonth()] + ' ' + String(displayDt.getDate()).padStart(2, '0');
            } else {
                return String(displayDt.getMonth() + 1).padStart(2, '0') + '/' + String(displayDt.getDate()).padStart(2, '0') + '/' + displayDt.getFullYear();
            }
        }
    };

    const openMail = (type: string, item: any) => {
        if (type === 'add') {
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
                title: 'Re: ' + data.title,
                displayDescription: 'Re: ' + data.title,
            });
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

    const saveNotice = async (type: any, id: any) => {
        if (!params.to) {
            showMessage('필요 내용을 작성해 주세요.', 'error');
            return false;
        }
        if (!params.title) {
            showMessage('제목을 작성해 주세요.', 'error');
            return false;
        }
    
        let maxId = 0;
        if (!params.id) {
            maxId = mailList.length ? mailList.reduce((max, character) => (character.id > max ? character.id : max), mailList[0].id) : 0;
        }
        let cDt = new Date();
    
        let obj: any = {
            id: maxId + 1,
            path: '',
            firstName: '',
            lastName: '',
            email: params.to,
            date: cDt.getMonth() + 1 + '/' + cDt.getDate() + '/' + cDt.getFullYear(),
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
    
        if (type === 'save' || type === 'save_reply' || type === 'save_forward') {
            obj.type = 'draft';
            mailList.splice(0, 0, obj);
            searchMails();
            showMessage('Mail has been saved successfully to draft.');
        } else if (type === 'send' || type === 'reply' || type === 'forward') {
            try {
                const formData = new FormData();
                formData.append("title", params.title);
                formData.append("content", params.description);
    
                if (selectedFiles) {
                    Array.from(selectedFiles).forEach(file => {
                        formData.append("file", file);
                    });
                }
    
                const response = await teacherNotice(formData);
    
                if (response.ok) {
                    console.log("Notice successfully created");
                } else {
                    console.error("Failed to create notice");
                }
    
                obj.type = 'sent_notice';
                mailList.splice(0, 0, obj); // Add the new notice to the mailList
                searchMails(); // Refresh the mail list to show the new notice
    
                showMessage('공지가 성공적으로 작성되었습니다.');
            } catch (error) {
                showMessage('공지 작성에 실패했습니다.', 'error');
            }
            obj.type = 'sent_notice';
            mailList.splice(0, 0, obj);
            searchMails();
            showMessage('공지를 성공적으로 작성하였습니다.');
        }
    
        setSelectedMail(null);
        setIsEdit(false);
    };

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
                                공지 작성하기
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
                                        <div className="ltr:ml-3 rtl:mr-3">전체 공지</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {mailList && mailList.filter((d) => d.type === 'inbox').length}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'star' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedTab('star');
                                        tabChanged('star');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconStar className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">중요 공지</div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'sent_notice' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedTab('sent_notice');
                                        tabChanged('sent_notice');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconSend className="shrink-0" />

                                        <div className="ltr:ml-3 rtl:mr-3">보낸 공지</div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'draft' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedTab('draft');
                                        tabChanged('draft');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconFile className="w-4.5 h-4.5" />
                                        <div className="ltr:ml-3 rtl:mr-3">임시 저장</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {mailList && mailList.filter((d) => d.type === 'draft').length}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'trash' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedTab('trash');
                                        tabChanged('trash');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconTrashLines className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">휴지통</div>
                                    </div>
                                </button>

                                <Disclosure as="div">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="w-full flex items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10">
                                                <IconCaretDown className={`w-5 h-5 shrink-0 ${open && 'rotate-180'}`} />

                                                <div className="ltr:ml-3 rtl:mr-3">{open ? '숨기기' : '더보기'}</div>
                                            </Disclosure.Button>

                                            <Disclosure.Panel as="ul" unmount={false} className="mt-1 space-y-1">
                                                <li>
                                                    <button
                                                        type="button"
                                                        className={`w-full flex items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'archive' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                                            }`}
                                                        onClick={() => {
                                                            setSelectedTab('archive');
                                                            tabChanged('archive');
                                                        }}
                                                    >
                                                        <IconArchive className="shrink-0" />
                                                        <div className="ltr:ml-3 rtl:mr-3">저장됨</div>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        className={`w-full flex items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${!isEdit && selectedTab === 'important' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                                            }`}
                                                        onClick={() => {
                                                            setSelectedTab('important');
                                                            tabChanged('important');
                                                        }}
                                                    >
                                                        <IconBookmark className="shrink-0" />
                                                        <div className="ltr:ml-3 rtl:mr-3">라벨</div>
                                                    </button>
                                                </li>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            </div>
                        </PerfectScrollbar>


                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    {!selectedMail && !isEdit && (
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center flex-wrap-reverse gap-4 p-4">
                                <div className="flex items-center w-full sm:w-auto">
                                    <div className="ltr:mr-4 rtl:ml-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            checked={checkAllCheckbox()}
                                            value={ids}
                                            onChange={() => {
                                                if (ids.length === filteredMailList.length) {
                                                    setIds([]);
                                                } else {
                                                    let checkedIds = filteredMailList.map((d: any) => {
                                                        return d.id;
                                                    });
                                                    setIds([...checkedIds]);
                                                }
                                            }}
                                            onClick={(event) => event.stopPropagation()}
                                        />
                                    </div>

                                    <div className="ltr:mr-4 rtl:ml-4">
                                        <Tippy content="Refresh">
                                            <button type="button" className="hover:text-primary flex items-center" onClick={() => refreshMails()}>
                                                <IconRefresh />
                                            </button>
                                        </Tippy>
                                    </div>

                                    {selectedTab !== 'trash' && (
                                        <ul className="flex grow items-center sm:flex-none gap-4 ltr:sm:mr-4 rtl:sm:ml-4">
                                            <li>
                                                <div>
                                                    <Tippy content="Archive">
                                                        <button type="button" className="hover:text-primary flex items-center" onClick={setArchive}>
                                                            <IconArchive />
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <Tippy content="Spam">
                                                        <button type="button" className="hover:text-primary flex items-center" onClick={setSpam}>
                                                            <IconInfoHexagon />
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="dropdown">
                                                    <Dropdown
                                                        offset={[0, 1]}
                                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                        btnClassName="hover:text-primary flex items-center"
                                                        button={
                                                            <Tippy content="Group">
                                                                <span>
                                                                    <IconWheel />
                                                                </span>
                                                            </Tippy>
                                                        }
                                                    >
                                                        <ul className="text-sm font-medium">
                                                            <li>
                                                                <button type="button" onClick={() => setGroup('personal')}>
                                                                    <div className="w-2 h-2 rounded-full bg-primary ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                                    Personal
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button type="button" onClick={() => setGroup('work')}>
                                                                    <div className="w-2 h-2 rounded-full bg-warning ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                                    Work
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button type="button" onClick={() => setGroup('social')}>
                                                                    <div className="w-2 h-2 rounded-full bg-success ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                                    Social
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button type="button" onClick={() => setGroup('private')}>
                                                                    <div className="w-2 h-2 rounded-full bg-danger ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                                    Private
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </Dropdown>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="dropdown">
                                                    <Dropdown
                                                        offset={[0, 1]}
                                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                        btnClassName="hover:text-primary flex items-center"
                                                        button={<IconHorizontalDots className="rotate-90 opacity-70" />}
                                                    >
                                                        <ul className="whitespace-nowrap">
                                                            <li>
                                                                <button type="button" onClick={() => setAction('read')}>
                                                                    <IconOpenBook className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                    Mark as Read
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button type="button" onClick={() => setAction('unread')}>
                                                                    <IconBook className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                    Mark as Unread
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button type="button" onClick={() => setAction('trash')}>
                                                                    <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                    Trash
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </Dropdown>
                                                </div>
                                            </li>
                                        </ul>
                                    )}

                                    {selectedTab === 'trash' && (
                                        <ul className="flex flex-1 items-center sm:flex-none gap-4 ltr:sm:mr-3 rtl:sm:ml-4">
                                            <li>
                                                <div>
                                                    <Tippy content="Permanently Delete">
                                                        <button type="button" className="block hover:text-primary" onClick={() => setAction('delete')}>
                                                            <IconTrash />
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <Tippy content="Restore">
                                                        <button type="button" className="block hover:text-primary" onClick={() => setAction('restore')}>
                                                            <IconRestore />
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </li>
                                        </ul>
                                    )}
                                </div>

                                <div className="flex justify-between items-center sm:w-auto w-full">
                                    <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                        <button type="button" className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" onClick={() => setIsShowMailMenu(!isShowMailMenu)}>
                                            <IconMenu />
                                        </button>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                className="form-input ltr:pr-8 rtl:pl-8 peer"
                                                placeholder="공지 검색하기"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                onKeyUp={() => searchMails()}
                                            />
                                            <div className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                                <IconSearch />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="ltr:mr-4 rtl:ml-4">
                                            <Tippy content="Settings">
                                                <button type="button" className="hover:text-primary">
                                                    <IconSettings />
                                                </button>
                                            </Tippy>
                                        </div>
                                        <div>
                                            <Tippy content="Help">
                                                <button type="button" className="hover:text-primary">
                                                    <IconHelpCircle className="w-6 h-6" />
                                                </button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

                            <div className="flex flex-wrap flex-col md:flex-row xl:w-auto justify-between items-center px-4 pb-4">
                                <div className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                    <button
                                        type="button"
                                        className={`btn btn-outline-primary flex ${selectedTab === 'personal' ? 'text-white bg-primary' : ''}`}
                                        onClick={() => {
                                            setSelectedTab('personal');
                                            tabChanged('personal');
                                        }}
                                    >
                                        <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        전체
                                    </button>

                                    <button
                                        type="button"
                                        className={`btn btn-outline-warning flex ${selectedTab === 'work' ? 'text-white bg-warning' : ''}`}
                                        onClick={() => {
                                            setSelectedTab('work');
                                            tabChanged('work');
                                        }}
                                    >
                                        <IconMessage2 className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        과목
                                    </button>

                                    <button
                                        type="button"
                                        className={`btn btn-outline-success flex ${selectedTab === 'social' ? 'text-white bg-success' : ''}`}
                                        onClick={() => {
                                            setSelectedTab('social');
                                            tabChanged('social');
                                        }}
                                    >
                                        <IconUsers className="ltr:mr-2 rtl:ml-2" />
                                        담당 학급
                                    </button>

                                    <button
                                        type="button"
                                        className={`btn btn-outline-danger flex ${selectedTab === 'private' ? 'text-white bg-danger' : ''}`}
                                        onClick={() => {
                                            setSelectedTab('private');
                                            tabChanged('private');
                                        }}
                                    >
                                        <IconTag className="ltr:mr-2 rtl:ml-2" />
                                        중요
                                    </button>
                                </div>

                                <div className="mt-4 md:flex-auto flex-1">
                                    <div className="flex items-center md:justify-end justify-center">
                                        <div className="ltr:mr-3 rtl:ml-3">{pager.startIndex + 1 + '-' + (pager.endIndex + 1) + ' of ' + filteredMailList.length}</div>
                                        <button
                                            type="button"
                                            disabled={pager.currentPage === 1}
                                            className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                            onClick={() => {
                                                pager.currentPage--;
                                                searchMails(false);
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
                                                searchMails(false);
                                            }}
                                        >
                                            <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

                            {pagedMails.length ? (
                                <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                    <table className="table-hover">
                                        <tbody>
                                            {pagedMails.map((mail: any) => {
                                                return (
                                                    <tr key={mail.id} className="cursor-pointer" onClick={() => selectMail(mail)}>
                                                        <td>
                                                            <div className="flex items-center whitespace-nowrap">
                                                                <div className="ltr:mr-3 rtl:ml-3">
                                                                    {ids.includes(mail.id)}
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`chk-${mail.id}`}
                                                                        value={mail.id}
                                                                        checked={ids.length ? ids.includes(mail.id) : false}
                                                                        onChange={() => handleCheckboxChange(mail.id)}
                                                                        onClick={(event) => event.stopPropagation()}
                                                                        className="form-checkbox"
                                                                    />
                                                                </div>
                                                                <div className="ltr:mr-3 rtl:ml-3">
                                                                    <Tippy content="Star">
                                                                        <button
                                                                            type="button"
                                                                            className={`enabled:hover:text-warning disabled:opacity-60 flex items-center ${mail.isStar ? 'text-warning' : ''}`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setStar(mail.id);
                                                                            }}
                                                                            disabled={selectedTab === 'trash'}
                                                                        >
                                                                            <IconStar className={mail.isStar ? 'fill-warning' : ''} />
                                                                        </button>
                                                                    </Tippy>
                                                                </div>
                                                                <div className="ltr:mr-3 rtl:ml-3">
                                                                    <Tippy content="Important">
                                                                        <button
                                                                            type="button"
                                                                            className={`enabled:hover:text-primary disabled:opacity-60 rotate-90 flex items-center ${mail.isImportant ? 'text-primary' : ''
                                                                                }`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setImportant(mail.id);
                                                                            }}
                                                                            disabled={selectedTab === 'trash'}
                                                                        >
                                                                            <IconBookmark bookmark={false} className={`w-4.5 h-4.5 ${mail.isImportant && 'fill-primary'}`} />
                                                                        </button>
                                                                    </Tippy>
                                                                </div>
                                                                <div
                                                                    className={`dark:text-gray-300 whitespace-nowrap font-semibold ${!mail.isUnread ? 'text-gray-500 dark:text-gray-500 font-normal' : ''
                                                                        }`}
                                                                >
                                                                    {mail.firstName ? mail.firstName + ' ' + mail.lastName : mail.email}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="font-medium text-white-dark overflow-hidden min-w-[300px] line-clamp-1">
                                                                <span className={`${mail.isUnread ? 'text-gray-800 dark:text-gray-300 font-semibold' : ''}`}>
                                                                    <span>{mail.title}</span> &minus;
                                                                    <span> {mail.displayDescription}</span>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center">
                                                                <div
                                                                    className={`w-2 h-2 rounded-full ${(mail.group === 'personal' && 'bg-primary') ||
                                                                        (mail.group === 'work' && 'bg-warning') ||
                                                                        (mail.group === 'social' && 'bg-success') ||
                                                                        (mail.group === 'private' && 'bg-danger')
                                                                        }`}
                                                                ></div>
                                                                {mail.attachments && (
                                                                    <div className="ltr:ml-4 rtl:mr-4">
                                                                        <IconPaperclip />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap font-medium ltr:text-right rtl:text-left">{showTime(mail)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="grid place-content-center min-h-[300px] font-semibold text-lg h-full">No data available</div>
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
                                    <h4 className="text-base md:text-lg font-medium ltr:mr-2 rtl:ml-2">{selectedMail.title}</h4>
                                    <div className="badge bg-info hover:top-0">{selectedMail.type}</div>
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
                                    <div className="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                                        {selectedMail.path ? (
                                            <img src={`/assets/images/${selectedMail.path}`} className="h-12 w-12 rounded-full object-cover" alt="avatar" />
                                        ) : (
                                            <div className="border border-gray-300 dark:border-gray-800 rounded-full p-3">
                                                <IconUser className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ltr:mr-2 rtl:ml-2 flex-1">
                                        <div className="flex items-center">
                                            <div className="text-lg ltr:mr-4 rtl:ml-4 whitespace-nowrap">
                                                {selectedMail.firstName ? selectedMail.firstName + ' ' + selectedMail.lastName : selectedMail.email}
                                            </div>
                                            {selectedMail.group && (
                                                <div className="ltr:mr-4 rtl:ml-4">
                                                    <Tippy content={selectedMail.group} className="capitalize">
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${(selectedMail.group === 'personal' && 'bg-primary') ||
                                                                (selectedMail.group === 'work' && 'bg-warning') ||
                                                                (selectedMail.group === 'social' && 'bg-success') ||
                                                                (selectedMail.group === 'private' && 'bg-danger')
                                                                }`}
                                                        ></div>
                                                    </Tippy>
                                                </div>
                                            )}
                                            <div className="text-white-dark whitespace-nowrap">1 days ago</div>
                                        </div>
                                        <div className="text-white-dark flex items-center">
                                            <div className="ltr:mr-1 rtl:ml-1">{selectedMail.type === 'sent_notice' ? selectedMail.email : 'to me'}</div>
                                            <div className="dropdown">
                                                <Dropdown
                                                    offset={[0, 5]}
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    btnClassName="hover:text-primary flex items-center"
                                                    button={<IconCaretDown className="w-5 h-5" />}
                                                >
                                                    <ul className="sm:w-56">
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">From:</div>
                                                                <div className="flex-1">{selectedMail.type === 'sent_notice' ? 'vristo@gmail.com' : selectedMail.email}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">To:</div>
                                                                <div className="flex-1">{selectedMail.type !== 'sent_notice' ? 'vristo@gmail.com' : selectedMail.email}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">Date:</div>
                                                                <div className="flex-1">{selectedMail.date + ', ' + selectedMail.time}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">Subject:</div>
                                                                <div className="flex-1">{selectedMail.title}</div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                                            <Tippy content="Star">
                                                <button
                                                    type="button"
                                                    className={`enabled:hover:text-warning disabled:opacity-60 ${selectedMail.isStar ? 'text-warning' : ''}`}
                                                    onClick={() => setStar(selectedMail.id)}
                                                    disabled={selectedTab === 'trash'}
                                                >
                                                    <IconStar className={selectedMail.isStar ? 'fill-warning' : ''} />
                                                </button>
                                            </Tippy>
                                            <Tippy content="Important">
                                                <button
                                                    type="button"
                                                    className={`enabled:hover:text-primary disabled:opacity-60 ${selectedMail.isImportant ? 'text-primary' : ''}`}
                                                    onClick={() => setImportant(selectedMail.id)}
                                                    disabled={selectedTab === 'trash'}
                                                >
                                                    <IconBookmark bookmark={false} className={`w-4.5 h-4.5 rotate-90 ${selectedMail.isImportant && 'fill-primary'}`} />
                                                </button>
                                            </Tippy>
                                            <Tippy content="Reply">
                                                <button type="button" className="hover:text-info" onClick={() => openMail('reply', selectedMail)}>
                                                    <IconArrowBackward className="rtl:hidden" />
                                                    <IconArrowForward className="ltr:hidden" />
                                                </button>
                                            </Tippy>
                                            <Tippy content="Forward">
                                                <button type="button" className="hover:text-info" onClick={() => openMail('forward', selectedMail)}>
                                                    <IconArrowBackward className="ltr:hidden" />
                                                    <IconArrowForward className="rtl:hidden" />
                                                </button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="mt-8 prose dark:prose-p:text-white prose-p:text-sm md:prose-p:text-sm max-w-full prose-img:inline-block prose-img:m-0"
                                    dangerouslySetInnerHTML={{ __html: selectedMail.description }}
                                ></div>
                                <p className="mt-4">Best Regards,</p>
                                <p>{selectedMail.firstName + ' ' + selectedMail.lastName}</p>

                                {selectedMail.attachments && (
                                    <div className="mt-8">
                                        <div className="text-base mb-4">Attachments</div>
                                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                                        <div className="flex items-center flex-wrap mt-6">
                                            {selectedMail.attachments.map((attachment: any, i: number) => {
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

                    {isEdit && (
                        <div className="relative">
                            <div className="py-4 px-6 flex items-center">
                                <button type="button" className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" onClick={() => setIsShowMailMenu(!isShowMailMenu)}>
                                    <IconMenu />
                                </button>
                                <h4 className="text-lg text-gray-600 dark:text-gray-400 font-medium">공지 작성하기</h4>
                            </div>
                            <div className="h-px bg-gradient-to-l from-indigo-900/20 via-black dark:via-white to-indigo-900/20 opacity-[0.1]"></div>
                            <form className="p-6 grid gap-6">
                                <div>
                                    <input
                                        id="to"
                                        type="text"
                                        className="form-input"
                                        placeholder="공지 대상"
                                        defaultValue={params.to}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                </div>

                                <div>
                                    <input id="cc" type="text" className="form-input" placeholder="카테고리" defaultValue={params.cc} onChange={(e) => changeValue(e)} />
                                </div>

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
                                <div className="flex items-center ltr:ml-auto rtl:mr-auto mt-8">
                                    <button type="button" className="btn btn-outline-danger ltr:mr-3 rtl:ml-3" onClick={closeMsgPopUp}>
                                        취소
                                    </button>
                                    <button type="button" className="btn btn-success ltr:mr-3 rtl:ml-3" onClick={() => saveNotice('save', null)}>
                                        임시 저장
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => saveNotice('send', params.id)}>
                                        공지 작성하기
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherNotice;
