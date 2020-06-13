import React, { useEffect } from 'react';
import {getCurrentStatus, selectLab15} from '../redux/lab15/store';
import {useDispatch, useSelector} from 'react-redux';

export const Lab15 = () => {
    const dispatch = useDispatch();
    const {currentWeather, currentTime} = useSelector(selectLab15);
    const states = ["clear", "cloudy", "overcast"];

    useEffect(() => {
        dispatch(getCurrentStatus({i : currentWeather, t : currentTime}));
        setInterval(() => {
            dispatch(getCurrentStatus({i : currentWeather, t : currentTime}));
        }, 2000);
    }, []);

    return (
        <div>
            Current weather:
            <div>{states[currentWeather]}</div>
            <div>{currentTime}</div>
        </div>
    )
};

