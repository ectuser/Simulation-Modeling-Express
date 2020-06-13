import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentWeather : 0,
    timeToChangeTheWeather : 0,
    currentTime : Date.now()
};

const lab15Store = createSlice({
    name : 'lab15',
    initialState, 
    reducers : {
        getCurrentStatus(state, action){},
        getCurrentTime(state, action){},
        setCurrentStatus(state, action){
            state.currentWeather = action.payload.i;
            state.timeToChangeTheWeather = action.payload.t;
        },
        setCurrentTime(state, action){
            state.currentTime = action.payload.time;
        }
    }
});

export default lab15Store.reducer;
export const {getCurrentStatus, setCurrentStatus, getCurrentTime, setCurrentTime} = lab15Store.actions;
export const selectLab15 = (state) => state.lab15Store;