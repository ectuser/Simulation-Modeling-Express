import { all } from "redux-saga/effects";
import {lab13MainSaga} from './lab13/saga';
import {lab14MainSaga} from './lab14/saga';


export function* rootSaga() {
    yield all([
        lab13MainSaga,
        lab14MainSaga
    ]);
}