import { PayloadAction } from "@reduxjs/toolkit";
import { all, put, select, takeEvery, delay, takeLatest } from "redux-saga/effects";
import { simulate, selectLab18, pushNewUser, popUser } from "./store";
import { State } from "./interface";
import { User, Employee, EmployeeStatus } from "./models";


function *simulateUsersFlow(lambda : number){
    let state : State = yield select(selectLab18);
    let newDelay = countDelay(lambda);

    while (state.isWorking){
        let user : User = {
            requestTime : 0.4
        };

        yield put(pushNewUser(user));
        console.log(state.usersQueue)

         state = yield select(selectLab18);
        yield delay(newDelay);
    }
}

function *simulateEmployeeFlow(lambda : number){
    let state : State = yield select(selectLab18);
    let employee : Employee = {
        productivity : 0.2,
        currentCustomer : null,
        lastStatus : EmployeeStatus.regular
    };

    while (state.isWorking){
        employee.lastStatus = EmployeeStatus.regular;
        if (employee.currentCustomer === null){
            if (state.usersQueue.length > 0){
                employee.currentCustomer = {...state.usersQueue[0]}; // copy of customer
                yield put(popUser());
            }
        }
        if (employee.currentCustomer !== null){
            employee.currentCustomer.requestTime -= employee.productivity;
            if (employee.currentCustomer.requestTime <= 0){
                employee.currentCustomer = null;
                employee.lastStatus = EmployeeStatus.customer;
            }
        }

        state = yield select(selectLab18);

        console.log(employee);
        // if (employee.lastStatus === EmployeeStatus.regular){
        //     yield delay(1000);
        // }
        // else{
        let recoveryDelay = countDelay(lambda);
        yield delay(recoveryDelay);
        // }
    }
}

const countDelay = (lambda : number) : number => (-Math.log(Math.random()) / lambda);

function *simulateWorker(action : PayloadAction<{employeeLambda : number , userLambda : number}>){
    const {employeeLambda, userLambda} = action.payload;

    yield all([
        simulateUsersFlow(userLambda),
        simulateEmployeeFlow(employeeLambda),
        simulateEmployeeFlow(employeeLambda),
        simulateEmployeeFlow(employeeLambda),
        simulateEmployeeFlow(employeeLambda),
        simulateEmployeeFlow(employeeLambda),
        simulateEmployeeFlow(employeeLambda)
    ])
    

}

export function *Lab18MainSaga(){
    yield all([
        takeEvery(simulate, simulateWorker)
    ]);
}