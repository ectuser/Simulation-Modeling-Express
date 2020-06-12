import { combineReducers } from '@reduxjs/toolkit';
import lab13Reducer from './lab13/reducer';
import lab14Reducer from './lab14/reducer';
import lab15Reducer from './lab15/store';

export const createRootReducer = () => combineReducers({
    lab13Reducer, lab14Reducer, lab15Reducer
});