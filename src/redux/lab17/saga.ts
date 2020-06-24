import { all, put, select, takeEvery, delay } from "redux-saga/effects";
import {emulateFlow, showErrorRequest, showError} from './store';
import { PayloadAction } from "@reduxjs/toolkit";
import { Lambdas } from "./models";

function *emulateFlowWorker(action : PayloadAction<Lambdas>){
    console.log(action.payload);
}

function *showErrorRequestWorker(action : PayloadAction<string | null>){
    yield put(showError(action.payload));
    yield delay(3000);
    yield put(showError(null));
}


export function *Lab17MainSaga(){
    yield all([
        takeEvery(emulateFlow, emulateFlowWorker),
        takeEvery(showErrorRequest, showErrorRequestWorker)
    ]);
}