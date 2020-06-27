import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { State } from './interface';
import { User } from './models';

const initialState : State = {
    error : null,
    isWorking : false,
    usersQueue : new Array<User>()
};

const Lab18Store = createSlice({
    name : 'Lab18',
    initialState,
    reducers : {
        simulate(state, action : PayloadAction<{employeeLambda : number , userLambda : number}>){},

        setIsWorking(state, action : PayloadAction<boolean>){
            state.isWorking = action.payload;
        },
        pushNewUser(state, action : PayloadAction<User>){
            state.usersQueue = [...state.usersQueue, action.payload];
        },
        popUser(state, action : PayloadAction){
            state.usersQueue = [...state.usersQueue].slice(1);
        }
    }
});

export default Lab18Store.reducer;
export const {
    simulate, setIsWorking, pushNewUser, popUser
} = Lab18Store.actions;
export const selectLab18 = (state : any) : ReturnType<typeof Lab18Store.reducer> => state.lab18Store;