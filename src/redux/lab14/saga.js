import { put, takeEvery, all } from "redux-saga/effects";
import {solveData, setIsLoading, setData} from './reducer';
import axios from "axios";


function* solveData14Worker(action){
    yield put(setIsLoading(true));
    try {
        const outputServerData = yield axios.get('/lab-14', {params : action.payload});
        const outputData = outputServerData.data;
        console.log(outputData);
        yield put(setData(outputData));
    } catch (error) {
        console.error(error);
    } finally{
        yield put(setIsLoading(false));
    }
}


export function* lab14MainSaga() {
    yield all([takeEvery(solveData, solveData14Worker)]);
}