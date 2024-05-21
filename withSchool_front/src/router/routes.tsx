import { lazy, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SelectStudentOrParent from '../pages/Authentication/SelectStudentOrParent';
const Index = lazy(() => import('../pages/Index'));
const SchoolList = lazy(() => import('../pages/SuperAdmin/SchoolList'));
const Login = lazy(() => import('../pages/Authentication/LoginBoxed'));
const Register = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const SignIn = lazy(() => import('../pages/Authentication/SignInBoxed'));
const Error = lazy(() => import('../components/Error'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));

//Admin
const AdminMain = lazy(() => import('../pages/Admin/ManageSchool'));

//Teacher
const TeacherHome = lazy(() => import('../pages/Teacher/TeacherHome'));
const TeacherNotice = lazy(() => import('../pages/Teacher/TeacherNotice'));
const ClassInfo = lazy(() => import('../pages/Teacher/ClassInfo'));
const SubjectInfo = lazy(() => import('../pages/Teacher/SubjectInfo'));
const SchoolNotice = lazy(() => import('../pages/Teacher/SchoolNotice'));

//Parent
const ParentHome = lazy(() => import('../pages/Parent/ParentHome'));
const StudentInfo = lazy(() => import('../pages/Parent/StudentInfo'));
const SchoolInfo = lazy(() => import('../pages/Parent/SchoolInfo'));

//Student
const StudentHome = lazy(() => import('../pages/Student/StudentHome'));

//Components
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Forms = lazy(() => import('../pages/Components/Forms'));
const Accordians = lazy(() => import('../pages/Components/Accordians'));
const Tables = lazy(() => import('../pages/Components/Tables'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Notification = lazy(() => import('../pages/Components/Notification'));
const SweetAlert = lazy(() => import('../pages/Components/SweetAlert'));


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
    {
        path: '/',
        element: localStorage.getItem('token') ? 
                (localStorage.getItem('accountType') == 'ROLE_SUPER' ? <Navigate to="/super/home" /> :
                    (localStorage.getItem('accountType') == 'ROLE_ADMIN' ?  <Navigate to="/admin/home" /> :
                        (localStorage.getItem('accountType') == 'ROLE_TEACHER' ? <Navigate to="/teacher/home" /> :
                            (localStorage.getItem('accountType') == 'ROLE_PARENT' ? <Navigate to="/parent/home" /> : <Navigate to="/student/home" /> )
                        ))) : <Navigate to="/login" />,

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
    {
        path: '/school_list',
        element: (localStorage.getItem('accountType')  == 'ROLE_SUPER')  ? <SchoolList /> : <Navigate to="/"  />,
    },
    {
        path: '/teacher/class/notice',
        element: (localStorage.getItem('accountType')  == 'ROLE_TEACHER')  ? <TeacherNotice /> : <Navigate to="/"  />,
    },
    {
        path: '/teacher/home',
        element: (localStorage.getItem('accountType')  == 'ROLE_TEACHER') ? <TeacherHome /> : <Navigate to="/" />,
    },
   {
        path: '/parent/home',
        element: (localStorage.getItem('accountType')  == 'ROLE_PARENT') ? <ParentHome /> : <Navigate to="/" />,
    },
    {
        path: '/teacher/schoolnotice',
        element: (localStorage.getItem('accountType')  == 'ROLE_TEACHER') ? <SchoolNotice /> : <Navigate to="/"  />,
    },
    {
        path: '/teacher/class/infomation',
        element: (localStorage.getItem('accountType')  == 'ROLE_TEACHER') ? <ClassInfo /> : <Navigate to="/"  />,
    },
    {
        path: '/teacher/subject/infomation',
        element: (localStorage.getItem('accountType')  == 'ROLE_TEACHER') ? <SubjectInfo /> : <Navigate to="/"  />,
    },
    {
        path: '/users/user-account-settings',
        element: localStorage.getItem('token') ? <AccountSetting /> : <Navigate to="/"  />,
    },
    {
        path: '/student/home',
        element: (localStorage.getItem('accountType')  == 'ROLE_STUDENT') ? <StudentHome /> : <Navigate to="/"  />,
    },
    {
        path: '/parent/studentinfo',
        element: (localStorage.getItem('accountType')  == 'ROLE_PARENT') ? <StudentInfo /> : <Navigate to="/"  />,
    },
    {
        path: '/parent/schoolinfo',
        element: (localStorage.getItem('accountType') == 'ROLE_PARENT') ? <SchoolInfo /> : <Navigate to="/"  />,
    },

    //Admin

    {
        path: '/admin',
        element: (localStorage.getItem('accountType') == 'ROLE_ADMIN') ? <AdminMain /> : <Navigate to="/"  />,
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
