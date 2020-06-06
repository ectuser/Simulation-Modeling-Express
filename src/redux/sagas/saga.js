import { put, takeEvery, all } from "redux-saga/effects";
import { solveData13, solveData14, setData, setData14, setIsLoading, setIsLoading14 } from "../store";
import axios from "axios";

function* solveData13Worker(action) {
    yield put(setIsLoading(true));
    try {
        console.log(action.payload);
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

function* solveData14Worker(action){
    yield put(setIsLoading14(true));
    try {
        const outputServerData = yield axios.get('/lab-14', {params : action.payload});
        const outputData = outputServerData.data;
        console.log(outputData);
        yield put(setData14(outputData));
    } catch (error) {
        console.error(error);
    } finally{
        yield put(setIsLoading14(false));
    }
}




export function* mainSaga() {
    yield all([takeEvery(solveData13, solveData13Worker), takeEvery(solveData14, solveData14Worker)]);
}