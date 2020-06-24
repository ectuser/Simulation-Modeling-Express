import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createRootReducer} from './rootReducer';

const saga = createSagaMiddleware();

// export const store = createStore(createRootReducer, applyMiddleware(saga));

const createStore = () => {
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

export const store = createStore(); 
console.log(store);

// saga.run(mainSaga);