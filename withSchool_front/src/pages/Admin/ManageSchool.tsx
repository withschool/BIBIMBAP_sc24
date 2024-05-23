import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import AnimateHeight from 'react-animate-height';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconAirplay from '../../components/Icon/IconAirplay';
import IconBox from '../../components/Icon/IconBox';
import IconLayout from '../../components/Icon/IconLayout';


import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { getSchoolUsers, uploadUserFile, getAdminClasses, createClass, deleteClass, } from '../../service/admin';
import { getSubjects, createSubject, deleteSubject } from '../../service/subject';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';


import { Dialog, Transition } from '@headlessui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import IconX from '../../components/Icon/IconX';
import IconUser from '../../components/Icon/IconUser';
import IconLock from '../../components/Icon/IconLock';
import IconFacebook from '../../components/Icon/IconFacebook';
import IconGithub from '../../components/Icon/IconGithub';

import { getSchoolInfo } from '../../service/school';


const ManageSchool = () => {

    //펼치기
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('학교 관리'));
    });

    const [active, setActive] = useState<string>('');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const [active2, setActive2] = useState<string>('');
    const togglePara2 = (value: string) => {
        setActive2((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    //테이블

    const col = ['userId', 'userName', 'name', 'userCode'];
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 15];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'userName', direction: 'asc' });


    interface Record {
        userId: number;
        userName: string;
        name: string;
        userCode: string;
    }

    const [initialRecords, setInitialRecords] = useState<Record[]>([]);
    const [recordsData, setRecordsData] = useState<Record[]>([]);

    //API 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSchoolUsers();
                setInitialRecords(sortBy(data, 'userName'));
            } catch (error) {
                console.error('Error fetching school users:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const filteredRecords = initialRecords.filter((item: any) => {
            return (
                (item.userId && item.userId.toString().includes(search.toLowerCase())) ||
                (item.userName && item.userName.toLowerCase().includes(search.toLowerCase())) ||
                (item.name && item.name.toLowerCase().includes(search.toLowerCase()))
            );
        });
        setRecordsData(filteredRecords.slice(from, to));
    }, [search, page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const header = ['User ID', 'Username', 'Name', 'userCode'];

    function handleDownloadExcel() {

        const formattedRecords = initialRecords.map(record => ({
            userId: record.userId,
            userName: record.userName,
            name: record.name,
            userCode: record.userCode,
        }));

        downloadExcel({
            fileName: '학교랑 유저 목록',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: formattedRecords,
            },
        });
    }

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = initialRecords;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            // eslint-disable-next-line array-callback-return
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                rowhtml += '<tr>';
                // eslint-disable-next-line array-callback-return
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const response = await uploadUserFile(file);
                console.log('File upload successful:', response);
                // Optionally, you can refresh the user list after upload
                const data = await getSchoolUsers();
                setInitialRecords(sortBy(data, 'userName'));
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    //반 목록 가져오기

    const [classData, setClassData] = useState<{ [key: number]: any[] }>({});

    const fetchClassData = async (grade: number) => {
        try {
            const data = await getAdminClasses(grade);
            setClassData((prevData) => ({
                ...prevData,
                [grade]: data,
            }));
        } catch (error) {
            console.error(`Error fetching class data for grade ${grade}:`, error);
        }
    };

    useEffect(() => {
        [1, 2, 3].forEach((grade) => fetchClassData(grade));
    }, []);


    //반 추가
    const [modal20, setModal20] = useState(false);

    const handleCreateClass = async () => {
        const gradeInput = document.getElementById('targetGrade') as HTMLInputElement;
        const classInput = document.getElementById('targetClass') as HTMLInputElement;

        const grade = parseInt(gradeInput.value);
        const inClass = parseInt(classInput.value);

        if (isNaN(grade) || isNaN(inClass)) {
            alert('유효한 학년과 반을 입력하세요.');
            return;
        }

        try {
            const response = await createClass(grade, inClass);
            console.log('Class created successfully:', response);
            // Optionally, refresh the class list after creation
            fetchClassData(grade);
            setModal20(false); // Close the modal
        } catch (error) {
            console.error('반 못만들었다.:', error);
        }
    };


    //반 삭제

    const handleDeleteClass = async (classId: number, grade: number) => {
        if (window.confirm('정말로 이 반을 삭제하시겠습니까?')) {
            try {
                await deleteClass(classId);
                console.log('Class deleted successfully');
                fetchClassData(grade); // 삭제 후 반 목록 갱신
            } catch (error) {
                console.error('반 삭제 실패:', error);
            }
        }
    };


    //과목 관련 모달

    const [modal21, setModal21] = useState(false);

    //과목 목록 API 
    const [subjectData, setSubjectData] = useState<{ [key: number]: any[] }>({});

    const fetchSubjectData = async () => {
        try {
            const data = await getSubjects();
            console.log(`내부 데이타 ${JSON.stringify(data)}`);
            const groupedData = data.reduce((acc: any, subject: any) => {
                const grade = subject.grade ? parseInt(subject.grade) : 0; // Handle null grade
                if (!acc[grade]) {
                    acc[grade] = [];
                }
                acc[grade].push(subject);
                return acc;
            }, {});
            console.log(`그룹 데이타 ${JSON.stringify(groupedData)}`);
            setSubjectData(groupedData);
        } catch (error) {
            console.error('Error fetching subject data:', error);
        }
    };

    useEffect(() => {
        fetchSubjectData();
    }, []);


    const handleCreateSubject = async () => {
        const subjectNameInput = document.getElementById('subjectName') as HTMLInputElement;
        const subjectGradeInput = document.getElementById('subjectGrade') as HTMLInputElement;

        const subjectName = subjectNameInput.value;
        const subjectGrade = subjectGradeInput.value;

        if (!subjectName || !subjectGrade) {
            alert('유효한 과목 이름과 학년을 입력하세요.');
            return;
        }

        try {
            setModal21(false);
            const response = await createSubject(subjectName, '2024', '1', subjectGrade);
            console.log('Subject created successfully:', response);
            fetchSubjectData(); // Refresh the subject list after creation
        } catch (error) {
            console.error('과목 생성 실패:', error);
        }
    };


    const handleDeleteSubject = async (subjectId: number, grade: number) => {
        if (window.confirm('정말로 이 과목을 삭제하시겠습니까?')) {
            try {
                await deleteSubject(subjectId);
                console.log('Subject deleted successfully');
                fetchSubjectData(); // Refresh the subject list after deletion
            } catch (error) {
                console.error('과목 삭제 실패:', error);
            }
        }
    };

    const [schoolName, setSchoolName] = useState('');

    useEffect(() => {
        const fetchSchoolInfo = async () => {
            try {
                const data = await getSchoolInfo('');
                setSchoolName(data.SCHUL_NM);
            } catch (error) {
                console.error('학교 이름 안나오는 중', error);
            }
        };
        fetchSchoolInfo();
    }, []);



    return (
        <div>
            <div className="pb-5 space-y-8">
                <div>
                    <div className="panel">
                        <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                            <div className="flex items-center flex-wrap">

                                <h5 className="font-semibold text-lg dark:text-white-light">{schoolName}</h5>


                                <button type="button" onClick={() => exportTable('csv')} className="btn btn-primary btn-sm m-1 ">
                                    <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    CSV 출력
                                </button>
                                <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                                    <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    TXT 출력
                                </button>

                                <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleDownloadExcel}>
                                    <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    EXCEL 출력
                                </button>

                                <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                                    <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                                    PRINT 하기
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="text" className="form-input w-auto" placeholder="검색하기" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <input
                                    type="file"
                                    id="csvUpload"
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm m-1"
                                    onClick={() => document.getElementById('csvUpload')?.click()}
                                >
                                    <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    CSV 업로드하기
                                </button>
                            </div>

                        </div>
                        <div className="datatables">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover"
                                records={recordsData}
                                columns={[
                                    { accessor: 'userId', title: '유저 고유값', sortable: true },
                                    { accessor: 'userName', title: '유저 아이디', sortable: true },
                                    { accessor: 'name', title: '유저 이름', sortable: true },
                                    { accessor: 'userCode', title: '유저 코드', sortable: true },
                                ]}
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                minHeight={200}
                                paginationText={({ from, to, totalRecords }) => `${totalRecords}개의 항목 중 ${from}에서 ${to}까지 표시`}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    <div className="panel" id="basic">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">학년 별 반 목록</h5>

                            <div>
                                <button type="button" onClick={() => setModal20(true)} className="btn btn-primary">
                                    반 추가하기
                                </button>
                                <Transition appear show={modal20} as={Fragment}>
                                    <Dialog as="div" open={modal20} onClose={() => setModal20(false)}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0" />
                                        </Transition.Child>
                                        <div id="login_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                            <div className="flex min-h-screen items-start justify-center px-4">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                                            <h5>반 추가하기</h5>
                                                            <button type="button" onClick={() => setModal20(false)} className="text-white-dark hover:text-dark">
                                                                <IconX className="w-5 h-5" />
                                                            </button>
                                                        </div>

                                                        <div className="p-5">
                                                            <form>
                                                                <div className="relative mb-4">
                                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                        <IconUser className="w-5 h-5" />
                                                                    </span>
                                                                    <input type="text" placeholder="대상 학년" className="form-input ltr:pl-10 rtl:pr-10" id="targetGrade" />
                                                                </div>
                                                                <div className="relative mb-4">
                                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                        <IconLock className="w-5 h-5" />
                                                                    </span>
                                                                    <input type="text" placeholder="대상 반" className="form-input ltr:pl-10 rtl:pr-10" id="targetClass" />
                                                                </div>
                                                                <button type="button" className="btn btn-primary w-full" onClick={handleCreateClass}>
                                                                    반 만들기
                                                                </button>
                                                            </form>
                                                        </div>

                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="space-y-2 font-semibold">
                                {[1, 2, 3].map((grade) => (
                                    <div key={grade} className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                                        <button
                                            type="button"
                                            className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === grade.toString() ? '!text-primary' : ''}`}
                                            onClick={() => togglePara(grade.toString())}
                                        >
                                            {grade}학년 반 목록
                                            <div className={`ltr:ml-auto rtl:mr-auto ${active === grade.toString() ? 'rotate-180' : ''}`}>
                                                <IconCaretDown />
                                            </div>
                                        </button>
                                        <div>
                                            <AnimateHeight duration={300} height={active === grade.toString() ? 'auto' : 0}>
                                                <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                    <ul className="space-y-1">
                                                        {classData[grade]?.length > 0 ? (
                                                            classData[grade].sort((a, b) => a.inClass - b.inClass).map((classItem) => (
                                                                <li key={classItem.classId} className="flex justify-between items-center p-2 border-b border-gray-200">
                                                                    <span className="text-sm">{classItem.inClass}반</span>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() => handleDeleteClass(classItem.classId, grade)} // 삭제 버튼 클릭 시 호출
                                                                    >
                                                                        삭제 하기
                                                                    </button>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li>반 정보가 없습니다.</li>
                                                        )}

                                                    </ul>
                                                </div>
                                            </AnimateHeight>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="panel" id="basic">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">학년 별 과목 목록</h5>
                            <div>
                                <button type="button" onClick={() => setModal21(true)} className="btn btn-primary">
                                    과목 추가하기
                                </button>
                                <Transition appear show={modal21} as={Fragment}>
                                    <Dialog as="div" open={modal21} onClose={() => setModal21(false)}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0" />
                                        </Transition.Child>
                                        <div id="login_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                            <div className="flex min-h-screen items-start justify-center px-4">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                                            <h5>과목 추가하기</h5>
                                                            <button type="button" onClick={() => setModal21(false)} className="text-white-dark hover:text-dark">
                                                                <IconX className="w-5 h-5" />
                                                            </button>
                                                        </div>

                                                        <div className="p-5">
                                                            <form>

                                                                <div className="relative mb-4">
                                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                        <IconLock className="w-5 h-5" />
                                                                    </span>
                                                                    <input type="text" placeholder="대상 학년" className="form-input ltr:pl-10 rtl:pr-10" id="subjectGrade" />
                                                                </div>

                                                                <div className="relative mb-4">
                                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                        <IconUser className="w-5 h-5" />
                                                                    </span>
                                                                    <input type="text" placeholder="과목 이름" className="form-input ltr:pl-10 rtl:pr-10" id="subjectName" />
                                                                </div>

                                                                <button type="button" className="btn btn-primary w-full" onClick={async () => {
                                                                    await handleCreateSubject();
                                                                    window.location.reload();
                                                                }}>
                                                                    과목 만들기
                                                                </button>

                                                            </form>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="space-y-2 font-semibold">
                                {[1, 2, 3].map((grade) => (
                                    <div key={grade} className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                                        <button
                                            type="button"
                                            className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active2 === grade.toString() ? '!text-primary' : ''}`}
                                            onClick={() => togglePara2(grade.toString())}
                                        >
                                            {grade}학년 과목 목록
                                            <div className={`ltr:ml-auto rtl:mr-auto ${active2 === grade.toString() ? 'rotate-180' : ''}`}>
                                                <IconCaretDown />
                                            </div>
                                        </button>
                                        <div>
                                            <AnimateHeight duration={300} height={active2 === grade.toString() ? 'auto' : 0}>
                                                <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                    <ul className="space-y-1">
                                                        {subjectData[grade]?.length > 0 ? (
                                                            subjectData[grade].sort((a, b) => a.subjectName.localeCompare(b.subjectName)).map((subject) => (
                                                                <li key={subject.subjectId} className="flex justify-between items-center p-2 border-b border-gray-200">
                                                                    <span className="text-sm">{subject.subjectName}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() => handleDeleteSubject(subject.subjectId, grade)}
                                                                    >
                                                                        삭제 하기
                                                                    </button>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li>과목 정보가 없습니다.</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </AnimateHeight>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>


            </div>

        </div>
    );
};

export default ManageSchool;
