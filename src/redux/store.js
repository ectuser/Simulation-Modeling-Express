import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {mainSaga} from "./sagas/saga";
import {createSlice} from '@reduxjs/toolkit'

const saga = createSagaMiddleware();


const initialState = {
    labels: [],
    practicalProbabilities: [],
    average: null,
    variance: null,
    averageRelativeMistake: null,
    varianceRelativeMistake: null,
    isLoading: false,
    countedChiSquare: null,
    tableChiSquare: null,

    // 14 lab
    isLoading14: false,
    additionMethod: {
        practicalDensity: [],
        theoreticalDensity: [],
        labels: [],
        practicalAverage: null,
        practicalVariance: null,
        averageMistake: null,
        varianceMistake: null,
        chiSquare: null
    },
    exactAdditionMethod: {
        practicalDensity: [],
        theoreticalDensity: [],
        labels: [],
        practicalAverage: null,
        practicalVariance: null,
        averageMistake: null,
        varianceMistake: null,
        chiSquare: null
    },
    boxMullerMethod: {
        practicalDensity: [],
        theoreticalDensity: [],
        labels: [],
        practicalAverage: null,
        practicalVariance: null,
        averageMistake: null,
        varianceMistake: null,
        chiSquare: null
    }
};


const app = createSlice({
    name : 'app',
    initialState,
    reducers : {
        solveData13(state, action){},
        solveData14(state, action){},

        setData(state, action){
            state.labels = [...action.payload.labels];
            state.practicalProbabilities = [...action.payload.practicalProbabilities];
            state.average = action.payload.average;
            state.variance = action.payload.variance;
            state.averageRelativeMistake = action.payload.averageRelativeMistake;
            state.varianceRelativeMistake = action.payload.varianceRelativeMistake;
            state.countedChiSquare = action.payload.countedChiSquare;
            state.tableChiSquare = action.payload.tableChiSquare;
        },
        setIsLoading(state, action){
            state.isLoading = action.payload;
        },
        setIsLoading14(state, action){
            state.isLoading14 = action.payload;
        },
        setData14(state, action){
            state.additionMethod = {...action.payload.additionMethod};
            state.exactAdditionMethod = {...action.payload.exactAdditionMethod};
            state.boxMullerMethod = {...action.payload.boxMullerMethod};
            state.tableChiSquare = action.payload.tableChiSquare;
        }

    }
});

const { actions, reducer } = app;

export const {
    solveData13, solveData14, setData, setData14, setIsLoading, setIsLoading14
} = actions;



// const reducer = (state = initialState, action) => {
//     if (action.type === "SET_DATA") {
//         return {
//             ...state,
//             labels: [...action.payload.labels],
//             practicalProbabilities: [...action.payload.practicalProbabilities],
//             average: action.payload.average,
//             variance: action.payload.variance,
//             averageRelativeMistake: action.payload.averageRelativeMistake,
//             varianceRelativeMistake: action.payload.varianceRelativeMistake,
//             countedChiSquare: action.payload.countedChiSquare,
//             tableChiSquare: action.payload.tableChiSquare
//         }
//     }
//     else if (action.type === "SET_IS_LOADING") {
//         return {
//             ...state,
//             isLoading: action.payload
//         }
//     }
//     else if (action.type === "SET_IS_LOADING_14") {
//         return {
//             ...state,
//             isLoading14: action.payload
//         }
//     }
//     else if (action.type === "SET_DATA_14") {
//         return {
//             ...state,
//             additionMethod: {...action.payload.additionMethod},
//             exactAdditionMethod: {...action.payload.exactAdditionMethod},
//             boxMullerMethod: {...action.payload.boxMullerMethod},
//             tableChiSquare: action.payload.tableChiSquare
//         }
//     }
//     return state;
// }
export const store = createStore(reducer, applyMiddleware(saga));

saga.run(mainSaga);