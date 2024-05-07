import { lazy } from 'react';
const Login = lazy(() => import('../pages/Authentication/LoginPage') as Promise<{ default: React.ComponentType<any> }>);
const Error = lazy(() => import('../components/Error'));


const routes = [
    // dashboard
    {
        path: '/',
        element: <Login />,
    },
    // {
    //     path: '/index',
    //     element: <Index />,
    // },
    // analytics page
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
