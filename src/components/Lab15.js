import React, { useEffect } from 'react';
import {getCurrentStatus, selectLab15, getCurrentTime} from '../redux/lab15/store';
import {useDispatch, useSelector} from 'react-redux';

export const Lab15 = () => {
    const dispatch = useDispatch();
    const {currentWeather, timeToChangeTheWeather, currentTime} = useSelector(selectLab15);
    const states = ["clear", "cloudy", "overcast"];

    useEffect(() => {
        setInterval(() => {
            dispatch(getCurrentTime());
        }, 1000);
        dispatch(getCurrentStatus());
        // setInterval(() => {
        //     dispatch(getCurrentStatus({i : currentWeather, t : timeToChangeTheWeather}));
        // }, 2000);
    }, []);

    return (
        <div>
            Current weather:
            <div>{(new Date(currentTime)).toString()}</div>
            <div>{states[currentWeather]}</div>
            <div>{timeToChangeTheWeather}</div>
        </div>
    )
};

