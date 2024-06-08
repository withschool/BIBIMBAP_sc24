import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconXCircle from '../../components/Icon/IconXCircle';
import { fetchSchoolApplications } from '../../service/apply';
import { updateSchoolApplicationState, deleteSchoolApplication } from '../../service/apply';


interface SchoolApplication {
    schoolApplicationId: number;
    schoolName: string;
    schoolPhoneNumber: string;
    schoolAdminName: string;
    schoolAdminEmail: string;
    state: number;
}

const SchoolApply = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('학교 신청 내역'));
    }, [dispatch]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SchoolApplication[]>([]);
    const [recordsData, setRecordsData] = useState<SchoolApplication[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'schoolName',
        direction: 'asc',
    });



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: SchoolApplication[] = await fetchSchoolApplications();
                setInitialRecords(sortBy(data, 'schoolName'));
                setRecordsData(sortBy(data, 'schoolName').slice(0, pageSize));
            } catch (error) {
                console.error('Error fetching school applications:', error);
            }
        };
        fetchData();
    }, [pageSize]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return initialRecords.filter((item) => {
                return (
                    item.schoolName.toLowerCase().includes(search.toLowerCase()) ||
                    item.schoolAdminName.toLowerCase().includes(search.toLowerCase()) ||
                    item.schoolAdminEmail.toLowerCase().includes(search.toLowerCase()) ||
                    item.schoolPhoneNumber.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const getStatusColor = (state: number) => {
        const colorMap = ['primary', 'secondary', 'success', 'danger'];
        return colorMap[state] || 'primary';
    };

    const handleChangeState = async (schoolApplicationId: number, newState: number) => {
        try {
            await updateSchoolApplicationState(schoolApplicationId, newState);
            const updatedRecords = initialRecords.map(record =>
                record.schoolApplicationId === schoolApplicationId ? { ...record, state: newState } : record
            );
            setInitialRecords(updatedRecords);
            setRecordsData(updatedRecords.slice((page - 1) * pageSize, page * pageSize));

            // Show alert when state is changed to "처리 완료" or "반려"
            if (newState === 2) {
                alert('처리 완료 상태로 변경되었습니다.');
            } else if (newState === 3) {
                alert('반려 상태로 변경되었습니다.');
            }
        } catch (error) {
            console.error('Error updating school application state:', error);
        }
    };
    const handleDelete = async (schoolApplicationId: number) => {
        try {
            await deleteSchoolApplication(schoolApplicationId);
            const updatedRecords = initialRecords.filter(record => record.schoolApplicationId !== schoolApplicationId);
            setInitialRecords(updatedRecords);
            setRecordsData(updatedRecords.slice((page - 1) * pageSize, page * pageSize));
        } catch (error) {
            console.error('Error deleting school application:', error);
        }
    };

    return (
        <div>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">학교 신청 내역</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="검색 하기" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'schoolName', title: '신청 받은 학교', sortable: true },
                            { accessor: 'schoolPhoneNumber', title: '전화번호', sortable: true },
                            { accessor: 'schoolAdminName', title: '이름', sortable: true },
                            { accessor: 'schoolAdminEmail', title: '이메일', sortable: true },
                            {
                                accessor: 'state',
                                title: '신청 상태',
                                sortable: true,
                                render: ({ schoolApplicationId, state }) => (
                                    <select
                                        value={state}
                                        onChange={(e) => handleChangeState(schoolApplicationId, Number(e.target.value))}
                                        className={`badge bg-${getStatusColor(state)}`}
                                        disabled={state !== 0}
                                    >
                                        <option value={1}>처리 중</option>
                                        <option value={2}>처리 완료</option>
                                        <option value={3}>반려</option>
                                    </select>
                                ),
                            },
                            {
                                accessor: 'delete',
                                title: '삭제하기',
                                titleClassName: '!text-center',
                                render: ({ schoolApplicationId }) => (
                                    <div className="flex items-center w-max mx-auto">
                                        <Tippy content="삭제">
                                            <button type="button" onClick={() => handleDelete(schoolApplicationId)}>
                                                <IconXCircle />
                                            </button>
                                        </Tippy>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        page={page}
                        onPageChange={setPage}
                        recordsPerPage={pageSize}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `${totalRecords}개의 항목 중 ${from}에서 ${to}까지 표시`}
                    />
                </div>
            </div>
        </div>
    );
};

export default SchoolApply;