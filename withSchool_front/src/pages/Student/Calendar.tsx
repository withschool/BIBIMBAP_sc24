import FullCalendar from '@fullcalendar/react';
// import '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import IconX from '../../components/Icon/IconX';

const Calendar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('일정'));
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, [dispatch]);
    const now = new Date();
    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
    };
    const [events, setEvents] = useState<any>([
        {
            id: 1,
            title: '수업 시간',
            start: now.getFullYear() + '-' + getMonth(now) + '-01T09:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-01T15:00:00',
            className: 'primary',
            description: '수학, 과학, 영어 수업이 있는 날입니다.',
        },
        {
            id: 2,
            title: '동아리 활동',
            start: now.getFullYear() + '-' + getMonth(now) + '-05T15:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-05T17:00:00',
            className: 'info',
            description: '축구 동아리 활동이 있습니다.',
        },
        {
            id: 3,
            title: '중간고사',
            start: now.getFullYear() + '-' + getMonth(now) + '-10T09:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-10T12:00:00',
            className: 'danger',
            description: '중간고사 시험이 있는 날입니다. 준비하세요!',
        },
        {
            id: 4,
            title: '학부모 상담',
            start: now.getFullYear() + '-' + getMonth(now) + '-15T14:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-15T16:00:00',
            className: 'warning',
            description: '학부모 상담이 예정되어 있습니다.',
        },
        {
            id: 5,
            title: '체육 대회',
            start: now.getFullYear() + '-' + getMonth(now) + '-20T09:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-20T17:00:00',
            className: 'success',
            description: '학교 체육 대회가 열립니다. 모두 참여하세요!',
        },
        {
            id: 6,
            title: '과학 실험',
            start: now.getFullYear() + '-' + getMonth(now) + '-25T13:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-25T15:00:00',
            className: 'info',
            description: '과학 실험 수업이 있습니다. 실험 도구를 준비하세요.',
        },
        {
            id: 7,
            title: '방과후 수업',
            start: now.getFullYear() + '-' + getMonth(now) + '-28T15:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-28T17:00:00',
            className: 'primary',
            description: '방과후 수업이 있습니다. 늦지 않게 참석하세요.',
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

    const deleteEvent = (id: number) => {
        console.log("Deleting event with ID:", id); // 로그 추가
        const updatedEvents = events.filter((event: any) => event.id !== id);
        setEvents(updatedEvents);
        console.log("Updated events state:", updatedEvents); // 상태 업데이트 로그 추가
    };
    
    // 상태 변경 모니터링
    useEffect(() => {
        console.log("Updated events:", events);
        localStorage.setItem('events', JSON.stringify(events));
        console.log("Updated localStorage events:", localStorage.getItem('events')); // 로그 추가
    }, [events]);

    const eventClickHandler = (event: any) => {
        Swal.fire({
            title: '일정을 수정하거나 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '수정',
            cancelButtonText: '삭제',
        }).then((result) => {
            if (result.isConfirmed) {
                editEvent(event);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                deleteEvent(event.event.id);
            }
        });
    };

    const saveEvent = () => {
        if (!params.title || !params.start || !params.end) {
            return true;
        }
        let dataevent = [...events]; // Create a copy of the events array
        if (params.id) {
            // Update event
            let eventIndex = dataevent.findIndex((d: any) => d.id === parseInt(params.id));
            if (eventIndex !== -1) {
                dataevent[eventIndex] = {
                    ...dataevent[eventIndex],
                    title: params.title,
                    start: params.start,
                    end: params.end,
                    description: params.description,
                    className: params.type,
                };
            }
        } else {
            // Add event
            let maxEventId = dataevent.length ? Math.max(...dataevent.map((e: any) => e.id)) : 0;
            let event = {
                id: maxEventId + 1,
                title: params.title,
                start: params.start,
                end: params.end,
                description: params.description,
                className: params.type,
            };
            dataevent = dataevent.concat([event]);
        }
        setEvents(dataevent);
        localStorage.setItem('events', JSON.stringify(dataevent));
        showMessage('일정 작업이 완료되었습니다.');
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

    return (
        <div>

            <div className="panel mb-5">
                <div className="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <div className="sm:mb-0 mb-4">
                        <div className="text-lg font-semibold ltr:sm:text-left rtl:sm:text-right text-center">Calendar</div>
                        <div className="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                                <div>학교</div>
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
                        일정 생성하기
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
                        eventClick={eventClickHandler}
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
                                                <label htmlFor="title">일정 제목 :</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="일정 이름"
                                                    value={params.title || ''}
                                                    onChange={(e) => changeValue(e)}
                                                    required
                                                />
                                                <div className="text-danger mt-2" id="titleErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="dateStart">시작일 :</label>
                                                <input
                                                    id="start"
                                                    type="datetime-local"
                                                    name="start"
                                                    className="form-input"
                                                    placeholder="시작일 선택"
                                                    value={params.start || ''}
                                                    min={minStartDate}
                                                    onChange={(event: any) => startDateChange(event)}
                                                    required
                                                />
                                                <div className="text-danger mt-2" id="startDateErr"></div>
                                            </div>
                                            <div>
                                                <label htmlFor="dateEnd">종료일 :</label>
                                                <input
                                                    id="end"
                                                    type="datetime-local"
                                                    name="end"
                                                    className="form-input"
                                                    placeholder="종료일 선택"
                                                    value={params.end || ''}
                                                    min={minEndDate}
                                                    onChange={(e) => changeValue(e)}
                                                    required
                                                />
                                                <div className="text-danger mt-2" id="endDateErr"></div>
                                            </div>
                                            <div>
                                                <label htmlFor="description">세부 일정 :</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="form-textarea min-h-[130px]"
                                                    placeholder="세부 일정을 입력해 주세요"
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
                                                        <span className="ltr:pl-2 rtl:pr-2">수업</span>
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
                                                        <span className="ltr:pl-2 rtl:pr-2">과목</span>
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
                                                        <span className="ltr:pl-2 rtl:pr-2">개인 일정</span>
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
                                                        <span className="ltr:pl-2 rtl:pr-2">학교 일정</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex justify-end items-center !mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddEventModal(false)}>
                                                    취소
                                                </button>
                                                <button type="button" onClick={() => saveEvent()} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {params.id ? '일정 수정하기' : '일정 생성하기'}
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
    );
};

export default Calendar;
