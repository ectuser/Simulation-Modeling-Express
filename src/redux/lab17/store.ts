import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { State, FlowType } from './interface';
import { Lambdas } from './models';

const initialState : State = {
    error : null,
    firstFlowCounter : 0,
    secondFlowCounter : 0,
    startedStatus : false
};

const Lab17Store = createSlice({
    name : 'Lab17',
    initialState,
    reducers : {
        emulateFlow(state, action : PayloadAction<Lambdas>){},
        showErrorRequest(state, action : PayloadAction<string | null>){},
        startStopFlows(state, action : PayloadAction<boolean>){},

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
            else{
                throw new Error("Error");
            }
        }
    }
});

export default Lab17Store.reducer;
export const {
    emulateFlow, showErrorRequest, showError, setStartedSatus, startStopFlows, setFlowsCounter
} = Lab17Store.actions;
export const selectLab17 = (state : any) : ReturnType<typeof Lab17Store.reducer> => state.lab17Store;