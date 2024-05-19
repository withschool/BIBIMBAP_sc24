import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { useEffect, useState, Fragment, } from 'react';
import 'tippy.js/dist/tippy.css';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { Dialog, Transition } from '@headlessui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import IconX from '../../components/Icon/IconX';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconUser from '../../components/Icon/IconUser';
import IconAt from '../../components/Icon/IconAt';
import { getSchoolList, getSchoolListFromNeis, registerSchool, deleteSchool} from '../../service/school';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconSearch from '../../components/Icon/IconSearch';
import Tippy from '@tippyjs/react';




interface School {
    schoolId: number;
    schoolName: string;
    schoolPhoneNumber: string;
    educationOffice: string;
    schoolAddress: string;
    regDate: string;
}

export const formatDate = (dateString: string): string => {
    const year = dateString.slice(0, 1);
    const month = dateString.slice(1, 2);
    const day = dateString.slice(2, 3);
    const hour = dateString.slice(3, 4);
    const minute = dateString.slice(4, 5);

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

const SchoolList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('학교 목록'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<School[]>([]);
    const [recordsData, setRecordsData] = useState<School[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'schoolName', direction: 'asc' });
    const [modal21, setModal21] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSchoolList();
                const formattedData = data.map((item: School) => ({
                    ...item,
                    regDate: formatDate(item.regDate),
                }));
                setInitialRecords(sortBy(formattedData, 'schoolName'));
            } catch (error) {
                console.error('학교 목록 불러오기 오류', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const filteredRecords = initialRecords.filter((item) => {
            return (
                (item.schoolId && item.schoolId.toString().toLowerCase().includes(search.toLowerCase())) ||
                (item.schoolName && item.schoolName.toLowerCase().includes(search.toLowerCase())) ||
                (item.schoolPhoneNumber && item.schoolPhoneNumber.toLowerCase().includes(search.toLowerCase())) ||
                (item.educationOffice && item.educationOffice.toLowerCase().includes(search.toLowerCase())) ||
                (item.schoolAddress && item.schoolAddress.toLowerCase().includes(search.toLowerCase())) ||
                (item.regDate && item.regDate.toString().toLowerCase().includes(search.toLowerCase()))
            );
        });
        setRecordsData(filteredRecords.slice((page - 1) * pageSize, page * pageSize));
    }, [search, initialRecords, page, pageSize]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);

    }, [sortStatus]);


    //search

    const [filteredItems, setFilteredItems] = useState<any>([]);
    const [allSearch, setAllSearch] = useState<string>('');

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const allData = await getSchoolListFromNeis(allSearch);
                if (Array.isArray(allData)) {
                    setFilteredItems(allData.filter((item: School) =>
                        item.schoolName.toLowerCase().includes(allSearch.toLowerCase())
                    ));
                } else {
                    console.error('클라오류 1', allData);
                }
            } catch (error) {
                console.error('클라 오류 2', error);
            }
        };
        fetchAllData();
    }, [allSearch]);

    useEffect(() => {
        setFilteredItems((prevItems: School[]) => {
            return prevItems.filter((item: School) => {
                return item.schoolName.toLowerCase().includes(allSearch.toLowerCase());
            });
        });
    }, [allSearch]);

    useEffect(() => {
        setFilteredItems([]);
    }, [allSearch]);

    const handleRegisterSchool = async (school: any) => {
        const schoolData = {
            ATPT_OFCDC_SC_CODE: school.ATPT_OFCDC_SC_CODE,
            ATPT_OFCDC_SC_NM: school.ATPT_OFCDC_SC_NM,
            SD_SCHUL_CODE: school.SD_SCHUL_CODE,
            SCHUL_NM: school.SCHUL_NM,
            ENG_SCHUL_NM: school.ENG_SCHUL_NM,
            SCHUL_KND_SC_NM: school.SCHUL_KND_SC_NM,
            LCTN_SC_NM: school.LCTN_SC_NM,
            JU_ORG_NM: school.JU_ORG_NM,
            FOND_SC_NM: school.FOND_SC_NM,
            ORG_RDNZC: school.ORG_RDNZC.trim(), 
            ORG_RDNMA: school.ORG_RDNMA,
            ORG_RDNDA: school.ORG_RDNDA,
            ORG_TELNO: school.ORG_TELNO,
            HMPG_ADRES: school.HMPG_ADRES,
            COEDU_SC_NM: school.COEDU_SC_NM,
            ORG_FAXNO: school.ORG_FAXNO,
            HS_SC_NM: school.HS_SC_NM,
            INDST_SPECL_CCCCL_EXST_YN: school.INDST_SPECL_CCCCL_EXST_YN,
            HS_GNRL_BUSNS_SC_NM: school.HS_GNRL_BUSNS_SC_NM,
            SPCLY_PURPS_HS_ORD_NM: school.SPCLY_PURPS_HS_ORD_NM || '', 
            ENE_BFE_SEHF_SC_NM: school.ENE_BFE_SEHF_SC_NM,
            DGHT_SC_NM: school.DGHT_SC_NM,
            FOND_YMD: school.FOND_YMD,
            FOAS_MEMRD: school.FOAS_MEMRD,
            LOAD_DTM: school.LOAD_DTM
        };
    
        try {
            await registerSchool(schoolData);
            setModal21(false);
        } catch (error) {
            console.error('학교 등록 오류', error);
        }
    };

    const handleDeleteSchool = async (schoolId: number) => {
        if (window.confirm('정말로 이 학교를 삭제하시겠습니까?')) {
            try {
                await deleteSchool(schoolId);
                // Refetch the school list
                const data = await getSchoolList();
                const formattedData = data.map((item: School) => ({
                    ...item,
                    regDate: formatDate(item.regDate),
                }));
                setInitialRecords(sortBy(formattedData, 'schoolName'));
                setRecordsData(formattedData.slice((page - 1) * pageSize, page * pageSize));
            } catch (error) {
                console.error('학교 삭제 오류', error);
            }
        }
    };


    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div>

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">학교 목록</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="검색 하기" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div>
                        <button type="button" onClick={() => { setModal21(true) }} className="btn btn-info">
                            학교 제작하기
                        </button>
                        <Transition appear show={modal21} as={Fragment}>
                            <Dialog
                                as="div"
                                open={modal21}
                                onClose={() => {
                                    setModal21(false);
                                }}
                            >
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
                                <div id="register_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
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
                                            <Dialog.Panel className="panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark mx-auto">
                                                <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                                    <h5>학교 생성</h5>
                                                    <button type="button" onClick={() => setModal21(false)} className="text-white-dark hover:text-dark">
                                                        <IconX className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <div className="p-5">
                                                    <form>
                                                        <div className="relative mb-4">
                                                            <div className="mb-5 space-y-5">
                                                                <form className="mx-auto w-full sm:w-1/2 mb-5">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            value={allSearch}
                                                                            placeholder="학교 전체 검색"
                                                                            className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                                                            onChange={(e) => setAllSearch(e.target.value)}
                                                                        />
                                                                        <button type="button" className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center" onClick={() => getSchoolListFromNeis(allSearch)}>
                                                                            <IconSearch className="mx-auto" />
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                                <div className="p-4 border border-white-dark/20 rounded-lg space-y-4 overflow-x-auto w-full block max-h-96 overflow-y-auto">
                                                                    {filteredItems.map((item: any) => {
                                                                        return (
                                                                            <div
                                                                                key={item.schoolName}
                                                                                className="bg-white dark:bg-[#1b2e4b] rounded-xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] p-3 flex items-center justify-between
                text-gray-500 font-semibold min-w-[625px] hover:text-primary transition-all duration-300 hover:scale-[1.01]"
                                                                                onClick={() => handleRegisterSchool(item)}

                                                                            >
                                                                                <div>{item.schoolName}</div>
                                                                                <div>{item.educationOffice}</div>
                                                                                <div>{item.schoolAddress}</div>
                                                                                <div>{item.schoolPhoneNumber}</div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-primary w-full">
                                                            학교 생성하기
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                                                    <div className="my-1 text-center text-xs text-white-dark dark:text-white-dark/70">OR</div>
                                                    <div className="mb-5 flex items-center justify-center gap-3">
                                                        <button type="button" className="btn btn-outline-primary flex gap-1">
                                                            <span>학교 수정</span>
                                                        </button>
                                                        <button type="button" className="btn btn-outline-danger flex gap-1">
                                                            <span>학교 삭제</span>
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
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
                        records={recordsData}
                        columns={[

                            { accessor: 'schoolId', title: '학교 ID', sortable: true },
                            { accessor: 'schoolName', title: '학교 이름', sortable: true },
                            { accessor: 'schoolPhoneNumber', title: '전화 번호', sortable: true },
                            { accessor: 'educationOffice', title: '담당 교육청', sortable: true },
                            { accessor: 'schoolAddress', title: '학교 주소', sortable: true },
                            { accessor: 'regDate', title: '생성일', sortable: true },
                            {
                                accessor: 'deleteSchool',
                                title: '삭제하기',
                                titleClassName: '!text-center',
                                render: (record) => (
                                    <div className="flex items-center w-max mx-auto">
                                        <Tippy content="Delete">
                                            <button type="button" onClick={() => handleDeleteSchool(record.schoolId)}>
                                                <IconXCircle />
                                            </button>
                                        </Tippy>
                                    </div>
                                ),
                            },
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
    );
};

export default SchoolList;
