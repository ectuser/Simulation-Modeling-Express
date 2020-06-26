import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { State } from './interface';

const initialState : State = {
    
};

const Lab18Store = createSlice({
    name : 'Lab18',
    initialState,
    reducers : {
    }
});

export default Lab18Store.reducer;
export const {
    
} = Lab18Store.actions;
export const selectLab18 = (state : any) : ReturnType<typeof Lab18Store.reducer> => state.lab18Store;