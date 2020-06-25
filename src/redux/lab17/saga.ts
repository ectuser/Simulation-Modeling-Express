import { all, put, select, takeEvery, delay, takeLatest } from "redux-saga/effects";
import {emulateFlow, showErrorRequest, showError, setStartedSatus, setFlowsCounter, startStopFlows, countMistake, setTheoreticalData, setIntervalCounter, setData, setCountedMistakes} from './store';
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
        let prevNumber = (flowType === FlowType.first) ? state.firstFlowCounter : 
        (flowType === FlowType.second) ? state.secondFlowCounter : 
        (flowType === FlowType.third) ? state.thirdFlowCounter : 
        -1;
        if (prevNumber === -1){
            throw new Error("error");
        }
        let prevAmount;
        if (flowType === FlowType.third){
            prevAmount = state.intervalCounterThirdFlow;
        }
        else{
            prevAmount = state.intervalCounterTotal;
        }
        yield put(setIntervalCounter({flowType, data : prevAmount + 1}));
        yield put(setFlowsCounter({flowType, data : prevNumber + 1}));
        console.log(flowType, prevNumber, newDelay);
        yield delay(newDelay);
    }
}

function factorial(n : number){
    let result = 1;
    for (let i = 2; i <= n; i++)
        result = result * i;
    return result;
}

const countAverage = (probabilities : number[]) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += i * probabilities[i];
    }
    return sum;
}
const countVariance = (probabilities : number[], average : number) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += i ** 2 * probabilities[i];
    }
    let res = sum - (average ** 2)
    return res;
}

const countAbsMistake = (first : number, second : number) => Math.abs(first - second);

const countRelativeMistake = (absMistake : number, theoreticalData : number) => absMistake / Math.abs(theoreticalData);

function *countTheoreticalData(lambda : number){
    let arr = new Array<number>(10);
    let {interval} = yield select(selectLab17);

    for (let i = 0; i < arr.length - 1; i++){
        arr[i] = (((lambda * interval) ** i) / (factorial(i))) * Math.exp( - lambda * interval);
    }
    arr[arr.length - 1] = 1 - arr.reduce((a, b) => a + b);

    let average = countAverage(arr);
    let variance = countVariance(arr, average);
    console.log(arr, average, variance);
    yield put(setTheoreticalData({average, variance}));

}

const countDelay = (lambda : number) : number => (-Math.log(Math.random()) / lambda);

const getSelectionsProbability = (arrayOfSelections : number[], selectionsAmount : number) => arrayOfSelections.map((item, i) => item / selectionsAmount);
const arraySum = (arr : number[]) => arr.reduce((a, b) => a + b);

function *simulateInterval(){
    let state : State = yield select(selectLab17);
    while(state.startedStatus){
        state = yield select(selectLab17);
        const {thirdData, totalData, intervalCounterThirdFlow, intervalCounterTotal} = state;
        let thirdDataArray = [...thirdData];
        let totalDataArray = [...totalData];

        thirdDataArray[intervalCounterThirdFlow]++;
        totalDataArray[intervalCounterTotal]++;
        yield put(setData({thirdDataArray, totalDataArray}));

        state = yield select(selectLab17);

        const selectionsProbabilityTotal = getSelectionsProbability(state.totalData, arraySum(state.totalData));
        console.log(selectionsProbabilityTotal);
        const selectionsProbabilityThird = getSelectionsProbability(state.thirdData, arraySum(state.thirdData));
        console.log(selectionsProbabilityThird);

        const averageTotal = countAverage(selectionsProbabilityTotal);
        const averageThird = countAverage(selectionsProbabilityThird);

        const varianceTotal = countVariance(selectionsProbabilityTotal, averageTotal);
        const varianceThird = countVariance(selectionsProbabilityThird, averageThird);

        const averageAbsMistakeTotal = countAbsMistake(averageTotal, state.theoreticalAverage);
        const averageRelativeMistakeTotal = countRelativeMistake(averageAbsMistakeTotal, state.theoreticalAverage);
        
        const varianceAbsMistakeTotal = countAbsMistake(varianceTotal, state.theoreticalVariance);
        const varianceRelativeMistakeTotal = countRelativeMistake(varianceAbsMistakeTotal, state.theoreticalVariance);

        const averageAbsMistakeThird = countAbsMistake(averageThird, state.theoreticalAverage);
        const averageRelativeMistakeThird = countRelativeMistake(averageAbsMistakeThird, state.theoreticalAverage);

        const varianceAbsMistakeThird = countAbsMistake(varianceThird, state.theoreticalVariance);
        const varianceRelativeMistakeThird = countRelativeMistake(varianceAbsMistakeThird, state.theoreticalVariance);

        yield put(setCountedMistakes(
            {
                averageAbsMistakeTotal, averageRelativeMistakeTotal, 
                varianceAbsMistakeTotal, varianceRelativeMistakeTotal,
                averageAbsMistakeThird, averageRelativeMistakeThird,
                varianceAbsMistakeThird, varianceRelativeMistakeThird
            }
            ));


        yield delay(state.interval);
    }
}


function *emulateFlowWorker(action : PayloadAction<Lambdas>){
    const {lambda1, lambda2} = action.payload;

    yield countTheoreticalData(lambda1 + lambda2);

    yield all([
        simulateFlow(lambda1, FlowType.first), 
        simulateFlow(lambda2, FlowType.second), 
        simulateFlow(lambda1 + lambda2, FlowType.third),
        simulateInterval()
    ]);

}

function *showErrorRequestWorker(action : PayloadAction<string | null>){
    yield put(showError(action.payload));
    yield delay(3000);
    yield put(showError(null));
}

function *startStopWorker(action : PayloadAction<boolean>){
    yield put(setStartedSatus(action.payload));
}

function *countMistakeWorker(){
    const state : State = yield select(selectLab17);
}


export function *Lab17MainSaga(){
    yield all([
        takeEvery(emulateFlow, emulateFlowWorker),
        takeEvery(showErrorRequest, showErrorRequestWorker),
        takeEvery(startStopFlows, startStopWorker),
        takeEvery(countMistake, countMistakeWorker)
    ]);
}