import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentWeather : 0,
    commingWeather : 0,
    timeToChangeTheWeather : 0,
    currentTime : Date.now(),
    interval : null,

    practicalExpected : null,
    practicalVariance : null,
    relativeExpectedMistake : null,
    relativeVarianceMistake : null
};

const lab15Store = createSlice({
    name : 'lab15',
    initialState,
    reducers : {
        getCurrentStatus(state, action){},
        getCurrentTime(state, action){},
        setCurrentTimeToDatabase(state, action){},
        processTheResults(state, action){},
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
        },
        setResults(state, action){
            state.practicalExpected = action.payload.practicalExpected;
            state.practicalVariance = action.payload.practicalVariance;
            state.relativeExpectedMistake = action.payload.relativeExpectedMistake;
            state.relativeVarianceMistake = action.payload.relativeVarianceMistake;
        }
    }
});

export default lab15Store.reducer;
export const {
    getCurrentStatus, setCurrentStatus, getCurrentTime, 
    setCurrentTime, setCurrentTimeToDatabase, setCommingWeather, setNewInterval, setDefault, processTheResults, setResults
} = lab15Store.actions;
export const selectLab15 = (state) => state.lab15Store;