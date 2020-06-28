import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { State } from './interface';
import { User, Employee } from './models';

const initialState : State = {
    error : null,
    isWorking : false,
    usersQueue : new Array<User>(),
    employeeQueue : new Array<Employee>(20),
    averageEmployeeProductivity : 0,
    employeeAmount : 20,
    probabilitiesAmount : 20,
    theoreticalAverage : 0,
    theoreticalVariance : 0,
    practicalAverage : 0,
    practicalVariance : 0,
    averageAbsoluteMistake : 0,
    averageRelativeMistake : 0,
    varianceAbsoluteMistake : 0,
    varianceRelativeMistake : 0,
    interval : 1500
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
        },
        initializeEmployees(state, action : PayloadAction<Employee[]>){
            state.employeeQueue = [...action.payload];
        },
        changeEmployeeModel(state, action : PayloadAction<{pos : number, newModel : Employee}>){
            const {pos, newModel} = action.payload;
            // state.employeeQueue[pos] = {...newModel};
            let newArray = [...state.employeeQueue];
            newArray[pos] = {...newModel};
            state.employeeQueue = [...newArray];
        },
        setAverageProductivity(state, action : PayloadAction<number>){
            state.averageEmployeeProductivity = action.payload;
        },
        setTheoreticalData(state, action: PayloadAction<{average : number, variance : number}>){
            state.theoreticalAverage = action.payload.average;
            state.theoreticalVariance = action.payload.variance;
        },
        setPracticalData(state, action : PayloadAction<{average : number, variance : number}>){
            state.practicalAverage = action.payload.average;
            state.practicalVariance = action.payload.variance;
        },
        setMistakes(state, action : PayloadAction<{    
            averageAbsoluteMistake : number,
            averageRelativeMistake : number,
            varianceAbsoluteMistake : number,
            varianceRelativeMistake : number,}>)
        {
            const {averageAbsoluteMistake,
                averageRelativeMistake,
                varianceAbsoluteMistake,
                varianceRelativeMistake
            } = action.payload;
            state.averageAbsoluteMistake = averageAbsoluteMistake;
            state.averageRelativeMistake = averageRelativeMistake;
            state.varianceAbsoluteMistake = varianceAbsoluteMistake;
            state.varianceRelativeMistake = varianceRelativeMistake;
            
        }
    }
});

export default Lab18Store.reducer;
export const {
    simulate, setIsWorking, pushNewUser, popUser, 
    initializeEmployees, changeEmployeeModel, 
    setAverageProductivity, setTheoreticalData, setPracticalData, setMistakes
} = Lab18Store.actions;
export const selectLab18 = (state : any) : ReturnType<typeof Lab18Store.reducer> => state.lab18Store;