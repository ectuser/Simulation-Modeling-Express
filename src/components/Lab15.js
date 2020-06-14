import React, { useEffect } from 'react';
import {getCurrentStatus, selectLab15, getCurrentTime, setCurrentTimeToDatabase} from '../redux/lab15/store';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@material-ui/core'

export const Lab15 = () => {
    const dispatch = useDispatch();
    const {currentWeather, timeToChangeTheWeather, currentTime, commingWeather} = useSelector(selectLab15);
    const states = ["clear", "cloudy", "overcast"];

    useEffect(() => {
        // setInterval(() => {
        //     dispatch(getCurrentStatus({i : currentWeather, t : timeToChangeTheWeather}));
        // }, 2000);
    }, []);

    

    const onStart = () => {
        dispatch(getCurrentStatus());
        // dispatch(setCurrentTimeToDatabase());
        setInterval(() => {
            dispatch(getCurrentTime());
        }, 2000);
        // dispatch(getCurrentStatus());
    }

    return (
        <div>
            Current weather:
            <div>{(new Date(currentTime)).toString()}</div>
            <div>Current weather: {states[currentWeather]}</div>
            <div>Comming weather: {states[commingWeather]}</div>
            {/* <div>Time to change weather: {timeToChangeTheWeather}</div> */}
            <Button onClick={onStart} variant="contained" color="primary">
                Start
            </Button>
        </div>
    )
};

