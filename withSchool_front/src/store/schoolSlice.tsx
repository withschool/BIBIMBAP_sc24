import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SchoolState {
    schoolName: string;
}

const initialState: SchoolState = {
    schoolName: '',
};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {
        setSchoolName(state, action: PayloadAction<string>) {
            state.schoolName = action.payload;
        },
    },
});

export const { setSchoolName } = schoolSlice.actions;
export default schoolSlice.reducer;