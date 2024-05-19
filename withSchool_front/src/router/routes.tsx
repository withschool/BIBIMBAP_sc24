import { lazy, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SelectStudentOrParent from '../pages/Authentication/SelectStudentOrParent';
const Index = lazy(() => import('../pages/Index'));
const SchoolList = lazy(() => import('../pages/SuperAdmin/SchoolList'));
const Login = lazy(() => import('../pages/Authentication/LoginBoxed'));
const Register = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const SignIn = lazy(() => import('../pages/Authentication/SignInBoxed'));
const Error = lazy(() => import('../components/Error'));
const TeacherNotice = lazy(() => import('../pages/Teacher/TeacherNotice'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const StudentHome = lazy(() => import('../pages/Student/StudentHome'));
const StudentInfo = lazy(() => import('../pages/Parent/StudentInfo'))
const SchoolInfo = lazy(() => import('../pages/Parent/SchoolInfo'))

//Admin
const AdminMain = lazy(() => import('../pages/Admin/ManageSchool'));




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
        element: localStorage.getItem('token') ? <Index /> : <Navigate to="/login" replace />,
        // element: localStorage.getItem('token') ? <Index /> : <Index />,
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
        element: <SchoolList />,
    },
    {
        path: '/teacher/class/notice',
        element: <TeacherNotice />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    {
        path: '/student-home',
        element: <StudentHome />,
    },
    {
        path: '/parent/studentinfo',
        element: <StudentInfo />,
    },
    {
        path: '/parent/schoolinfo',
        element: <SchoolInfo />,
    },

    //Admin

    {
        path: '/admin',
        element: <AdminMain />,
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
