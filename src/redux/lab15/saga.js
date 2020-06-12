import {all, takeEvery} from 'redux-saga/effects';
import {setCurrentStatus, getCurrentStatus} from './store';
import axios from "axios";

function* getCurrentStatusWorker({type, payload}){
    try {
        const params = {
            
        };
        const response = yield axios.get('/lab-15', {params : action.payload});
    } catch (error) {
        console.error(error);   
    }
}

export function* lab15MainSaga(){
    yield all([takeEvery(getCurrentStatus, getCurrentStatusWorker)])
}