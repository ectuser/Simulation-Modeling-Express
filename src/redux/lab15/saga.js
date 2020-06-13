import {all, takeEvery, put, select} from 'redux-saga/effects';
import {setCurrentStatus, getCurrentStatus, getCurrentTime, setCurrentTime} from './store';
import {selectLab15} from './store'
import axios from "axios";

function* getCurrentStatusWorker({type, payload}){
    try {
        const lab15Store = yield select(selectLab15);
        const params = {
            t : lab15Store.timeToChangeTheWeather,
            i : lab15Store.currentWeather
        };
        const response = yield axios.get('/lab-15', {params});
        console.log(response);
        const t = response.data.t;
        const i = response.data.i;
        yield put(setCurrentStatus({t, i}))
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
    } catch (error) {
        console.error(error);
    }
}

export function* lab15MainSaga(){
    yield all([takeEvery(getCurrentStatus, getCurrentStatusWorker), takeEvery(getCurrentTime, getCurrentTimeWorker)])
}