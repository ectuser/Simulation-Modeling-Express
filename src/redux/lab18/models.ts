export interface Employee{
    productivity : number;
    currentCustomer : User | null;
}

export enum EmployeeStatus{
    regular, customer
}

export interface User{
    requestTime : number;
}