import { useState, useEffect } from 'react';
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
import IconBookmark from '../../components/Icon/IconBookmark';
import { teacherNotice } from '../../service/form';
import IconMenu from '../../components/Icon/IconMenu';
import IconSearch from '../../components/Icon/IconSearch';
import IconUser from '../../components/Icon/IconUser';
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

const Homework = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Homework'));
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

        if (params.file && params.file.length) {
            obj.attachments = [];
            for (let file of params.file) {
                let flObj = {
                    name: file.name,
                    size: getFileSize(file.size),
                    type: getFileType(file.type),
                };
                obj.attachments.push(flObj);
            }
        }
        if (type === 'save' || type === 'save_reply' || type === 'save_forward') {
            obj.type = 'draft';
            mailList.splice(0, 0, obj);
            searchMails();
            showMessage('Mail has been saved successfully to draft.');
        } else if (type === 'send' || type === 'reply' || type === 'forward') {
            try {
                const response = await teacherNotice(params.title, params.description);
                response()
                obj.type = 'sent_notice';
                mailList.splice(0, 0, obj); // Add the new notice to the mailList
                searchMails(); // Refresh the mail list to show the new notice
    
                showMessage('과제가 성공적으로 작성되었습니다.');
            } catch (error) {
                showMessage('과제 작성에 실패했습니다.', 'error');
            }
            obj.type = 'sent_notice';
            mailList.splice(0, 0, obj);
            searchMails();
            showMessage('과제를 성공적으로 작성하였습니다.');
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
                <div className="panel p-5 flex-1 overflow-x-hidden h-full">
                    {!selectedMail && !isEdit && (
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center flex-wrap-reverse gap-4 p-4">
                                <div className="flex justify-between items-center sm:w-auto w-full">
                                <div>
                                    <button
                                        type="button"
                                        className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3"
                                        onClick={() => setIsShowMailMenu(!isShowMailMenu)}
                                    >
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
                                    <div className="flex flex-col h-full pb-16">
                                        <div className="pb-5">
                                            <button className="btn btn-primary w-full" type="button" onClick={() => openMail('add', null)}>
                                                과제 작성하기
                                            </button>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                type="button"
                                                className={`flex-1 flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                                    !isEdit && selectedTab === 'inbox' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                                }`}
                                                onClick={() => {
                                                    setSelectedTab('inbox');
                                                    tabChanged('inbox');
                                                }}
                                            >
                                                <div className="flex items-center w-40">
                                                    <IconMail className="w-5 h-5 shrink-0" />
                                                    <div className="ltr:ml-3 rtl:mr-3">전체 과제</div>
                                                </div>
                                                <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                                    {mailList && mailList.filter((d) => d.type === 'inbox').length}
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                className={`flex-1 flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                                    !isEdit && selectedTab === 'sent_notice' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                                }`}
                                                onClick={() => {
                                                    setSelectedTab('sent_notice');
                                                    tabChanged('sent_notice');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IconSend className="shrink-0" />
                                                    <div className="ltr:ml-3 rtl:mr-3">과제 확인</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
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
                                                                
                                                                <div
                                                                    className={`dark:text-gray-300 whitespace-nowrap font-semibold ${
                                                                        !mail.isUnread ? 'text-gray-500 dark:text-gray-500 font-normal' : ''
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
                                <h4 className="text-lg text-gray-600 dark:text-gray-400 font-medium">과제 작성하기</h4>
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
                                        accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                                        required
                                    />
                                </div>
                                <div className="flex items-center ltr:ml-auto rtl:mr-auto mt-8">
                                    <button type="button" className="btn btn-outline-danger ltr:mr-3 rtl:ml-3" onClick={closeMsgPopUp}>
                                        취소
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => saveNotice('send', params.id)}>
                                        과제 작성하기
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

export default Homework;