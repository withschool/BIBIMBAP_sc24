import { lazy, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SelectStudentOrParent from '../pages/Authentication/SelectStudentOrParent';
const Index = lazy(() => import('../pages/Index'));
const SchoolList = lazy(() => import('../pages/SuperAdmin/SchoolList'));
const SchoolApply = lazy(() => import('../pages/SuperAdmin/SchoolApply'));


const Login = lazy(() => import('../pages/Authentication/LoginBoxed'));
const Register = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const SignIn = lazy(() => import('../pages/Authentication/SignInBoxed'));
const Error = lazy(() => import('../components/Error'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const Landing = lazy(() => import('../pages/Users/Landing'));


//Admin
const AdminMain = lazy(() => import('../pages/Admin/ManageSchool'));
const AdminNo = lazy(() => import('../pages/Admin/AdminNotice'));
const InvoiceList = lazy(() => import('../pages/Admin/InvoiceList'));
const InvoiceAdd = lazy(() => import('../pages/Admin/InvoiceAdd'));


//Teacher
const TeacherHome = lazy(() => import('../pages/Teacher/TeacherHome'));
const TeacherNotice = lazy(() => import('../pages/Teacher/TeacherNotice'));
const SubjectNotice = lazy(() => import('../pages/Teacher/TeacherSubjectNotice'));
const ClassInfo = lazy(() => import('../pages/Teacher/ClassInfo'));
const SubjectInfo = lazy(() => import('../pages/Teacher/SubjectInfo'));
const SchoolNotice = lazy(() => import('../pages/Teacher/SchoolNotice'));
const ChooseSubjectStudent = lazy(() => import('../pages/Student/ChooseSubjectStudent'));
const ChooseSubjectTeacher = lazy(() => import('../pages/Teacher/ChooseSubjectTeacher'));
const CounselTeacherAssign = lazy(() => import('../pages/Teacher/CounselTeacherAssign'));
const CounselTeacherList = lazy(() => import('../pages/Teacher/CounselTeacherList'));
const LectureNote = lazy(() => import('../pages/Teacher/LectureNote'));
const Homework = lazy(() => import('../pages/Teacher/Homework'));
// const Score = lazy(() => import('../pages/Teacher/Score'));
// const ScoreClass = lazy(() => import('../pages/Teacher/ScoreClass'))

//Parent
const ParentHome = lazy(() => import('../pages/Parent/ParentHome'));
const StudentInfo = lazy(() => import('../pages/Parent/StudentInfo'));
const SchoolInfo = lazy(() => import('../pages/Parent/SchoolInfo'));
const CounselParent = lazy(() => import('../pages/Parent/CounselParent'));

//Student
const StudentHome = lazy(() => import('../pages/Student/StudentHome'));
const StudentClassNotice = lazy(() => import('../pages/Student/ClassNotice'));
const StudentSubjectNotice = lazy(() => import('../pages/Student/StudentSubjectNotice'));
const Scrumboard = lazy(() => import('../pages/Student/Scrumboard'));
const Calendar = lazy(() => import('../pages/Student/Calendar'));
const Counsel = lazy(() => import('../pages/Student/Counsel'));
const StudentQuestion = lazy(() => import('../pages/Student/StudentQuestion'));
const Assignment = lazy(() => import('../pages/Student/Assignment'));
const LectureNoteStudent = lazy(() => import('../pages/Student/LectureNoteStudent'));
<<<<<<< HEAD
=======
const InvoicePreview = lazy(() => import('../pages/Admin/InvoicePreview'));

>>>>>>> bdb6fdad30fbba642763176b0ae78b18afa039dc

//Components
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Forms = lazy(() => import('../pages/Components/Forms'));
const Accordians = lazy(() => import('../pages/Components/Accordians'));
const Tables = lazy(() => import('../pages/Components/Tables'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Notification = lazy(() => import('../pages/Components/Notification'));


// Elements
const Alerts = lazy(() => import('../pages/Elements/Alerts'));
const Avatar = lazy(() => import('../pages/Elements/Avatar'));
const Badges = lazy(() => import('../pages/Elements/Badges'));
const Breadcrumbs = lazy(() => import('../pages/Elements/Breadcrumbs'));
const Buttons = lazy(() => import('../pages/Elements/Buttons'));
const Colorlibrary = lazy(() => import('../pages/Elements/Colorlibrary'));
const FontIcons = lazy(() => import('../pages/Elements/FontIcons'));
const Loader = lazy(() => import('../pages/Elements/Loader'));
const Typography = lazy(() => import('../pages/Elements/Typography'));
const Popovers = lazy(() => import('../pages/Elements/Popovers'));




const routes = [

    //home
    {
        path: '/',
        element: localStorage.getItem('token') ? <Index /> : <Navigate to="/landing" replace />,
        // element: localStorage.getItem('token') ? <Index /> : <Index />,
    },
    {
        path: '/landing',
        element: <Landing />,
        layout: 'blank',
    },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/register/choose',
        element: <SelectStudentOrParent />,
        layout: 'blank',
    },
    {
        path: '/register',
        element: <Register />,
        layout: 'blank',
    },
    {
        path: '/register/sign-in',
        element: <SignIn />,
        layout: 'blank',
    },

    //super
    {
        path: '/super/home',
        element: <SchoolList />,
    },

    //teacher  
    {
        path: '/teacher/class/notice',
        element: <TeacherNotice />,
    },
    {
        path: '/teacher/subject/notice',
        element: <SubjectNotice />,
    },
    {
        path: '/teacher/home',
        element: <TeacherHome />,
    },
    {
        path: '/parent/home',
        element: <TeacherNotice />,
    },

    {
        path: '/super/apply',
        element: <SchoolApply />,
    },

    {
        path: '/teacher/schoolnotice',
        element: <SchoolNotice />,
    },
    {
        path: '/teacher/class/infomation',
        element: <ClassInfo />,
    },
    {
        path: '/teacher/subject/infomation',
        element: <SubjectInfo />,
    },
    {
        path: '/teacher/subject/choose',
        element: <ChooseSubjectTeacher />,
    },
    {
        path: '/teacher/class/watchgrade',
        element: <ScoreClass />,

    },
    {
        path: '/teacher/subject/homework',
        element: <Homework />,

    },
    {

        path: '/teacher/counsel/view',
        element: <CounselTeacherList />,

    },
    {
        path: '/teacher/counsel/apply',
        element: <CounselTeacherAssign />,

    },
    {
        path: '/teacher/subject/lecturenote',
        element: <LectureNote />,

    },
    {
        path: '/teacher/subject/grade',
        element: <Score />,

    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },


    //Student
    {
        path: '/student/classnotice',
        element: <StudentClassNotice />,
    },

    {
        path: '/student/subjectnotice',
        element: <StudentSubjectNotice />,
    },

    {
        path: '/student/calendar',
        element: <Calendar />,
    },

    {
        path: '/student/home',
        element: <StudentHome />,
    },

    {
        path: '/student/counsel',
        element: <Counsel />,
    },

    {
        path: '/student/question',
        element: <StudentQuestion />,
    },

    {
        path: '/student/lecturenote',
        element: <LectureNoteStudent />,
    },


    {
        path: '/parent/studentinfo',
        element: <StudentInfo />,
    },

    {
        path: '/student/subject/choose',
        element: <ChooseSubjectStudent />,
    },

    {
        path: '/parent/schoolinfo',
        element: <SchoolInfo />,
    },
    {
        path: '/parent/counsel',
        element: <CounselParent />,
    },
    {
        path: '/student/scrumboard',
        element: <Scrumboard />,
    },
    {
        path: '/student/homework',
        element: <Assignment />,
    },

    //Admin

    {
        path: '/admin/home',
        element: <AdminMain />,
    },
    {
        path: '/admin/notice',
        element: <AdminNo />,
    },
    {
        path: '/admin/schoolnotice',
        element: <SchoolNotice />,
    },

    {
        path: '/admin/invoice/list',
        element: <InvoiceList />,
    },


    {
        path: '/admin/invoice/add',
        element: <InvoiceAdd />,
    },


    {
        path: '/student/schoolnotice',
        element: <SchoolNotice />,
    },

    //Components
    {
        path: '/components/Tabs',
        element: <Tabs />,
    },
    {
        path: '/components/Forms',
        element: <Forms />,
    },
    {
        path: '/components/Accordians',
        element: <Accordians />,
    },
    {
        path: '/components/Tables',
        element: <Tables />,
    },
    {
        path: '/components/Modals',
        element: <Modals />,
    },
    {
        path: '/components/Notification',
        element: <Notification />,
    },
    {
        path: '/components/SweetAlert',
        element: <SweetAlert />,
    },

    //Elements
    {
        path: '/Elements/Alerts',
        element: <Alerts />,
    },
    {
        path: '/Elements/Avatar',
        element: <Avatar />,
    },
    {
        path: '/Elements/Badges',
        element: <Badges />,
    },
    {
        path: '/Elements/Breadcrumbs',
        element: <Breadcrumbs />,
    },
    {
        path: '/Elements/Buttons',
        element: <Buttons />,
    },
    {
        path: '/Elements/Colorlibrary',
        element: <Colorlibrary />,
    },
    {
        path: '/Elements/FontIcons',
        element: <FontIcons />,
    },
    {
        path: '/Elements/Loader',
        element: <Loader />,
    },
    {
        path: '/Elements/Typography',
        element: <Typography />,
    },
    {
        path: '/Elements/Popovers',
        element: <Popovers />,
    },



    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    }
];

export { routes };
