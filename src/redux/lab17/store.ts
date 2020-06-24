import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { State } from './interface';
import { Lambdas } from './models';

const initialState = {
    error : "Hello"
};

const Lab17Store = createSlice({
    name : 'Lab17',
    initialState,
    reducers : {
        emulateFlow(state, action : PayloadAction<Lambdas>){},
        showErrorRequest(state, action : PayloadAction<string | null>){},

        showError(state, action : PayloadAction<string | null>){
            state.error = (action.payload) as string;
        }
    }
});

export default Lab17Store.reducer;
export const {
    emulateFlow, showErrorRequest, showError
} = Lab17Store.actions;
export const selectLab17 = (state : any) : ReturnType<typeof Lab17Store.reducer> => state.lab17Store;