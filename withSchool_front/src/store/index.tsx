import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from './schoolSlice';
import themeConfigReducer from './themeConfigSlice'; // 기존에 있는 리듀서

const store = configureStore({
    reducer: {
        school: schoolReducer,
        themeConfig: themeConfigReducer, // 기존에 있는 리듀서
    },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;