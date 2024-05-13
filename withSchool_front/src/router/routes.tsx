import { lazy, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
const Index = lazy(() => import('../pages/Index'));
const SchoolList = lazy(() => import('../pages/SuperAdmin/SchoolList'));
const Login = lazy(() => import('../pages/Authentication/LoginBoxed'));
const Register = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const Error = lazy(() => import('../components/Error'));
const TeacherNotice = lazy(() => import('../pages/Teacher/TeacherNotice'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const StudentHome = lazy(() => import('../pages/Student/StudentHome'));



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
        path: '/register',
        element: <Register />,
        layout: 'blank',
    },
    {
        path: '/school_list',
        element: <SchoolList />,
    },
    {
        path: '/teacher/notice',
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
        path: '*',
        element: <Error />,
        layout: 'blank',
    }
];

export { routes };
