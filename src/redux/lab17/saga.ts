import { all, put, select, takeEvery, delay, takeLatest } from "redux-saga/effects";
import {emulateFlow, showErrorRequest, showError, setStartedSatus, setFlowsCounter, startStopFlows} from './store';
import { PayloadAction } from "@reduxjs/toolkit";
import { Lambdas } from "./models";
import { FlowType, State } from "./interface";
import {selectLab17} from './store';

function *simulateFlow(lambda : number, flowType : FlowType){
    console.log(lambda, flowType);
    let state : State = yield select(selectLab17);
    let newDelay = countDelay(lambda);
    console.log(state, newDelay, state.startedStatus);
    while(state.startedStatus){
        state = yield select(selectLab17);
        newDelay = countDelay(lambda);
        let prevNumber = (flowType === FlowType.first) ? state.firstFlowCounter : (flowType === FlowType.second) ? state.secondFlowCounter : -1;
        if (prevNumber === -1){
            throw new Error("error");
        }
        yield put(setFlowsCounter({flowType, data : prevNumber + 1}));
        console.log(flowType, prevNumber, newDelay);
        yield delay(newDelay);
    }
}

const countDelay = (lambda : number) : number => (-Math.log(Math.random()) / lambda)


function *emulateFlowWorker(action : PayloadAction<Lambdas>){
    const {lambda1, lambda2} = action.payload;
    
    // simulateFlow(0.0003, FlowType.first);
    // yield simulateFlow(0.0003, FlowType.second);

}

function *showErrorRequestWorker(action : PayloadAction<string | null>){
    yield put(showError(action.payload));
    yield delay(3000);
    yield put(showError(null));
}

function *startStopWorker(action : PayloadAction<boolean>){
    yield put(setStartedSatus(action.payload));
}


export function *Lab17MainSaga(){
    yield all([
        takeEvery(emulateFlow, emulateFlowWorker),
        takeEvery(showErrorRequest, showErrorRequestWorker),
        takeEvery(startStopFlows, startStopWorker)
    ]);
}