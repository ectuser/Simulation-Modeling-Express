import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

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

const reducer = (state = initialState, action) => {
    if (action.type === "SET_DATA") {
        return {
            ...state,
            labels: [...action.payload.labels],
            practicalProbabilities: [...action.payload.practicalProbabilities],
            average: action.payload.average,
            variance: action.payload.variance,
            averageRelativeMistake: action.payload.averageRelativeMistake,
            varianceRelativeMistake: action.payload.varianceRelativeMistake,
            countedChiSquare: action.payload.countedChiSquare,
            tableChiSquare: action.payload.tableChiSquare
        }
    }
    else if (action.type === "SET_IS_LOADING") {
        return {
            ...state,
            isLoading: action.payload
        }
    }
    else if (action.type === "SET_IS_LOADING_14") {
        return {
            ...state,
            isLoading14: action.payload
        }
    }
    else if (action.type === "SET_DATA_14") {
        return {
            ...state,
            additionMethod: {...action.payload.additionMethod},
            exactAdditionMethod: {...action.payload.exactAdditionMethod},
            boxMullerMethod: {...action.payload.boxMullerMethod},
            tableChiSquare: action.payload.tableChiSquare
        }
    }
    return state;
}
export const store = createStore(reducer, applyMiddleware(thunk));