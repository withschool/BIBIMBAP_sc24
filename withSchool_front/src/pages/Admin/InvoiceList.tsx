import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import IconFile from '../../components/Icon/IconFile';
import * as PortOne from "@portone/browser-sdk/v2";
import { issueBillingKey } from '../../service/pay';
import IconCreditCard from '../../components/Icon/IconCreditCard';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconSettings from '../../components/Icon/IconSettings';
// import { fetchInvoices } from '../../service/pay';
import { checkBillingKey, registerFirstPlan, changePlan } from '../../service/pay';
import { getSchoolInfo } from '../../service/school';



import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const InvoiceList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            date: '2024.02.01',
            amount: '389만 2,700원',
            status: { tooltip: '결제 완료', color: 'success' },
        },
        {
            id: 2,
            invoice: '081452',
            date: '2024.03.01',
            amount: '209만 5,400원',
            status: { tooltip: '결제 완료', color: 'success' },
        },
        {
            id: 3,
            invoice: '081681',
            date: '2024.04.01',
            amount: '183만 1,800원',
            status: { tooltip: '결제 실패', color: 'danger' },
        },
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.date.toLowerCase().includes(search.toLowerCase()) ||
                    item.amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    //결제 관련 코드

    const handlePaymentTest = async () => {
        try {
            const result = await issueBillingKey();
            console.log('Billing key issued successfully:', result);
        } catch (error) {
            console.error('Payment test failed:', error);
        }
    };


    const [codeArr, setCodeArr] = useState<string[]>([]);

    const [yearlyPrice, setYearlyPrice] = useState<any>(false);

    const planNames = ['소규모', '중규모', '대규모', '체험판'];


    const handleChangePlan = async (plan: number) => {
        try {
            const schoolId = localStorage.getItem('schoolId');

            if (!schoolId) {
                throw new Error('schoolId is not found in localStorage');
            }

            const schoolInfo = await getSchoolInfo(schoolId);
            const isTrial = schoolInfo.serviceType == 9;

            if (isTrial) {
                const hasBillingKey = await checkBillingKey(Number(schoolId));
                if (!hasBillingKey) {
                    alert('카드 등록을 먼저 진행해주세요.');
                    return;
                }
                await registerFirstPlan(Number(schoolId), plan);
                alert('첫 플랜 등록이 성공하였습니다.');

            } else {
                await changePlan(Number(schoolId), plan);
                alert('플랜 변경이 성공하였습니다.');

            }

        } catch (error) {
            console.error('Error changing plan:', error);
            alert('플랜 변경이 실패하였습니다.');
        }
    };



    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className='flex gap-4'>


                <div className="panel w-full" id="pills_with_icon">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">결제/플랜 관리</h5>

                    </div>
                    <div className="mb-5 w-full">
                        <Tab.Group>

                            <Tab.Panels className="w-full">
                                <Tab.Panel className="w-full">
                                    <div className="flex w-full">

                                        <div
                                            className="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 flex-1"
                                            style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                                        >
                                            <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                                                <h5 className="font-semibold text-lg">결제 설정</h5>

                                                <div className="relative text-xl whitespace-nowrap">
                                                    <span className="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto">+ 명</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between z-10">
                                                <div className="flex items-center justify-between">
                                                    <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                                        <IconPlus />
                                                    </button>
                                                    <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                                        <IconCreditCard />
                                                    </button>
                                                </div>
                                                <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#4361ee] z-10">
                                                    카드 변경
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel className="w-full">
                                    <div className="flex w-full">

                                        <div className="panel">

                                            <div className="mb-5">
                                                <div className="max-w-[320px]mx-auto dark:text-white-dark">
                                                    <div className="md:flex space-y-4 md:space-y-0 mt-5 md:mt-16 text-white-dark">
                                                        <div className="flex-1 p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                                            <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">소규모 학교</h3>
                                                            <p>작은 규모의 학교에게 적절한 가격을 제공하여, 부담없이 이용하실 수 있습니다.</p>
                                                            <div className="my-7 p-2.5 text-center text-lg">
                                                                <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">300명 이하</strong> / 매달
                                                            </div>
                                                            <div className="mb-6">
                                                                <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">제공하는 기능들</strong>
                                                                <ul className="space-y-3">
                                                                    <li>24시간 온라인 지원 활성화</li>
                                                                    <li>학교 맞춤형 기능 추가 제공</li>
                                                                    <li>맞춤형 기능: 미제공</li>
                                                                </ul>
                                                            </div>
                                                            <button type="button" className="btn btn-dark w-full" onClick={() => handleChangePlan(0)}>
                                                                플랜 변경하기
                                                            </button>
                                                        </div>
                                                        <div className="relative flex-1 p-4 pt-14 lg:p-9 border border-white-light dark:border-[#1b2e4b] transition-all duration-300 rounded-t-md">
                                                            <div className="absolute top-0 md:-top-[30px] inset-x-0 bg-primary text-white h-10 flex items-center justify-center text-base rounded-t-md">현재 사용중인 플랜</div>
                                                            <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">중규모 학교</h3>
                                                            <p>중간 규모 학교에게 적합한 플랜으로, 적합한 가격으로 서비스를 이용하실 수 있습니다.</p>
                                                            <div className="my-7 p-2.5 text-center text-lg">
                                                                <strong className="text-primary text-xl lg:text-4xl">300 ~ 700명</strong> / 매달
                                                            </div>
                                                            <div className="mb-6">
                                                                <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">제공하는 기능들</strong>
                                                                <ul className="space-y-3">
                                                                    <li>24시간 온라인 지원 활성화</li>
                                                                    <li>학교 맞춤형 기능 추가 제공</li>
                                                                    <li>맞춤형 기능: 미제공</li>
                                                                </ul>
                                                            </div>
                                                            <button type="button" className="btn btn-primary w-full" onClick={() => handleChangePlan(1)}>
                                                                플랜 변경하기
                                                            </button>
                                                        </div>
                                                        <div className="flex-1 p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                                            <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">대규모 학교</h3>
                                                            <p>가장 큰 규모의 플랜으로, 인원 수 제한 없이 서비스를 이용하실 수 있습니다.</p>
                                                            <div className="my-7 p-2.5 text-center text-lg">
                                                                <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">700명 ~ </strong> / 매달
                                                            </div>
                                                            <div className="mb-6">
                                                                <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">제공하는 기능들</strong>
                                                                <ul className="space-y-3">
                                                                    <li>24시간 온라인 지원 활성화</li>
                                                                    <li>학교 맞춤형 기능 추가 제공</li>
                                                                    <li>맞춤형 기능: 제공</li>
                                                                </ul>
                                                            </div>
                                                            <button type="button" className="btn btn-dark w-full" onClick={() => handleChangePlan(2)}>
                                                                플랜 변경하기
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </Tab.Panel>

                            </Tab.Panels>
                            <Tab.List className="mt-3 mb-5 grid grid-cols-4 gap-2 rtl:space-x-reverse sm:flex sm:flex-wrap sm:justify-center sm:space-x-3">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!bg-success text-white !outline-none' : ''}
                                                    hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)]' flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] p-7 py-3 hover:!bg-success hover:text-white dark:bg-[#191e3a]`}
                                        >
                                            <IconUser className="w-5 h-5 mb-1" />
                                            결제 관리
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!bg-success text-white !outline-none' : ''}
                                                    hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)]' flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] p-7 py-3 hover:!bg-success hover:text-white dark:bg-[#191e3a]`}
                                        >
                                            <IconSettings className="w-5 h-5 mb-1" />
                                            플랜 관리
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>
                        </Tab.Group>
                    </div>

                </div>


            </div>
            <div className="invoice-table mt-10">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">

                    <button type="button" className="btn btn-primary btn-sm m-1" onClick={handlePaymentTest}>
                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                        결제 테스트
                    </button>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="검색" value={search} onChange={(e) => setSearch(e.target.value)} />

                    </div>
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className="whitespace-nowrap table-hover invoice-table"
                        records={records}
                        columns={[
                            {
                                accessor: 'invoice',
                                title: '결제 ID',
                                textAlignment: 'center',
                                sortable: true,
                                render: ({ invoice }) => (
                                    <NavLink to="/apps/invoice/preview">
                                        <div className="text-primary underline hover:no-underline font-semibold">{`#${invoice}`}</div>
                                    </NavLink>
                                ),
                            },
                            {
                                accessor: 'date',
                                title: '날짜',
                                textAlignment: 'center',
                                sortable: true,
                            },
                            {
                                accessor: 'amount',
                                title: '결제 금액',
                                sortable: true,
                                textAlignment: 'center',
                                render: ({ amount, id }) => <div className="font-semibold">{`${amount}`}</div>,
                            },
                            {
                                accessor: 'status',
                                title: '결제 상태',
                                sortable: true,
                                textAlignment: 'center',
                                render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            },
                            {
                                accessor: 'action',
                                title: '기능',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <Tippy content="결제 수정">
                                            <NavLink to="/apps/invoice/edit" className="flex hover:text-info">
                                                <IconEdit className="w-4.5 h-4.5" />
                                            </NavLink>
                                        </Tippy>
                                        <Tippy content="세부 내용">
                                            <NavLink to="/apps/invoice/preview" className="flex hover:text-primary">
                                                <IconEye />
                                            </NavLink>
                                        </Tippy>

                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        paginationText={({ from, to, totalRecords }) => `${totalRecords}개의 항목 중 ${from}에서 ${to}까지 표시`}
                    />
                </div>
            </div>
        </div>
    );
};

export default InvoiceList;
