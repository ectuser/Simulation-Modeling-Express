import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentWeather : 0,
    currentTime : 0
};

const lab15Store = createSlice({
    name : 'lab15',
    initialState, 
    reducers : {
        getCurrentStatus(state, action){},
        setCurrentStatus(state, action){
            state.currentWeather = action.payload.i;
            state.currentTime = action.payload.t;
        }
    }
});

export default lab15Store.reducer;
export const {getCurrentStatus, setCurrentStatus} = lab15Store.actions;
export const selectLab15 = (state) => state.lab15Store;