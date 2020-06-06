import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    // 14 lab
    isLoading: false,
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

export const lab14Reducer = createSlice({
    name : 'lab14',
    initialState,
    reducers : {
        solveData(state, action){},
        
        setIsLoading(state, action){
            state.isLoading = action.payload;
        },
        setData(state, action){
            state.additionMethod = {...action.payload.additionMethod};
            state.exactAdditionMethod = {...action.payload.exactAdditionMethod};
            state.boxMullerMethod = {...action.payload.boxMullerMethod};
            state.tableChiSquare = action.payload.tableChiSquare;
        }

    }
});

export default lab14Reducer.reducer;

export const {solveData, setIsLoading, setData} = lab14Reducer.actions;

export const selectLab14 = (state) => state.lab14Reducer;