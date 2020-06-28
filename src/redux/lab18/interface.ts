import { User, Employee } from "./models";

export interface State{
    error : string | null;
    isWorking : boolean;
    usersQueue : User[];
    employeeQueue : Employee[];
    averageEmployeeProductivity : number;
    employeeAmount : number;
    probabilitiesAmount : number;
    interval : number;
    
    theoreticalAverage : number;
    theoreticalVariance : number;
    practicalAverage : number;
    practicalVariance : number;

    averageAbsoluteMistake : number;
    averageRelativeMistake : number;
    varianceAbsoluteMistake : number;
    varianceRelativeMistake : number;
}