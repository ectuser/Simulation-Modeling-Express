import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "./rootSaga";
import {createSlice, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createRootReducer} from './rootReducer';

const saga = createSagaMiddleware();

// export const store = createStore(createRootReducer, applyMiddleware(saga));

export const createStore = () => {
    const store = configureStore({
        reducer: createRootReducer(),
        middleware: [
            ...getDefaultMiddleware({ thunk: false, serializableCheck: true }),
            saga
        ],
  });

  saga.run(rootSaga);

  return store;
};

// saga.run(mainSaga);