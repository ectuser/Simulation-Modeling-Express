import { put, takeEvery, all } from "redux-saga/effects";
import {solveData, setIsLoading, setData} from './reducer';
import axios from "axios";


export function* solveData13Worker(action) {
    console.log(action.payload);
    yield put(setIsLoading(true));
    try {
        let serverData = yield axios.get('/simulation-discrete-random-variable', { params: action.payload });
        let data = serverData.data;
        console.log(data);
        data.labels = [...Array(data.practicalProbabilities.length).keys()];
        data.labels[data.labels.length - 1] = `More than ${data.labels[data.labels.length - 1]}`;
        yield put(setData(data));
    } catch (error) {
        console.error(error);
    } finally {
        yield put(setIsLoading(false));
    }
}


export function* lab13MainSaga() {
    yield all([takeEvery(solveData, solveData13Worker)]);
}