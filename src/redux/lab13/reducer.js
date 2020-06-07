import {createSlice} from '@reduxjs/toolkit'

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

export const lab13Reducer = createSlice({
    name : 'lab13',
    initialState,
    reducers : {
        solveData(state, action){},
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
        }
    }
});

export default lab13Reducer.reducer;

export const {
    solveData, setData, setIsLoading
} = lab13Reducer.actions;

export const selectLab13 = (state) => state.lab13Reducer;

