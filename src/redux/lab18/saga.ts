import { PayloadAction } from "@reduxjs/toolkit";
import { all, put, select, takeEvery, delay, takeLatest } from "redux-saga/effects";
import { simulate, selectLab18, pushNewUser } from "./store";
import { State } from "./interface";
import { User } from "./models";


function *simulateFlow(lambda : number){
    let state : State = yield select(selectLab18);
    let newDelay = countDelay(lambda);

    while (state.isWorking){
        let user : User = {
            requestTime : 0
        };

        yield put(pushNewUser(user));
        console.log(state.usersQueue)

         state = yield select(selectLab18);
        yield delay(newDelay);
    }
}

const countDelay = (lambda : number) : number => (-Math.log(Math.random()) / lambda);

function *simulateWorker(action : PayloadAction<{employeeLambda : number , userLambda : number}>){
    const {employeeLambda, userLambda} = action.payload;

    yield all([
        simulateFlow(userLambda)
    ])
    

}

export function *Lab18MainSaga(){
    yield all([
        takeEvery(simulate, simulateWorker)
    ]);
}