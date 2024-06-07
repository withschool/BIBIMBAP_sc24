import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

        <Suspense>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </Suspense>
);

function checkTokenExpiry() {
const tokenExpiry = localStorage.getItem('expDate');
    if (tokenExpiry) {
        const tokenExpiryInt = parseInt(tokenExpiry, 10);
        const currentTime = Date.now() / 1000;
        if (currentTime >= tokenExpiryInt ) {
        logout();
        }
    }
}
  
function logout() {
    localStorage.clear();
    alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
    window.location.href = '/login';
}

document.addEventListener('DOMContentLoaded', (event) => {
    checkTokenExpiry();
    setInterval(checkTokenExpiry, 60000);
});
