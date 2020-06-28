import { PayloadAction } from "@reduxjs/toolkit";
import { all, put, select, takeEvery, delay, takeLatest } from "redux-saga/effects";
import { simulate, selectLab18, pushNewUser, popUser, initializeEmployees, changeEmployeeModel, setAverageProductivity, setTheoreticalData, setPracticalData, setMistakes } from "./store";
import { State } from "./interface";
import { User, Employee, EmployeeStatus } from "./models";


function *simulateUsersFlow(lambda : number){
    let state : State = yield select(selectLab18);
    let newDelay = countDelay(lambda);

    while (state.isWorking){
        let user : User = {
            requestTime : generateRandomNumber(30,100)
        };

        yield put(pushNewUser(user));
        console.log(state.usersQueue);

        state = yield select(selectLab18)

        for (let usr of state.usersQueue){
            for (let i = 0; i < state.employeeQueue.length; i++){
                state = yield select(selectLab18);
                if (!state.employeeQueue[i].currentCustomer){
                    yield put(changeEmployeeModel({pos : i, newModel : {...state.employeeQueue[i], currentCustomer : {...usr}}}));
                    yield put(popUser());
                    break;
                }
            }
        }

        state = yield select(selectLab18);
        newDelay = countDelay(lambda);
        yield delay(newDelay);
    }
}

function *simulateEmployeeFlow(employeePos : number, lambda : number){
    let state : State = yield select(selectLab18);

    let employee = state.employeeQueue[employeePos];

    while (state.isWorking){
        state = yield select(selectLab18);
        employee = state.employeeQueue[employeePos];
        // if (employee.currentCustomer === null){
        //     if (state.usersQueue.length > 0){
        //         // employee.currentCustomer = {...state.usersQueue[0]}; // copy of customer
        //         yield put(changeEmployeeModel({pos : employeePos, newModel : {...employee, currentCustomer : {...state.usersQueue[0]}}}));

        //         state = yield select(selectLab18);
        //         employee = state.employeeQueue[employeePos];

        //         yield put(popUser());
        //     }
        // }
        if (employee.currentCustomer !== null){

            // employee.currentCustomer.requestTime -= employee.productivity;
            let diff = employee.currentCustomer.requestTime - employee.productivity
            yield put(changeEmployeeModel({pos : employeePos, newModel : {...employee, currentCustomer : {...employee.currentCustomer, requestTime : diff}}}));

            state = yield select(selectLab18);
            employee = state.employeeQueue[employeePos];

            if (employee.currentCustomer !== null){
                if (employee.currentCustomer.requestTime <= 0){
                    // employee.currentCustomer = null;
                    yield put(changeEmployeeModel({pos : employeePos, newModel : {...employee, currentCustomer : null}}));
                    
    
                    state = yield select(selectLab18);
                    employee = state.employeeQueue[employeePos];
                }
            }
        }

        state = yield select(selectLab18);

        console.log(employeePos, employee);
        let recoveryDelay = countDelay(lambda);
        yield delay(recoveryDelay);
    }
}

const countDelay = (lambda : number) : number => (-Math.log(Math.random()) / lambda);

const initEmployees = (amount : number) : {employees : Employee[], averageProductivity : number} => {
    let employees : Employee[] = [];
    let productivitySum = 0;
    for (let i = 0; i < amount; i++){
        let productivity = generateRandomNumber(10, 70);
        employees.push({productivity, currentCustomer : null});
        productivitySum += productivity;
    }
    let averageProductivity = productivitySum / amount;
    return {employees, averageProductivity};
};

const generateRandomNumber = (min : number, max : number) => Math.floor(Math.random() * (max - min) + min);
function factorial(n : number){
    let result = 1;
    for (let i = 2; i <= n; i++)
        result = result * i;
    return result;
}

const countProbabilityZero = (N : number, po : number) => {
    let res = 0;
    for (let i = 0; i < N; i++){
        res += (po ** i) / factorial(i);
    }
    console.log("prev", res);
    res = (res + (po ** (N + 1)) / (factorial(N) * (N - po))) ** (-1);
    return res;
}

const countProbabilities = (probabilityZero : number, probabilitiesAmount : number, employeeAmount : number, po : number) => {
    let res : number[] = [];
    for (let i = 0; i < probabilitiesAmount; i++){
        const probability = (i < employeeAmount) ? 
            (po ** i) * probabilityZero / factorial(i) : 
            (po ** i) * probabilityZero / (factorial(employeeAmount) * employeeAmount ** (i - employeeAmount)); 
        res.push(probability); 
    }
    return res;
}

const countAverage = (probabilities : number[]) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += i * probabilities[i];
    }
    return sum;
}
const countVariance = (probabilities : number[], average : number) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += i ** 2 * probabilities[i];
    }
    let res = sum - (average ** 2)
    return res;
}

const countAbsMistake = (first : number, second : number) => Math.abs(first - second);

const countRelativeMistake = (absMistake : number, theoreticalData : number) => absMistake / Math.abs(theoreticalData);
const countWorkingEmployees = (employees : Employee[]) => {
    let counter = 0;
    for (let employee of employees){
        if (employee.currentCustomer){
            counter++;
        }
    }
    return counter;
}
const getProbabilities = (selections : number[], total : number) => (selections.map((item, i) => item / total));

function *simulateInterval(){
    let state : State = yield select(selectLab18);

    let theoreticalSelectionsCounter = new Array(state.probabilitiesAmount).fill(0);
    let totalSelections = 0;

    while(state.isWorking){


        theoreticalSelectionsCounter[Math.min(state.probabilitiesAmount - 1, countWorkingEmployees(state.employeeQueue) + state.usersQueue.length)]++
        totalSelections++;
        console.log(theoreticalSelectionsCounter);

        let probabilities = getProbabilities(theoreticalSelectionsCounter, totalSelections);
        
        const practicalAverage = countAverage(probabilities);
        const practicalVariance = countVariance(probabilities, practicalAverage);

        yield put(setPracticalData({average : practicalAverage, variance : practicalVariance}));

        state = yield select(selectLab18);
        const {theoreticalAverage, theoreticalVariance} = state;

        const averageAbsoluteMistake = countAbsMistake(theoreticalAverage, practicalAverage);
        const averageRelativeMistake = countRelativeMistake(averageAbsoluteMistake, theoreticalAverage);

        const varianceAbsoluteMistake = countAbsMistake(theoreticalVariance, practicalVariance);
        const varianceRelativeMistake = countRelativeMistake(varianceAbsoluteMistake, theoreticalVariance);

        yield put(setMistakes({averageAbsoluteMistake, averageRelativeMistake, varianceAbsoluteMistake, varianceRelativeMistake}));


        state = yield select(selectLab18);
        yield delay(state.interval);
    }
}


function *simulateWorker(action : PayloadAction<{employeeLambda : number , userLambda : number}>){
    const {employeeLambda, userLambda} = action.payload;

    let state : State = yield select(selectLab18);
    
    const {employees, averageProductivity} = initEmployees(state.employeeAmount);

    yield put(initializeEmployees(employees));
    console.log(employees);
    yield put(setAverageProductivity(averageProductivity));
    console.log(userLambda, employeeLambda, userLambda / employeeLambda);
    const po = userLambda / employeeLambda;
    // const po = userLambda / (employeeLambda / ((averageProductivity + 1) * 1.2));
    const probabilityZero = countProbabilityZero(state.employeeAmount, po);
    const probabilities = countProbabilities(probabilityZero, state.probabilitiesAmount, state.employeeAmount, po);
    console.log(probabilities);
    const theoreticalAverage = countAverage(probabilities);
    const theoreticalVariance = countVariance(probabilities, theoreticalAverage);
    yield put(setTheoreticalData({average : theoreticalAverage, variance : theoreticalVariance}));    

    yield all([
        simulateUsersFlow(userLambda),
        simulateEmployeeFlow(0, employeeLambda),
        simulateEmployeeFlow(1, employeeLambda),
        simulateEmployeeFlow(2, employeeLambda),
        simulateEmployeeFlow(3, employeeLambda),
        simulateEmployeeFlow(4, employeeLambda),
        simulateEmployeeFlow(5, employeeLambda),
        simulateEmployeeFlow(6, employeeLambda),
        simulateEmployeeFlow(7, employeeLambda),
        simulateEmployeeFlow(8, employeeLambda),
        simulateEmployeeFlow(9, employeeLambda),
        simulateEmployeeFlow(10, employeeLambda),
        simulateEmployeeFlow(11, employeeLambda),
        simulateEmployeeFlow(12, employeeLambda),
        simulateEmployeeFlow(13, employeeLambda),
        simulateEmployeeFlow(14, employeeLambda),
        simulateEmployeeFlow(15, employeeLambda),
        simulateEmployeeFlow(16, employeeLambda),
        simulateEmployeeFlow(17, employeeLambda),
        simulateEmployeeFlow(18, employeeLambda),
        simulateEmployeeFlow(19, employeeLambda),
        simulateInterval()
    ])
    

}

export function *Lab18MainSaga(){
    yield all([
        takeEvery(simulate, simulateWorker)
    ]);
}