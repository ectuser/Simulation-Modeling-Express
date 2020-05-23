import { put, takeEvery, all } from "redux-saga/effects";
import { setIsLoading, setData, solveData13 } from "../actions";
import axios from "axios";

function* solveData13Worker(action) {
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

function* solveData14Worker(action){
    
}




export function* mainSaga() {
    yield all([takeEvery("SOLVE_DATA_13", solveData13Worker)]);
}