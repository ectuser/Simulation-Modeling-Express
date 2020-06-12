import React, { useEffect } from 'react';
import {getCurrentStatus, selectLab15} from '../redux/lab15/store';
import {useDispatch, useSelector} from 'react-redux';

export const Lab15 = () => {
    const dispatch = useDispatch();
    const {currentWeather, currentTime} = useSelector(selectLab15);

    useEffect(() => {
        dispatch(getCurrentStatus(currentWeather, currentTime));
    }, [])

    return (
        <div>
            Current weather:
            <div>{currentWeather}</div>
            <div>{currentTime}</div>
        </div>
    )
};

