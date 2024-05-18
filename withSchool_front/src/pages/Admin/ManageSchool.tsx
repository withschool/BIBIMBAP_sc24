import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { getSchoolUsers, uploadUserFile, } from '../../service/admin';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';


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

    const col = ['userId', 'userName', 'name'];

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 15];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'userName', direction: 'asc' });


    interface Record {
        userId: number;
        userName: string;
        name: string;
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

    const header = ['User ID', 'Username', 'Name'];

    function handleDownloadExcel() {

        const formattedRecords = initialRecords.map(record => ({
            userId: record.userId,
            userName: record.userName,
            name: record.name,
        }));

        downloadExcel({
            fileName: 'table',
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


    return (
        <div>
            <div className="pb-5 space-y-8">
                <div>
                    <div className="panel">
                        <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                            <div className="flex items-center flex-wrap">

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

                        </div>
                        <div className="mb-5">
                            <div className="space-y-2 font-semibold">
                                <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                                    <button
                                        type="button"
                                        className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '1' ? '!text-primary' : ''}`}
                                        onClick={() => togglePara('1')}
                                    >
                                        1학년 반 목록
                                        <div className={`ltr:ml-auto rtl:mr-auto ${active === '1' ? 'rotate-180' : ''}`}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <div>
                                        <div>
                                            <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                                                <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                    <ul className="space-y-1">
                                                        <li>
                                                            <button type="button">Apple</button>
                                                        </li>
                                                        <li>
                                                            <button type="button">Orange</button>
                                                        </li>
                                                        <li>
                                                            <button type="button">Banana</button>
                                                        </li>
                                                        <li>
                                                            <button type="button">list</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </AnimateHeight>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                    <button
                                        type="button"
                                        className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '2' ? '!text-primary' : ''}`}
                                        onClick={() => togglePara('2')}
                                    >
                                        2학년 반 목록
                                        <div className={`ltr:ml-auto rtl:mr-auto ${active === '2' ? 'rotate-180' : ''}`}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <div>
                                        <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                                            <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                <ul className="space-y-1">
                                                    <li>
                                                        <button type="button">Apple</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Orange</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Banana</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">list</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                                <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                    <button
                                        type="button"
                                        className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '3' ? '!text-primary' : ''}`}
                                        onClick={() => togglePara('3')}
                                    >
                                        3학년 반 목록
                                        <div className={`ltr:ml-auto rtl:mr-auto ${active === '3' ? 'rotate-180' : ''}`}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <div>
                                        <AnimateHeight duration={300} height={active === '3' ? 'auto' : 0}>
                                            <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                <ul className="space-y-1">
                                                    <li>
                                                        <button type="button">Apple</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Orange</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Banana</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">list</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="panel" id="basic">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">학년 별 과목 목록</h5>

                        </div>
                        <div className="mb-5">
                            <div className="space-y-2 font-semibold">
                                <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                                    <button
                                        type="button"
                                        className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active2 === '1' ? '!text-primary' : ''}`}
                                        onClick={() => togglePara2('1')}
                                    >
                                        1학년 과목 목록
                                        <div className={`ltr:ml-auto rtl:mr-auto ${active2 === '1' ? 'rotate-180' : ''}`}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <div>
                                        <div>
                                            <AnimateHeight duration={300} height={active2 === '1' ? 'auto' : 0}>
                                                <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                    <ul className="space-y-1">
                                                        <li>
                                                            <button type="button">Apple</button>
                                                        </li>
                                                        <li>
                                                            <button type="button">Orange</button>
                                                        </li>
                                                        <li>
                                                            <button type="button">Banana</button>
                                                        </li>
                                                        <li>
                                                            <button type="button">list</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </AnimateHeight>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                    <button
                                        type="button"
                                        className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active2 === '2' ? '!text-primary' : ''}`}
                                        onClick={() => togglePara2('2')}
                                    >
                                        2학년 과목 목록
                                        <div className={`ltr:ml-auto rtl:mr-auto ${active2 === '2' ? 'rotate-180' : ''}`}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <div>
                                        <AnimateHeight duration={300} height={active2 === '2' ? 'auto' : 0}>
                                            <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                <ul className="space-y-1">
                                                    <li>
                                                        <button type="button">Apple</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Orange</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Banana</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">list</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                                <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                    <button
                                        type="button"
                                        className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active2 === '3' ? '!text-primary' : ''}`}
                                        onClick={() => togglePara2('3')}
                                    >
                                        3학년 과목 목록
                                        <div className={`ltr:ml-auto rtl:mr-auto ${active2 === '3' ? 'rotate-180' : ''}`}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <div>
                                        <AnimateHeight duration={300} height={active2 === '3' ? 'auto' : 0}>
                                            <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                <ul className="space-y-1">
                                                    <li>
                                                        <button type="button">Apple</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Orange</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Banana</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">list</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageSchool;
