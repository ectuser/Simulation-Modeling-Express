import {all, takeEvery, put} from 'redux-saga/effects';
import {setCurrentStatus, getCurrentStatus, getCurrentTime, setCurrentTime} from './store';
import axios from "axios";

function* getCurrentStatusWorker({type, payload}){
    try {
        const params = {
            t : payload.i,
            i : payload.i
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
        const params = {currentTime : payload};
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