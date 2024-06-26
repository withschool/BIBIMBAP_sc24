import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    var accountTypes = localStorage.getItem('accountType');

    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (



        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('withSchool')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">


                            {accountTypes == "ROLE_PARENT" && <div>

                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <IconMinus className="w-4 h-5 flex-none hidden" />
                                    <span>{t('학부모')}</span>
                                </h2>

                                <li className="nav-item">
                                    <ul>
                                        <li className="nav-item">
                                            <NavLink to="/parent/home" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuChat className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('메인')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/parent/studentinfo" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuChat className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('학생 정보')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/parent/schoolinfo" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuChat className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('학교 정보')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/parent/counsel" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuChat className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('상담')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/users/user-account-settings" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('프로필')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>


                            </div>}
                            {accountTypes == "ROLE_STUDENT" && <div>


                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <IconMinus className="w-4 h-5 flex-none hidden" />
                                    <span>{t('학생')}</span>
                                </h2>

                                <li className="nav-item">
                                    <ul>
                                        <li className="nav-item">
                                            <NavLink to="/student/home" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuChat className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('학생 홈')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'subject' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('subject')}>
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('공지 확인')}</span>
                                                </div>

                                                <div className={currentMenu !== 'subject' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'subject' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/student/schoolnotice">{t('학교 공지')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/student/classnotice">{t('반 공지')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/student/subjectnotice">{t('과목 공지')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/student/scrumboard" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('칼반 보드')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/student/calendar" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('일정 관리')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/student/counsel" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('상담')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/student/homework" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuContacts className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('강의 노트')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/student/lecturenote" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuContacts className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('강의 노트')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('메뉴 7')}</span>
                                                </div>

                                                <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/apps/invoice/list">{t('내용 1')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/apps/invoice/preview">{t('내용 2')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/apps/invoice/add">{t('내용 3')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/apps/invoice/edit">{t('내용 4')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                      </li>

                                    </ul>
                                </li>

                            </div>}
                            {accountTypes == "ROLE_TEACHER" && <div>


                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <IconMinus className="w-4 h-5 flex-none hidden" />
                                    <span>{t('교사')}</span>
                                </h2>

                                <li className="nav-item">
                                    <ul>
                                        <li className="nav-item">
                                            <NavLink to="/teacher/home" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuMailbox className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('메인')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/teacher/schoolnotice" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuMailbox className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('학교 공지')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'class' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('class')}>
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('반 관리')}</span>
                                                </div>

                                                <div className={currentMenu !== 'class' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'class' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/teacher/class/notice">{t('공지 사항')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/class/infomation">{t('기본 정보')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/class/watchgrade">{t('성적 조회')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'subject' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('subject')}>
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('과목 관리')}</span>
                                                </div>

                                                <div className={currentMenu !== 'subject' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'subject' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/teacher/subject/notice">{t('공지 사항')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/subject/infomation">{t('기본 정보')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/subject/lecturenote">{t('강의 노트')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/subject/homework">{t('과제')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/subject/grade">{t('성적 관리')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/subject/qna">{t('Q & A')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/subject/choose">{t('과목 목록')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('상담')}</span>
                                                </div>

                                                <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/teacher/counsel/view">{t('상담 전체 조회')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/teacher/counsel/apply">{t('상담 신청 목록')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/users/user-account-settings" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('프로필')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>


                            </div>}
                            {accountTypes == "ROLE_ADMIN" && <div>

                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className="flex items-center">
                                            <IconMenuDashboard
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('관리')}</span>
                                        </div>

                                        <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/admin/home">{t('학교 관리')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/admin/notice">{t('공지 작성하기')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/admin/schoolnotice">{t('공지 확인하기')}</NavLink>
                                            </li>


                                        </ul>
                                    </AnimateHeight>

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'class' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('class')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('결제')}</span>
                                            </div>

                                            <div className={currentMenu !== 'class' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'class' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/admin/invoice/list">{t('결제 목록')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/admin/invoice/preview">{t('결제 정보 조회')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/admin/invoice/add">{t('결제 진행')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </li>

                            </div>}
                            {accountTypes == "ROLE_SUPER" && <div>

                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className="flex items-center">
                                            <IconMenuDashboard
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Super Admin')}</span>
                                        </div>


                                        <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/super/home">{t('학교 목록')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/super/apply">{t('학교 신청 관리')}</NavLink>
                                            </li>
                                       
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </div>}
{/* 
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('컴포넌트 예시')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('components')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/components/Tabs">{t('Tabs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/Forms">{t('Forms')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/Accordians">{t('Accordians')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/Tables">{t('Tables')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/Modals">{t('Modals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/Notification">{t('Notification')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/SweetAlert">{t('SweetAlert')}</NavLink>
                                        </li>

                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'element' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('element')}>
                                    <div className="flex items-center">
                                        <IconMenuElements className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('elements')}</span>
                                    </div>

                                    <div className={currentMenu !== 'element' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'element' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/Elements/Alerts">{t('Alerts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Avatar">{t('Avatar')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Badges">{t('Badges')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Breadcrumbs">{t('Breadcrumbs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Buttons">{t('Buttons')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Colorlibrary">{t('Colorlibrary')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/FontIcons">{t('FontIcons')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Loader">{t('Loader')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Typography">{t('Typography')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Elements/Popovers">{t('Popovers')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
