import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconGlobe from '../../components/Icon/IconGlobe';
import IconGallery from '../../components/Icon/IconGallery';
import IconTxtFile from '../../components/Icon/IconTxtFile';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../../components/Dropdown';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconTrendingUp from '../../components/Icon/IconTrendingUp';
import IconPlus from '../../components/Icon/IconPlus';
import IconCreditCard from '../../components/Icon/IconCreditCard';
import IconMail from '../../components/Icon/IconMail';
import IconChecks from '../../components/Icon/IconChecks';
import IconFile from '../../components/Icon/IconFile';
import IconServer from '../../components/Icon/IconServer';
import IconChrome from '../../components/Icon/IconChrome';
import IconSafari from '../../components/Icon/IconSafari';
import IconUsersGroup from '../../components/Icon/IconUsersGroup';
import IconLink from '../../components/Icon/IconLink';
import IconChatDots from '../../components/Icon/IconChatDots';
import IconThumbUp from '../../components/Icon/IconThumbUp';
import IconCaretsDown from '../../components/Icon/IconCaretsDown';
import IconSquareCheck from '../../components/Icon/IconSquareCheck';
import IconClock from '../../components/Icon/IconClock';

import FullCalendar from '@fullcalendar/react';
// import '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import Swal from 'sweetalert2';




const TeacherHome = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('교사 메인'));
    }, []);
    
    const [tabs, setTabs] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };
    const [codeArr, setCodeArr] = useState<string[]>([]);
    const now = new Date();
    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
        // return dt.getMonth() < 10 ? '0' + month : month;
    };

    const [events, setEvents] = useState<any>([
        {
            id: 1,
            title: 'All Day Event',
            start: now.getFullYear() + '-' + getMonth(now) + '-01T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-02T14:30:00',
            className: 'danger',
            description: 'Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.',
        },
        {
            id: 2,
            title: 'Site Visit',
            start: now.getFullYear() + '-' + getMonth(now) + '-07T19:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-08T14:30:00',
            className: 'primary',
            description: 'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
        },
        {
            id: 3,
            title: 'Product Lunching Event',
            start: now.getFullYear() + '-' + getMonth(now) + '-17T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-18T14:30:00',
            className: 'info',
            description: 'Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.',
        },
        {
            id: 4,
            title: 'Meeting',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T10:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T10:30:00',
            className: 'danger',
            description: 'Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.',
        },
        {
            id: 5,
            title: 'Lunch',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T15:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T15:00:00',
            className: 'info',
            description: 'Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        },
        {
            id: 6,
            title: 'Conference',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T21:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T21:30:00',
            className: 'success',
            description:
                'Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.',
        },
        {
            id: 7,
            title: 'Happy Hour',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T05:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T05:30:00',
            className: 'info',
            description: ' odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.',
        },
        {
            id: 8,
            title: 'Dinner',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T20:00:00',
            className: 'danger',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 9,
            title: 'Birthday Party',
            start: now.getFullYear() + '-' + getMonth(now) + '-27T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-28T20:00:00',
            className: 'success',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 10,
            title: 'New Talent Event',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-24T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-27T22:20:20',
            className: 'danger',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 11,
            title: 'Other new',
            start: now.getFullYear() + '-' + getMonth(now, -1) + '-13T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, -1) + '-16T22:20:20',
            className: 'primary',
            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 13,
            title: 'Upcoming Event',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-15T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-18T22:20:20',
            className: 'primary',
            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
    ]);
    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [minStartDate, setMinStartDate] = useState<any>('');
    const [minEndDate, setMinEndDate] = useState<any>('');
    const defaultParams = { id: null, title: '', start: '', end: '', description: '', type: 'primary' };
    const [params, setParams] = useState<any>(defaultParams);
    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        dt = dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
        return dt;
    };
    const editEvent = (data: any = null) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);
        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            setParams({
                id: obj.id ? obj.id : null,
                title: obj.title ? obj.title : null,
                start: dateFormat(obj.start),
                end: dateFormat(obj.end),
                type: obj.classNames ? obj.classNames[0] : 'primary',
                description: obj.extendedProps ? obj.extendedProps.description : '',
            });
            setMinStartDate(new Date());
            setMinEndDate(dateFormat(obj.start));
        } else {
            setMinStartDate(new Date());
            setMinEndDate(new Date());
        }
        setIsAddEventModal(true);
    };
    const editDate = (data: any) => {
        let obj = {
            event: {
                start: data.start,
                end: data.end,
            },
        };
        editEvent(obj);
    };

    const saveEvent = () => {
        if (!params.title) {
            return true;
        }
        if (!params.start) {
            return true;
        }
        if (!params.end) {
            return true;
        }
        if (params.id) {
            //update event
            let dataevent = events || [];
            let event: any = dataevent.find((d: any) => d.id === parseInt(params.id));
            event.title = params.title;
            event.start = params.start;
            event.end = params.end;
            event.description = params.description;
            event.className = params.type;

            setEvents([]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        } else {
            //add event
            let maxEventId = 0;
            if (events) {
                maxEventId = events.reduce((max: number, character: any) => (character.id > max ? character.id : max), events[0].id);
            }
            maxEventId = maxEventId + 1;
            let event = {
                id: maxEventId,
                title: params.title,
                start: params.start,
                end: params.end,
                description: params.description,
                className: params.type,
            };
            let dataevent = events || [];
            dataevent = dataevent.concat([event]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        }
        showMessage('Event has been saved successfully.');
        setIsAddEventModal(false);
    };
    const startDateChange = (event: any) => {
        const dateStr = event.target.value;
        if (dateStr) {
            setMinEndDate(dateFormat(dateStr));
            setParams({ ...params, start: dateStr, end: '' });
        }
    };
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
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


    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const radarChart: any = {
        series: [
            {
                name: '24년 1학기 성적',
                data: [100, 80, 90, 70, 85, 78],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'radar',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#4361ee'],
            xaxis: {
                categories: ['국어', '영어', '수학', '미술', '사회', '과학'],
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: isDark ? '#191e3a' : '#e0e6ed',
                        connectorColors: isDark ? '#191e3a' : '#e0e6ed',
                    },
                },
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        학생
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>메인</span>
                </li>
            </ul>
            <div className="pt-5 grid xl:grid-cols-2 grid-cols-1 gap-6">
                <div className="panel">
                    <div className="mb-5">
                        <p className="text-white-dark font-bold mb-5 text-base">24년 05월 13일</p>
                        <div className="sm:flex">
                            <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
                                <img src="/assets/images/profile-16.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">김수연</h4>
                                <p className="text-center ltr:sm:text-left rtl:sm:text-right">2분 전</p>
                                <div className="mt-4 sm:mt-7 mb-16">
                                    <IconGlobe className="w-5 h-5 text-white-dark ltr:mr-2.5 rtl:ml-2.5 inline-block align-text-bottom" />
                                    <h6 className="inline-block font-bold mb-2 text-lg">오늘 나랑 엽떡 먹을사람??</h6>
                                    <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                                        시험 끝났는데 망한거 같다... 같이 엽떡 먹을 사람 구한다 진짜....ㅇ
                                    </p>
                                    <div className="ltr:pl-8 rtl:pr-8 flex space-x-1 rtl:space-x-reverse mt-6">
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-1.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-2.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-4.jpg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:flex">
                            <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
                                <img src="/assets/images/profile-7.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">민동현</h4>
                                <p className="text-center ltr:sm:text-left rtl:sm:text-right">15분 전</p>
                                <div className="mt-4 sm:mt-7 mb-16">
                                    <IconGallery className="text-white-dark ltr:mr-2.5 rtl:ml-2.5 inline-block align-text-bottom" />
                                    <h6 className="inline-block font-bold mb-2 text-lg">아 배고파.</h6>
                                    <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                                        배ㅑ고파 에너지파 파라파라팔달관 라면~~
                                    </p>
                                    <div className="ltr:pl-8 rtl:pr-8 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3 mt-6">
                                        <img
                                            src="/assets/images/drag-1.jpeg"
                                            alt="img"
                                            className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-4.jpg"
                                            alt="img"
                                            className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:flex">
                            <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
                                <img src="/assets/images/profile-16.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">박종원</h4>
                                <p className="text-center ltr:sm:text-left rtl:sm:text-right">45분 전</p>
                                <div className="mt-4 sm:mt-7 mb-16">
                                    <IconTxtFile className="w-4.5 h-4.5 text-white-dark ltr:mr-2.5 rtl:ml-2.5 inline-block align-text-bottom" />
                                    <h6 className="inline-block font-bold mb-2 text-lg">캡스톤 디자인 망했다...</h6>
                                    <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                                        캡스톤 디자인 너무 빡센데 어떻게 하지...? 다들 얼마나 했어??
                                    </p>
                                    <div className="ltr:pl-8 rtl:pr-8 flex space-x-1 rtl:space-x-reverse mt-6">
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-1.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-2.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-4.jpg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
           

                    <div className="panel mb-5">
                        <div className="flex items-start justify-between dark:text-white-light mb-5 -mx-5 p-5 pt-0 border-b  border-white-light dark:border-[#1b2e4b]">
                            <h5 className="font-semibold text-lg ">활동 모음</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 2]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">전체 보기</button>
                                        </li>
                                        <li>
                                            <button type="button">읽음 처리 하기</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <PerfectScrollbar className="perfect-scrollbar relative h-[200px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3">
                            <div className="space-y-7">
                                <div className="flex">
                                    <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                                        <div className="bg-secondary shadow shadow-secondary w-8 h-8 rounded-full flex items-center justify-center text-white">
                                            <IconPlus className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">
                                            국어 과목 새 과제 등장 :{' '}
                                            <button type="button" className="text-success">
                                                [메밀 꽃 필 무렵 수행평가 안내]
                                            </button>
                                        </h5>
                                        <p className="text-white-dark text-xs">2024년 10월 11일</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                                        <div className="bg-success shadow-success w-8 h-8 rounded-full flex items-center justify-center text-white">
                                            <IconMail className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">
                                            남창현(국어){' '}
                                            <button type="button" className="text-white-dark">
                                                선생님이
                                            </button>{' '}
                                            민동현{' '}
                                            <button type="button" className="text-white-dark">
                                                학생에게 상담을 신청했습니다.
                                            </button>
                                        </h5>
                                        <p className="text-white-dark text-xs">2024년 08월 11일</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                                        <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white">
                                            <IconChecks className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold dark:text-white-light">국어 : 별 헤는 밤 시 짖기 숙제를 통과하셨습니다.</h5>
                                        <p className="text-white-dark text-xs">2024년 07월 23일</p>
                                    </div>
                                </div>
                         
                            </div>
                        </PerfectScrollbar>
                    </div>


                    <div className="panel mb-5">
                        <div className="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                            <div className="sm:mb-0 mb-4">
                                <div className="text-lg font-semibold ltr:sm:text-left rtl:sm:text-right text-center">일정</div>
                                <div className="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                                    <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                        <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                                        <div>수업</div>
                                    </div>
                                    <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                        <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-info"></div>
                                        <div>과목</div>
                                    </div>
                                    <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                        <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-success"></div>
                                        <div>개인 일정</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-danger"></div>
                                        <div>학교 일정</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => editEvent()}>
                                <IconPlus className="ltr:mr-2 rtl:ml-2" />
                                일정 추가
                            </button>
                        </div>
                        <div className="calendar-wrapper">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                                }}
                                editable={true}
                                dayMaxEvents={true}
                                selectable={true}
                                droppable={true}
                                eventClick={(event: any) => editEvent(event)}
                                select={(event: any) => editDate(event)}
                                events={events}
                            />
                        </div>
                    </div>

                    {/* add event modal */}
                    <Transition appear show={isAddEventModal} as={Fragment}>
                        <Dialog as="div" onClose={() => setIsAddEventModal(false)} open={isAddEventModal} className="relative z-[51]">
                            <Transition.Child
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enter-from="opacity-0"
                                enter-to="opacity-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100"
                                leave-to="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center px-4 py-8">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-300 ease-out"
                                        enter-from="opacity-0 scale-95"
                                        enter-to="opacity-100 scale-100"
                                        leave="duration-200 ease-in"
                                        leave-from="opacity-100 scale-100"
                                        leave-to="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                            <button
                                                type="button"
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                onClick={() => setIsAddEventModal(false)}
                                            >
                                                <IconX />
                                            </button>
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                {params.id ? 'Edit Event' : 'Add Event'}
                                            </div>
                                            <div className="p-5">
                                                <form className="space-y-5">
                                                    <div>
                                                        <label htmlFor="title">Event Title :</label>
                                                        <input
                                                            id="title"
                                                            type="text"
                                                            name="title"
                                                            className="form-input"
                                                            placeholder="Enter Event Title"
                                                            value={params.title || ''}
                                                            onChange={(e) => changeValue(e)}
                                                            required
                                                        />
                                                        <div className="text-danger mt-2" id="titleErr"></div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="dateStart">From :</label>
                                                        <input
                                                            id="start"
                                                            type="datetime-local"
                                                            name="start"
                                                            className="form-input"
                                                            placeholder="Event Start Date"
                                                            value={params.start || ''}
                                                            min={minStartDate}
                                                            onChange={(event: any) => startDateChange(event)}
                                                            required
                                                        />
                                                        <div className="text-danger mt-2" id="startDateErr"></div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="dateEnd">To :</label>
                                                        <input
                                                            id="end"
                                                            type="datetime-local"
                                                            name="end"
                                                            className="form-input"
                                                            placeholder="Event End Date"
                                                            value={params.end || ''}
                                                            min={minEndDate}
                                                            onChange={(e) => changeValue(e)}
                                                            required
                                                        />
                                                        <div className="text-danger mt-2" id="endDateErr"></div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="description">Event Description :</label>
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            className="form-textarea min-h-[130px]"
                                                            placeholder="Enter Event Description"
                                                            value={params.description || ''}
                                                            onChange={(e) => changeValue(e)}
                                                        ></textarea>
                                                    </div>
                                                    <div>
                                                        <label>Badge:</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio"
                                                                    name="type"
                                                                    value="primary"
                                                                    checked={params.type === 'primary'}
                                                                    onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                                />
                                                                <span className="ltr:pl-2 rtl:pr-2">Work</span>
                                                            </label>
                                                            <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-info"
                                                                    name="type"
                                                                    value="info"
                                                                    checked={params.type === 'info'}
                                                                    onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                                />
                                                                <span className="ltr:pl-2 rtl:pr-2">Travel</span>
                                                            </label>
                                                            <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-success"
                                                                    name="type"
                                                                    value="success"
                                                                    checked={params.type === 'success'}
                                                                    onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                                />
                                                                <span className="ltr:pl-2 rtl:pr-2">Personal</span>
                                                            </label>
                                                            <label className="inline-flex cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-danger"
                                                                    name="type"
                                                                    value="danger"
                                                                    checked={params.type === 'danger'}
                                                                    onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                                />
                                                                <span className="ltr:pl-2 rtl:pr-2">Important</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end items-center !mt-8">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddEventModal(false)}>
                                                            Cancel
                                                        </button>
                                                        <button type="button" onClick={() => saveEvent()} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            {params.id ? 'Update Event' : 'Create Event'}
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

                </div>
            </div>
        </div>
    );
};

export default TeacherHome;
