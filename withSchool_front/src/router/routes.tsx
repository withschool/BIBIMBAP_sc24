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
        path: '/teacher/notice',
        element: <TeacherNotice />,
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
