import {all, takeEvery, put} from 'redux-saga/effects';
import {setCurrentStatus, getCurrentStatus} from './store';
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

export function* lab15MainSaga(){
    yield all([takeEvery(getCurrentStatus, getCurrentStatusWorker)])
}