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

// const ScoreClass = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('반 성적 조회'));
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

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ScoreClass;
