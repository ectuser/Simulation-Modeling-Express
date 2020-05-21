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
    tableChiSquare: null
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
    return state;
}
export const store = createStore(reducer, applyMiddleware(thunk));