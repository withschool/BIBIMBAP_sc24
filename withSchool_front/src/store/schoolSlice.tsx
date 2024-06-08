import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SchoolState {
    selectedSchoolName: string;
}

const initialState: SchoolState = {
    selectedSchoolName: '',
};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {
        setSelectedSchoolName(state, action: PayloadAction<string>) {
            state.selectedSchoolName = action.payload;
        },
    },
});

export const { setSelectedSchoolName } = schoolSlice.actions;
export default schoolSlice.reducer;