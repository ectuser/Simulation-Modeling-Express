import { combineReducers } from '@reduxjs/toolkit';
import lab13Reducer from './lab13/reducer';
import lab14Reducer from './lab14/reducer';
import lab15Store from './lab15/store';
import Lab17Store from './lab17/store';

export const createRootReducer = () => combineReducers({
    lab13Reducer, lab14Reducer, lab15Store, Lab17Store
});