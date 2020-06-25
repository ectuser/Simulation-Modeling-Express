import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { State, FlowType } from './interface';
import { Lambdas } from './models';

const initialState : State = {
    error : null,
    firstFlowCounter : 0,
    secondFlowCounter : 0,
    thirdFlowCounter : 0,
    startedStatus : false,
    theoreticalAverage : 0,
    theoreticalVariance : 0,
    intervalCounterThirdFlow : 0,
    intervalCounterTotal : 0,
    interval : 2000,
    thirdData : new Array<number>(10).fill(0),
    totalData : new Array<number>(10).fill(0),
    intervalCounterThirdFlowAll : 0,
    intervalCounterTotalAll : 0, 

    averageAbsMistakeTotal : 0,
    averageAbsMistakeThird : 0,
    averageRelativeMistakeThird : 0,
    averageRelativeMistakeTotal : 0,
    varianceAbsMistakeThird : 0,
    varianceAbsMistakeTotal : 0,
    varianceRelativeMistakeThird : 0,
    varianceRelativeMistakeTotal : 0
};

const Lab17Store = createSlice({
    name : 'Lab17',
    initialState,
    reducers : {
        emulateFlow(state, action : PayloadAction<Lambdas>){},
        showErrorRequest(state, action : PayloadAction<string | null>){},
        startStopFlows(state, action : PayloadAction<boolean>){},
        countMistake(state, action : PayloadAction){},

        showError(state, action : PayloadAction<string | null>){
            state.error = action.payload;
        },
        setStartedSatus(state, action : PayloadAction<boolean>){
            state.startedStatus = action.payload;
        },
        setFlowsCounter(state, action : PayloadAction<{flowType : FlowType, data : number}>){
            const {flowType, data} = action.payload;
            if (flowType === FlowType.first){
                state.firstFlowCounter = data;
            }
            else if (flowType === FlowType.second){
                state.secondFlowCounter = data;
            }
            else if (flowType === FlowType.third){
                state.thirdFlowCounter = data;
            }
            else{
                throw new Error("Error");
            }
        },
        setTheoreticalData(state, action : PayloadAction<{average : number , variance : number}>){
            state.theoreticalAverage = action.payload.average;
            state.theoreticalVariance = action.payload.variance;
        },
        setIntervalCounter(state, action : PayloadAction<{flowType : FlowType, data : number}>){
            const {flowType, data} = action.payload;
            if (flowType === FlowType.third){
                state.intervalCounterThirdFlow = data;
            }
            else{
                state.intervalCounterTotal = data;
            }
        },
        setData(state, action : PayloadAction<{thirdDataArray : number[], totalDataArray : number[]}>){
            const {thirdDataArray, totalDataArray} = action.payload;
            state.thirdData = [...thirdDataArray];
            state.totalData = [...totalDataArray];
            state.intervalCounterThirdFlow = 0;
            state.intervalCounterTotal = 0;
            state.intervalCounterTotalAll++;
            state.intervalCounterThirdFlowAll++;


            console.log(state.thirdData, state.totalData);
        },
        setCountedMistakes(state, 
            action : PayloadAction<{
                averageAbsMistakeTotal : number, averageRelativeMistakeTotal : number, 
                varianceAbsMistakeTotal : number, varianceRelativeMistakeTotal : number, 
                averageAbsMistakeThird : number, averageRelativeMistakeThird : number,
                varianceAbsMistakeThird : number, varianceRelativeMistakeThird : number
            }>){
            const {averageAbsMistakeTotal, averageRelativeMistakeTotal, 
                varianceAbsMistakeTotal, varianceRelativeMistakeTotal,
                averageAbsMistakeThird, averageRelativeMistakeThird,
                varianceAbsMistakeThird, varianceRelativeMistakeThird
            } = action.payload;

            state.varianceAbsMistakeThird = varianceAbsMistakeThird;
            state.varianceAbsMistakeTotal = varianceAbsMistakeTotal;
            state.averageAbsMistakeThird = averageAbsMistakeThird;
            state.averageAbsMistakeTotal = averageAbsMistakeTotal;

            state.averageRelativeMistakeThird = averageRelativeMistakeThird;
            state.averageRelativeMistakeTotal = averageRelativeMistakeTotal;
            state.varianceRelativeMistakeThird = varianceRelativeMistakeThird;
            state.varianceRelativeMistakeTotal = varianceRelativeMistakeTotal;
        }
    }
});

export default Lab17Store.reducer;
export const {
    emulateFlow, showErrorRequest, showError, setStartedSatus, 
    startStopFlows, setFlowsCounter, countMistake, setTheoreticalData, setIntervalCounter, setData, setCountedMistakes
} = Lab17Store.actions;
export const selectLab17 = (state : any) : ReturnType<typeof Lab17Store.reducer> => state.lab17Store;