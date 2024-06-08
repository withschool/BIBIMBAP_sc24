import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from './schoolSlice';
import themeConfigReducer from './themeConfigSlice';

const store = configureStore({
    reducer: {
        school: schoolReducer,
        themeConfig: themeConfigReducer,
        // 다른 리듀서들...
    },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;