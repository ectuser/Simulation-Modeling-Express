import {all, takeEvery, put, select} from 'redux-saga/effects';
import {setCurrentStatus, getCurrentStatus, getCurrentTime, setCurrentTime, setCurrentTimeToDatabase, setCommingWeather} from './store';
import {selectLab15} from './store'
import axios from "axios";

function* getCurrentStatusWorker({type, payload}){
    try {
        const lab15Store = yield select(selectLab15);
        const params = {
            // t : lab15Store.timeToChangeTheWeather,
            t : 0,
            i : lab15Store.currentWeather,
            startTime : lab15Store.currentTime
        };
        const response = yield axios.get('/lab-15', {params});
        console.log(response);
        const timeToChangeTheWeather = response.data.t;
        const commingWeather = response.data.i;
        yield put(setCommingWeather({timeToChangeTheWeather, commingWeather}))
    } catch (error) {
        console.error(error);   
    }
}

function* getCurrentTimeWorker({type, payload}){
    try {
        const lab15Store = yield select(selectLab15);
        console.log(lab15Store)
        const params = {currentTime : lab15Store.currentTime};
        const response = yield axios.get('/lab-15/get-current-time', {params});
        let time = Number(response.data.time);
        yield put(setCurrentTime({ time }));

        const shouldChangeTheWeather = response.data.shouldChangeTheWeather;
        if (shouldChangeTheWeather){
            yield put(setCurrentStatus(lab15Store.commingWeather));

            const params = {
                // t : lab15Store.timeToChangeTheWeather,
                t : 0,
                i : lab15Store.currentWeather,
                startTime : lab15Store.currentTime
            };
            const response = yield axios.get('/lab-15', {params});
            console.log(response);
            const timeToChangeTheWeather = response.data.t;
            const commingWeather = response.data.i;
            yield put(setCommingWeather({timeToChangeTheWeather, commingWeather}))

        }

    } catch (error) {
        console.error(error);
    }
}

function* setCurrentTimeToDatabaseWorker(){
    try {
        const lab15Store = yield select(selectLab15);
        yield axios.post('/lab-15/set-start-time', {time : lab15Store.currentTime})
    } catch (error) {
        
    }
}

export function* lab15MainSaga(){
    yield all([
        takeEvery(getCurrentStatus, getCurrentStatusWorker), 
        takeEvery(getCurrentTime, getCurrentTimeWorker),
        takeEvery(setCurrentTimeToDatabase, setCurrentTimeToDatabaseWorker)
    ])
}