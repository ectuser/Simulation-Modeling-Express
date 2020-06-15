import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentWeather : 0,
    commingWeather : 0,
    timeToChangeTheWeather : 0,
    currentTime : Date.now(),
    interval : null
};

const lab15Store = createSlice({
    name : 'lab15',
    initialState,
    reducers : {
        getCurrentStatus(state, action){},
        getCurrentTime(state, action){},
        setCurrentTimeToDatabase(state, action){},
        setCurrentStatus(state, action){
            state.currentWeather = action.payload;
        },
        setCurrentTime(state, action){
            state.currentTime = action.payload.time;
        },
        setCommingWeather(state, action){
            state.timeToChangeTheWeather = action.payload.timeToChangeTheWeather;
            state.commingWeather = action.payload.commingWeather;
        },
        setNewInterval(state, action){
            state.interval = action.payload;
        },
        setDefault(state, action){
            state = {...initialState};
        }
    }
});

export default lab15Store.reducer;
export const {getCurrentStatus, setCurrentStatus, getCurrentTime, setCurrentTime, setCurrentTimeToDatabase, setCommingWeather, setNewInterval, setDefault} = lab15Store.actions;
export const selectLab15 = (state) => state.lab15Store;