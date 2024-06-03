// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import Dropdown from '../../components/Dropdown';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import { getLectureNoteList, createLectureNote, updateLectureNote, deleteLectureNote, getStudentList, enrollScore} from '../../service/subject';
// import IconNotes from '../../components/Icon/IconNotes';
// import IconNotesEdit from '../../components/Icon/IconNotesEdit';
// import IconStar from '../../components/Icon/IconStar';
// import IconSquareRotated from '../../components/Icon/IconSquareRotated';
// import IconPlus from '../../components/Icon/IconPlus';
// import IconMenu from '../../components/Icon/IconMenu';
// import IconUser from '../../components/Icon/IconUser';
// import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
// import IconPencil from '../../components/Icon/IconPencil';
// import IconTrashLines from '../../components/Icon/IconTrashLines';
// import IconEye from '../../components/Icon/IconEye';
// import IconX from '../../components/Icon/IconX';
// import IconGallery from '../../components/Icon/IconGallery';
// import IconFolder from '../../components/Icon/IconFolder';
// import IconZipFile from '../../components/Icon/IconZipFile';
// import IconDownload from '../../components/Icon/IconDownload';
// import IconTxtFile from '../../components/Icon/IconTxtFile';

// const Score = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('성적 관리'));
//     });
//     const [studentList, setStudentList] = useState([]);

// const navigate = useNavigate();

// const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);


// useEffect(() => {
//     const fetchLectureNote = async () => {
//         if(localStorage.getItem("targetSubject") == null){
//             alert("과목을 선택해 주세요.");
//             navigate('/teacher/subject/choose');
//         }
//         try {
//             const studentList = await getStudentList(localStorage.getItem("targetSubject"));
//             setStudentList(studentList);
//         } catch (error) {
//             console.error("Failed to fetch lectureNotes:", error);
//         }
//     };

//     fetchLectureNote();
    
// }, [studentList]);

//     const defaultParams = { subjectLectureNoteId: null, title: '', description: '', tag: '', name: '', thumb: '' };
//     const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
//     const [addContactModal, setAddContactModal] = useState<any>(false);
//     const [isDeleteNoteModal, setIsDeleteNoteModal] = useState<any>(false);
//     const [isShowNoteMenu, setIsShowNoteMenu] = useState<any>(false);
//     const [isViewNoteModal, setIsViewNoteModal] = useState<any>(false);
//     const [filterdNotesList, setFilterdNotesList] = useState<any>([]);
//     const [selectedTab, setSelectedTab] = useState<any>('');
//     const [deletedNote, setDeletedNote] = useState<any>(null);
//     const [prevTempScores, setPrevTempScores] = useState('');
    

//     const [tempScores, setTempScores] = useState([]);


//     const searchNotes = () => {
//         if (selectedTab !== 'fav') {
//             if (selectedTab !== 'mid' || selectedTab === 'final') {
//             } else {
//                 setFilterdNotesList(studentList);
//             }
//         } else {
//         }
//     };

//     const tabChanged = (type: string) => {
//         setSelectedTab(type);
//         setIsShowNoteMenu(false);
//         searchNotes();
//     };
  
//     const handleMidSubmit = () => {
//         console.log(tempScores);
//         const transformedObject = Object.keys(tempScores).map(key => ({
//             studentSubjectId: parseInt(key),
//             score: parseInt(tempScores[key])
//         }));
//         console.log(transformedObject);
//         enrollScore("mid", transformedObject);
//         alert("등록되었습니다");
//     }

//     const handleFinalSubmit = () => {
//         console.log(tempScores);
//         const transformedObject = Object.keys(tempScores).map(key => ({
//             studentSubjectId: parseInt(key),
//             score: parseInt(tempScores[key])
//         }));
//         console.log(transformedObject);
//         enrollScore("final", transformedObject);
//         alert("등록되었습니다");
//     }

//     const handleActivitySubmit = () => {
//         console.log(tempScores);
//         const transformedObject = Object.keys(tempScores).map(key => ({
//             studentSubjectId: parseInt(key),
//             score: parseInt(tempScores[key])
//         }));
//         console.log(transformedObject);
//         enrollScore("activity", transformedObject);
//         alert("등록되었습니다");
//     }

//     interface Student {
//         userId: number;
//         userName: string;
//         midtermScore: string;
//     }

//     useEffect(() => {
//         const initialTempScores = [];
//         studentList.forEach((student) => {
//             initialTempScores[student.studentSubjectId] = student.midtermScore;
//         });
//         setTempScores(initialTempScores);
//     }, []);

//     const handleMidScoreChange = (studentSubjectId, newScore) => {
//         setTempScores((prevTempScores) => ({
//             ...prevTempScores,
//             [studentSubjectId]: newScore
//         }));
//     };

//     const handleFinalScoreChange = (studentSubjectId, newScore) => {
//         setTempScores((prevTempScores) => ({
//             ...prevTempScores,
//             [studentSubjectId]: newScore
//         }));
//     };

//     const handleActivityScoreChange = (studentSubjectId, newScore) => {
//         setTempScores((prevTempScores) => ({
//             ...prevTempScores,
//             [studentSubjectId]: newScore
//         }));
//     };

//     const showMessage = (msg = '', type = 'success') => {
//         const toast: any = Swal.mixin({
//             toast: true,
//             position: 'top',
//             showConfirmButton: false,
//             timer: 3000,
//             customClass: { container: 'toast' },
//         });
//         toast.fire({
//             icon: type,
//             title: msg,
//             padding: '10px 20px',
//         });
//     };

//     useEffect(() => {
//         searchNotes();
//         /* eslint-disable react-hooks/exhaustive-deps */
//     }, [selectedTab, studentList]);

//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//     return (
//         <div>
//             <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
//                 <div className={`bg-black/60 z-10 w-full h-full rounded-md absolute hidden ${isShowNoteMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}></div>
//                 <div
//                     className={`panel
//                     p-4
//                     flex-none
//                     w-[240px]
//                     absolute
//                     xl:relative
//                     z-10
//                     space-y-4
//                     h-full
//                     xl:h-auto
//                     hidden
//                     xl:block
//                     ltr:lg:rounded-r-md ltr:rounded-r-none
//                     rtl:lg:rounded-l-md rtl:rounded-l-none
//                     overflow-hidden ${isShowNoteMenu ? '!block h-full ltr:left-0 rtl:right-0' : 'hidden shadow'}`}
//                 >
//                     <div className="flex flex-col h-full pb-16">
//                         <div className="flex text-center items-center">
//                             <div className="shrink-0">
//                                 <IconNotes />
//                             </div>
//                             <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">성적 입력</h3>
//                         </div>

//                         <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] my-4"></div>
//                         <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
//                             <div className="space-y-1">
//                                 <button
//                                     type="button"
//                                     className={`w-full flex justify-between items-center p-2  hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
//                                         selectedTab === 'mid' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
//                                     }`}
//                                     onClick={() => tabChanged('mid')}
//                                 >
//                                     <div className="flex items-center">
//                                         <IconNotesEdit className="shrink-0" />
//                                         <div className="ltr:ml-3 rtl:mr-3">중간고사</div>
//                                     </div>
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className={`w-full flex justify-between items-center p-2  hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
//                                         selectedTab === 'final' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
//                                     }`}
//                                     onClick={() => tabChanged('final')}
//                                 >
//                                     <div className="flex items-center">
//                                         <IconNotesEdit className="shrink-0" />
//                                         <div className="ltr:ml-3 rtl:mr-3">기말고사</div>
//                                     </div>
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className={`w-full flex justify-between items-center p-2  hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
//                                         selectedTab === 'activity' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
//                                     }`}
//                                     onClick={() => tabChanged('activity')}
//                                 >
//                                     <div className="flex items-center">
//                                         <IconNotesEdit className="shrink-0" />
//                                         <div className="ltr:ml-3 rtl:mr-3">수행평가</div>
//                                     </div>
//                                 </button>
//                                 <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
//                             </div>
//                         </PerfectScrollbar>
//                     </div>
//                 </div>
//                 <div className="panel flex-1 overflow-auto h-full">
//                     <div className="pb-5">
//                         <button type="button" className="xl:hidden hover:text-primary" onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}>
//                             <IconMenu />
//                         </button>
//                     </div>
//                     {filterdNotesList.length && selectedTab == "mid" ? (
//                             <div className="table-responsive mb-5">
//                                 <table className="table-striped">
//                                     <thead>
//                                         <tr>
//                                             <th className="w-1/3">ID</th>
//                                             <th className="w-1/3">이름</th>
//                                             <th className="w-1/3 text-center">중간고사 성적</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {studentList.map((data) => {
//                                             return (
//                                                 <tr key={data.studentSubjectId}>
//                                                     <td className="w-1/3">
//                                                         <div className="whitespace-nowrap">{data.userId}</div>
//                                                     </td>
//                                                     <td className="w-1/3">
//                                                         <div className="whitespace-nowrap">{data.userName}</div>
//                                                     </td>
//                                                     <td className="w-1/3 text-center">
//                                                         <input
//                                                             type="text"
//                                                             className="w-10"
//                                                             value={tempScores[data.studentSubjectId] || ''}
//                                                             onChange={(e) => handleMidScoreChange(data.studentSubjectId, e.target.value)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                                 <button className="mt-5 flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleMidSubmit}>제출</button>
//                             </div>
                    
//                     ) : (
//                         <div>
//                         {filterdNotesList.length && selectedTab == "final" ? (
//                             <div className="table-responsive mb-5">
//                             <table className="table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th className="w-1/3">ID</th>
//                                         <th className="w-1/3">이름</th>
//                                         <th className="w-1/3 text-center">기말고사 성적</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {studentList.map((data) => {
//                                         return (
//                                             <tr key={data.studentSubjectId}>
//                                                 <td className="w-1/3">
//                                                     <div className="whitespace-nowrap">{data.userId}</div>
//                                                 </td>
//                                                 <td className="w-1/3">
//                                                     <div className="whitespace-nowrap">{data.userName}</div>
//                                                 </td>
//                                                 <td className="w-1/3 text-center">
//                                                     <input
//                                                         type="text"
//                                                         className="w-10"
//                                                         value={tempScores[data.studentSubjectId] || ''}
//                                                         onChange={(e) => handleFinalScoreChange(data.studentSubjectId, e.target.value)}
//                                                     />
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                             <button className="mt-5 flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleFinalSubmit}>제출</button>
//                         </div>
                        
//                         ) : (
//                             <div>
//                                 {filterdNotesList.length && selectedTab == "activity" ? (
//                                     <div className="table-responsive mb-5">
//                                     <table className="table-striped">
//                                         <thead>
//                                             <tr>
//                                                 <th className="w-1/3">ID</th>
//                                                 <th className="w-1/3">이름</th>
//                                                 <th className="w-1/3 text-center">수행평가 성적</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {studentList.map((data) => {
//                                                 return (
//                                                     <tr key={data.studentSubjectId}>
//                                                         <td className="w-1/3">
//                                                             <div className="whitespace-nowrap">{data.userId}</div>
//                                                         </td>
//                                                         <td className="w-1/3">
//                                                             <div className="whitespace-nowrap">{data.userName}</div>
//                                                         </td>
//                                                         <td className="w-1/3 text-center">
//                                                             <input
//                                                                 type="text"
//                                                                 className="w-10"
//                                                                 value={tempScores[data.studentSubjectId] || ''}
//                                                                 onChange={(e) => handleActivityScoreChange(data.studentSubjectId, e.target.value)}
//                                                             />
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                         </tbody>
//                                     </table>
//                                     <button className="mt-5 flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleActivitySubmit}>제출</button>
//                                 </div>
                                
//                                 ) : (
//                                     <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">시험 종류를 선택해주세요.</div>
//                                 )}
//                             </div>
//                         )}
//                         </div>
//                     )}
                

//                     <Transition appear show={isDeleteNoteModal} as={Fragment}>
//                         <Dialog as="div" open={isDeleteNoteModal} onClose={() => setIsDeleteNoteModal(false)} className="relative z-[51]">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0"
//                                 enterTo="opacity-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                             >
//                                 <div className="fixed inset-0 bg-[black]/60" />
//                             </Transition.Child>
//                         </Dialog>
//                     </Transition>

//                     <Transition appear show={isViewNoteModal} as={Fragment}>
//                         <Dialog as="div" open={isViewNoteModal} onClose={() => setIsViewNoteModal(false)} className="relative z-[51]">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0"
//                                 enterTo="opacity-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                             >
//                                 <div className="fixed inset-0 bg-[black]/60" />
//                             </Transition.Child>

//                             <div className="fixed inset-0 overflow-y-auto">
//                                 <div className="flex min-h-full items-center justify-center px-4 py-8">
//                                     <Transition.Child
//                                         as={Fragment}
//                                         enter="ease-out duration-300"
//                                         enterFrom="opacity-0 scale-95"
//                                         enterTo="opacity-100 scale-100"
//                                         leave="ease-in duration-200"
//                                         leaveFrom="opacity-100 scale-100"
//                                         leaveTo="opacity-0 scale-95"
//                                     >
//                                         <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setIsViewNoteModal(false)}
//                                                 className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
//                                             >
//                                                 <IconX />
//                                             </button>
//                                             <div className="flex items-center flex-wrap gap-2 text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
//                                                 <div className="ltr:mr-3 rtl:ml-3">{params.title}</div>
//                                                 {params.fileURl && (
//                                                     <div className="mt-8">
//                                                         <br/>
//                                                         <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
//                                                         <div className="flex items-center flex-wrap mt-6">
//                                                             {params.filesURl.map((attachment: any, i: number) => {
//                                                                 return (
//                                                                     <a 
//                                                                         href={attachment}
//                                                                         key={i}
//                                                                         type="button"
//                                                                         className="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-white-light dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group"
//                                                                     >
//                                                                         {attachment.type === 'image' && <IconGallery />}
//                                                                         {attachment.type === 'folder' && <IconFolder />}
//                                                                         {attachment.type === 'zip' && <IconZipFile />}
//                                                                         {attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder' && <IconTxtFile className="w-5 h-5" />}

//                                                                         <div className="ltr:ml-3 rtl:mr-3">
//                                                                             <p className="text-xs text-primary font-semibold">{params.originalName}</p>
//                                                                             <p className="text-[11px] text-gray-400 dark:text-gray-600">{attachment.size}</p>
//                                                                         </div>
//                                                                         <div className="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block"></div>
//                                                                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10">
//                                                                             <IconDownload className="w-4.5 h-4.5" />
//                                                                         </div>
//                                                                     </a>
//                                                                 );
//                                                             })}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 {params.isFav && (
//                                                     <button type="button" className="text-warning">
//                                                         <IconStar className="fill-warning" />
//                                                     </button>
//                                                 )}
//                                             </div>
//                                             <div className="p-5">
//                                                 <div className="text-base">{params.description}</div>

//                                                 <div className="ltr:text-right rtl:text-left mt-8">
//                                                     <button type="button" className="btn btn-outline-danger" onClick={() => setIsViewNoteModal(false)}>
//                                                         Close
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </Dialog.Panel>
//                                     </Transition.Child>
//                                 </div>
//                             </div>
//                         </Dialog>
//                     </Transition>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Score;
