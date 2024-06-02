import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
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

const Assignment = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('강의 노트'));
    });
    const [notesList, setNoteList] = useState([
        {
            id: 1,
            user: '김철수',
            thumb: 'profile-16.jpeg',
            title: '수학 문제 풀이',
            description: '5월 1일 수업에서 다룬 수학 문제 풀이입니다.',
            date: '05/01/2024',
            isFav: false,
            tag: '수학',
        },
        {
            id: 2,
            user: '이영희',
            thumb: 'profile-14.jpeg',
            title: '과학 실험 보고서',
            description: '6월 2일 과학 실험 보고서 제출 안내입니다.',
            date: '06/02/2024',
            isFav: true,
            tag: '과학',
        },
        {
            id: 3,
            user: '박민수',
            thumb: 'profile-15.jpeg',
            title: '역사 발표 준비',
            description: '5월 4일 역사 발표 준비 자료입니다.',
            date: '05/04/2024',
            isFav: false,
            tag: '역사',
        },
        {
            id: 4,
            user: '최지우',
            thumb: 'profile-16.jpeg',
            title: '영어 단어 시험',
            description: '6월 8일 영어 단어 시험 범위입니다.',
            date: '06/08/2024',
            isFav: false,
            tag: '영어',
        },
        {
            id: 5,
            user: '홍길동',
            thumb: 'profile-17.jpeg',
            title: '음악 감상문',
            description: '5월 9일 음악 감상문 제출 안내입니다.',
            date: '05/09/2024',
            isFav: false,
            tag: '음악',
        },
    ]);

    const defaultParams = { id: null, title: '', description: '', tag: '', user: '', thumb: '' };
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [isDeleteNoteModal, setIsDeleteNoteModal] = useState<any>(false);
    const [isShowNoteMenu, setIsShowNoteMenu] = useState<any>(false);
    const [isViewNoteModal, setIsViewNoteModal] = useState<any>(false);
    const [filterdNotesList, setFilterdNotesList] = useState<any>([]);
    const [selectedTab, setSelectedTab] = useState<any>('all');
    const [deletedNote, setDeletedNote] = useState<any>(null);


    const searchNotes = () => {
        if (selectedTab !== 'fav') {
            if (selectedTab !== 'all' || selectedTab === 'delete') {
                setFilterdNotesList(notesList.filter((d) => d.tag === selectedTab));
            } else {
                setFilterdNotesList(notesList);
            }
        } else {
            setFilterdNotesList(notesList.filter((d) => d.isFav));
        }
    };

    const saveNote = () => {
        if (!params.title) {
            showMessage('제목을 입력해 주세요.', 'error');
            return false;
        }
        if (params.id) {
            //update task
            let note: any = notesList.find((d: any) => d.id === params.id);
            note.title = params.title;
            note.user = params.user;
            note.description = params.description;
            note.tag = params.tag;
        } else {
            //add note
            let maxNoteId = notesList.reduce((max: any, character: any) => (character.id > max ? character.id : max), notesList[0].id);
            if (!maxNoteId) {
                maxNoteId = 0;
            }
            let dt = new Date();
            let note = {
                id: maxNoteId + 1,
                title: params.title,
                user: params.user,
                thumb: 'profile-21.jpeg',
                description: params.description,
                date: dt.getDate() + '/' + Number(dt.getMonth()) + 1 + '/' + dt.getFullYear(),
                isFav: false,
                tag: params.tag,
            };

            notesList.splice(0, 0, note);
            searchNotes();
        }
        showMessage('강의 노트 생성이 완료되었습니다.');
        setAddContactModal(false);
        searchNotes();
    };

    const tabChanged = (type: string) => {
        setSelectedTab(type);
        setIsShowNoteMenu(false);
        searchNotes();
    };

    const setFav = (note: any) => {
        let list = filterdNotesList;
        let item = list.find((d: any) => d.id === note.id);
        item.isFav = !item.isFav;

        setFilterdNotesList([...list]);
        if (selectedTab !== 'all' || selectedTab === 'delete') {
            searchNotes();
        }
    };

    const setTag = (note: any, name: string = '') => {
        let list = filterdNotesList;
        let item = filterdNotesList.find((d: any) => d.id === note.id);
        item.tag = name;
        setFilterdNotesList([...list]);
        if (selectedTab !== 'all' || selectedTab === 'delete') {
            searchNotes();
        }
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const deleteNoteConfirm = (note: any) => {
        setDeletedNote(note);
        setIsDeleteNoteModal(true);
    };

    const viewNote = (note: any) => {
        setParams(note);
        setIsViewNoteModal(true);
    };

    const editNote = (note: any = null) => {
        setIsShowNoteMenu(false);
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (note) {
            let json1 = JSON.parse(JSON.stringify(note));
            setParams(json1);
        }
        setAddContactModal(true);
    };

    const deleteNote = () => {
        setNoteList(notesList.filter((d: any) => d.id !== deletedNote.id));
        searchNotes();
        showMessage('강의 노트 삭제가 완료되었습니다.');
        setIsDeleteNoteModal(false);
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
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [selectedTab, notesList]);

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
                            <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">강의 노트</h3>
                        </div>

                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] my-4"></div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'all' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('all')}
                                >
                                    <div className="flex items-center">
                                        <IconNotesEdit className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">모든 강의 노트</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        selectedTab === 'fav' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('fav')}
                                >
                                    <div className="flex items-center">
                                        <IconStar className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">중요한 강의 노트</div>
                                    </div>
                                </button>
                                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                                <div className="px-1 py-3 text-white-dark">태그</div>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-primary ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'tag1' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('tag1')}
                                >
                                    <IconSquareRotated className="fill-primary shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">tag1</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-warning ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'tag2' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('tag2')}
                                >
                                    <IconSquareRotated className="fill-warning shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">tag2</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-info ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'tag3' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('tag3')}
                                >
                                    <IconSquareRotated className="fill-info shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">tag3</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-danger ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${
                                        selectedTab === 'tag4' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                    }`}
                                    onClick={() => tabChanged('tag4')}
                                >
                                    <IconSquareRotated className="fill-danger shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">tag4</div>
                                </button>
                            </div>
                        </PerfectScrollbar>
                    </div>
                    <div className="ltr:left-0 rtl:right-0 absolute bottom-0 p-4 w-full">
                        <button className="btn btn-primary w-full" type="button" onClick={() => editNote()}>
                            <IconPlus className="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                            강의 노트 생성
                        </button>
                    </div>
                </div>
                <div className="panel flex-1 overflow-auto h-full">
                    <div className="pb-5">
                        <button type="button" className="xl:hidden hover:text-primary" onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}>
                            <IconMenu />
                        </button>
                    </div>
                    {filterdNotesList.length ? (
                        <div className="sm:min-h-[300px] min-h-[400px]">
                            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                                {filterdNotesList.map((note: any) => {
                                    return (
                                        <div
                                            className={`panel pb-12 ${
                                                note.tag === 'tag1'
                                                    ? 'bg-primary-light shadow-primary'
                                                    : note.tag === 'tag2'
                                                    ? 'bg-warning-light shadow-warning'
                                                    : note.tag === 'tag3'
                                                    ? 'bg-info-light shadow-info'
                                                    : note.tag === 'tag4'
                                                    ? 'bg-danger-light shadow-danger'
                                                    : 'dark:shadow-dark'
                                            }`}
                                            key={note.id}
                                        >
                                            <div className="min-h-[142px]">
                                                <div className="flex justify-between">
                                                    <div className="flex items-center w-max">
                                                        <div className="flex-none">
                                                            {note.thumb && (
                                                                <div className="p-0.5 bg-gray-300 dark:bg-gray-700 rounded-full">
                                                                    <img className="h-8 w-8 rounded-full object-cover" alt="img" src={`/assets/images/${note.thumb}`} />
                                                                </div>
                                                            )}

                                                            {!note.thumb && note.user && (
                                                                <div className="grid place-content-center h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 text-sm font-semibold">
                                                                    {note.user.charAt(0) + '' + note.user.charAt(note.user.indexOf('') + 1)}
                                                                </div>
                                                            )}
                                                            {!note.thumb && !note.user && (
                                                                <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                                                    <IconUser className="w-4.5 h-4.5" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ltr:ml-2 rtl:mr-2">
                                                            <div className="font-semibold">{note.user}</div>
                                                            <div className="text-sx text-white-dark">{note.date}</div>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown">
                                                        <Dropdown
                                                            offset={[0, 5]}
                                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                            btnClassName="text-primary"
                                                            button={<IconHorizontalDots className="rotate-90 opacity-70 hover:opacity-100" />}
                                                        >
                                                            <ul className="text-sm font-medium">
                                                                <li>
                                                                    <button type="button" onClick={() => editNote(note)}>
                                                                        <IconPencil className="w-4 h-4 ltr:mr-3 rtl:ml-3 shrink-0" />
                                                                        수정
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => deleteNoteConfirm(note)}>
                                                                        <IconTrashLines className="w-4.5 h-4.5 ltr:mr-3 rtl:ml-3 shrink-0" />
                                                                        삭제
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => viewNote(note)}>
                                                                        <IconEye className="w-4.5 h-4.5 ltr:mr-3 rtl:ml-3 shrink-0" />
                                                                        세부 보기
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mt-4">{note.title}</h4>
                                                    <p className="text-white-dark mt-2">{note.description}</p>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-5 left-0 w-full px-5">
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="dropdown fdfdf">
                                                        <Dropdown
                                                            offset={[0, 5]}
                                                            placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                            btnClassName={`${
                                                                note.tag === 'tag1'
                                                                    ? 'text-primary'
                                                                    : note.tag === 'tag2'
                                                                    ? 'text-warning'
                                                                    : note.tag === 'tag3'
                                                                    ? 'text-info'
                                                                    : note.tag === 'tag4'
                                                                    ? 'text-danger'
                                                                    : ''
                                                            }`}
                                                            button={
                                                                <span>
                                                                    <IconSquareRotated
                                                                        className={
                                                                            note.tag === 'tag1'
                                                                                ? 'fill-primary'
                                                                                : note.tag === 'tag2'
                                                                                ? 'fill-warning'
                                                                                : note.tag === 'tag3'
                                                                                ? 'fill-info'
                                                                                : note.tag === 'tag4'
                                                                                ? 'fill-danger'
                                                                                : ''
                                                                        }
                                                                    />
                                                                </span>
                                                            }
                                                        >
                                                            <ul className="text-sm font-medium">
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'tag1')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-primary text-primary" />
                                                                        tag1
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'tag2')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-warning text-warning" />
                                                                        tag2
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'tag3')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-info text-info" />
                                                                        tag3
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'tag4')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-danger text-danger" />
                                                                        tag4
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <button type="button" className="text-danger" onClick={() => deleteNoteConfirm(note)}>
                                                            <IconTrashLines />
                                                        </button>
                                                        <button type="button" className="text-warning group ltr:ml-2 rtl:mr-2" onClick={() => setFav(note)}>
                                                            <IconStar className={`w-4.5 h-4.5 group-hover:fill-warning ${note.isFav && 'fill-warning'}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">No data available</div>
                    )}

                    <Transition appear show={addContactModal} as={Fragment}>
                        <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
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
                                                onClick={() => setAddContactModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <IconX />
                                            </button>
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                {params.id ? '강의 노트 수정' : '강의 노트 추가'}
                                            </div>
                                            <div className="p-5">
                                                <form>
                                                    <div className="mb-5">
                                                        <label htmlFor="title">제목</label>
                                                        <input id="title" type="text" placeholder="제목을 입력해 주세요" className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                                                    </div>
                                                    <div className="mb-5">
                                                        <label htmlFor="name">옵션</label>
                                                        <select id="user" className="form-select" value={params.user} onChange={(e) => changeValue(e)}>
                                                            <option value="">옵션을 선택해주세요</option>
                                                            <option value="옵션 1">옵션 1</option>
                                                            <option value="옵션 2">옵션 2</option>
                                                            <option value="옵션 3">옵션 3</option>
                                                          
                                                        </select>
                                                    </div>
                                                    <div className="mb-5">
                                                        <label htmlFor="tag">대상을 선택해 주세요</label>
                                                        <select id="tag" className="form-select" value={params.tag} onChange={(e) => changeValue(e)}>
                                                            <option value="">없음</option>
                                                            <option value="tag1">tag1</option>
                                                            <option value="tag2">tag2</option>
                                                            <option value="tag3">tag3</option>
                                                            <option value="tag4">tag4</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-5">
                                                        <label htmlFor="desc">세부 설명</label>
                                                        <textarea
                                                            id="description"
                                                            rows={3}
                                                            className="form-textarea resize-none min-h-[130px]"
                                                            placeholder="세부 내용 입력"
                                                            value={params.description}
                                                            onChange={(e) => changeValue(e)}
                                                        ></textarea>
                                                    </div>
                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" className="btn btn-outline-danger gap-2" onClick={() => setAddContactModal(false)}>
                                                            취소 
                                                        </button>
                                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveNote}>
                                                            {params.id ? '강의 노트 수정' : '강의 노트 추가'}
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

                    <Transition appear show={isDeleteNoteModal} as={Fragment}>
                        <Dialog as="div" open={isDeleteNoteModal} onClose={() => setIsDeleteNoteModal(false)} className="relative z-[51]">
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
                                                onClick={() => setIsDeleteNoteModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <IconX />
                                            </button>
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">강의노트 삭제</div>
                                            <div className="p-5 text-center">
                                                <div className="text-white bg-danger ring-4 ring-danger/30 p-4 rounded-full w-fit mx-auto">
                                                    <IconTrashLines className="w-7 h-7 mx-auto" />
                                                </div>
                                                <div className="sm:w-3/4 mx-auto mt-5">정말 해당 강의 노트를 삭제하시겠습니까?</div>

                                                <div className="flex justify-center items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setIsDeleteNoteModal(false)}>
                                                        취소
                                                    </button>
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={deleteNote}>
                                                        삭제
                                                    </button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                    <Transition appear show={isViewNoteModal} as={Fragment}>
                        <Dialog as="div" open={isViewNoteModal} onClose={() => setIsViewNoteModal(false)} className="relative z-[51]">
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
                                                onClick={() => setIsViewNoteModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <IconX />
                                            </button>
                                            <div className="flex items-center flex-wrap gap-2 text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                <div className="ltr:mr-3 rtl:ml-3">{params.title}</div>
                                                {params.tag && (
                                                    <button
                                                        type="button"
                                                        className={`badge badge-outline-primary rounded-3xl capitalize ltr:mr-3 rtl:ml-3 ${
                                                            (params.tag === 'tag1' && 'shadow-primary',
                                                            params.tag === 'tag2' && 'shadow-warning',
                                                            params.tag === 'tag3' && 'shadow-info',
                                                            params.tag === 'tag4' && 'shadow-danger')
                                                        }`}
                                                    >
                                                        {params.tag}
                                                    </button>
                                                )}
                                                {params.isFav && (
                                                    <button type="button" className="text-warning">
                                                        <IconStar className="fill-warning" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <div className="text-base">{params.description}</div>

                                                <div className="ltr:text-right rtl:text-left mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setIsViewNoteModal(false)}>
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
        </div>
    );
};

export default Assignment;
