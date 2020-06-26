import { all } from "redux-saga/effects";
import {lab13MainSaga} from './lab13/saga';
import {lab14MainSaga} from './lab14/saga';
import {lab15MainSaga} from './lab15/saga';
import {Lab17MainSaga} from './lab17/saga';
import {Lab18MainSaga} from './lab18/saga';


export default function* rootSaga() {
    yield all([
        lab13MainSaga(),
        lab14MainSaga(),
        lab15MainSaga(),
        Lab17MainSaga(),
        Lab18MainSaga()
    ]);
}