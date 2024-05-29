import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSend from '../../components/Icon/IconSend';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';
import IconEdit from '../../components/Icon/IconEdit';
import IconPlus from '../../components/Icon/IconPlus';

const InvoicePreview = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('결제 정보 조회'));
    });
    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: '학생 138명 (명당 2만원)',
            quantity: 138,
            price: '20,000원',
            amount: '2,760,000원',
        },
        {
            id: 2,
            title: '교사 27명 (명당 2만원)',
            quantity: 27,
            price: '20,000원',
            amount: '540,000원',
        },
        {
            id: 3,
            title: '기타 4명(관리자 등) (명당 2만원)',
            quantity: 4,
            price: '20,000원',
            amount: '80,000원',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: '번호',
        },
        {
            key: 'title',
            label: '목록',
        },
        {
            key: 'quantity',
            label: '명 수',
        },
        {
            key: 'price',
            label: '단가',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: '가격',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-info gap-2">
                    <IconSend />
                    메일로 보내기
                </button>

                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    프린트하기
                </button>

                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    다운로드
                </button>
            </div>
            <div className="panel">
                <div className="flex justify-between flex-wrap gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">결제 정보</div>
                    <div className="shrink-0">
                        <img src="/assets/images/logo.svg" alt="img" className="w-14 ltr:ml-auto rtl:mr-auto" />
                    </div>
                </div>
                <div className="ltr:text-right rtl:text-left px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>경기 수원시 영통구 월드컵로 206</div>
                        <div>withschool@gmail.com</div>
                        <div>(031) 123-4567</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>발행 대상:</div>
                            <div className="text-black dark:text-white font-semibold">아주중학교</div>
                            <div>경기도 수원시 영통구 월드컵로 206</div>
                            <div>ajou@school.com</div>
                            <div>(031) 123-4567</div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">영수증 번호:</div>
                                <div>#8701</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">발행일:</div>
                                <div>2024년 3월 01일</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">주문 ID:</div>
                                <div>#OD-85794</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">배송 ID:</div>
                                <div>#SHP-8594</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">은행명:</div>
                                <div className="whitespace-nowrap">국민 은행</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">계좌 번호:</div>
                                <div>1234567890</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">SWIFT 코드:</div>
                                <div>S58K796</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">IBAN:</div>
                                <div>L5698445485</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">국가:</div>
                                <div>대한민국</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className="ltr:text-right rtl:text-left">{item.price}</td>
                                        <td className="ltr:text-right rtl:text-left">{item.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">학생 138명 (명당 2만원)</div>
                            <div className="w-[37%]">276만원</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">교사 27명 (명당 2만원)</div>
                            <div className="w-[37%]">54만원</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">기타 4명(관리자 등) (명당 2만원)</div>
                            <div className="w-[37%]">8만원</div>
                        </div>
                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">총합</div>
                            <div className="w-[37%]">338만원</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;
