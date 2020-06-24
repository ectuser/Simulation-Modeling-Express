import React, { useEffect } from 'react';
import {getCurrentStatus, selectLab15, getCurrentTime, setNewInterval, setDefault, processTheResults} from '../redux/lab15/store';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Grid, Typography} from '@material-ui/core';
import clearImage from '../images/clear.svg';
import cloudyImage from '../images/cloudy.svg';
import overcastImage from '../images/overcast.svg';
import { selectLab17 } from 'redux/lab17/store';

export const Lab15 = () => {
    const dispatch = useDispatch();
    const {currentWeather, timeToChangeTheWeather, 
        currentTime, commingWeather, interval, 
        practicalExpected, practicalVariance, relativeExpectedMistake, relativeVarianceMistake} = useSelector(selectLab15);
    const states = [clearImage, cloudyImage, overcastImage];

    useEffect(() => {
        // setInterval(() => {
        //     dispatch(getCurrentStatus({i : currentWeather, t : timeToChangeTheWeather}));
        // }, 2000);
    }, []);

    
    const onStart = () => {
        dispatch(setDefault());
        dispatch(getCurrentStatus());
        let inter = setInterval(() => {
            dispatch(getCurrentTime());
        }, 1000);
        dispatch(setNewInterval(inter))
    }

    const onStop = () => {
        clearInterval(interval);
        dispatch(processTheResults());
    }

    return (
        <div style={{textAlign : "center"}}>
            <Typography variant="h2">{(new Date(currentTime)).toLocaleString()}</Typography>
            <Typography variant="h5">Weather should change in {timeToChangeTheWeather} hours</Typography>
            <Button onClick={onStart} variant="contained" color="primary">
                Start
            </Button>
            <Button onClick={onStop} variant="contained" color="secondary">
                Stop
            </Button>

            <Grid
                container
                direction="row"
                justify="center"
            >
                <Grid item >
                <WeatherStatus text="Current weather" status={states[currentWeather]} />
                </Grid>
                <Grid item >
                <WeatherStatus text="Comming weather" status={states[commingWeather]} />
                </Grid>
            </Grid>
            {practicalExpected && 
            <div>
                <Typography variant="h5">Expected : {(practicalExpected).toFixed(2)} (mistake: {(relativeExpectedMistake * 100).toFixed(2)} %)</Typography>
                <Typography variant="h5">Variance : {(practicalVariance).toFixed(2)} (mistake: {(relativeVarianceMistake * 100).toFixed(2)} %)</Typography>
            </div>
            }
            {/* <div>Time to change weather: {timeToChangeTheWeather}</div> */}
        </div>
    )
};

const WeatherStatus = ({status, text}) => {
    return (
        <div>
            <Typography variant="h5">{text}</Typography>
            <img 
                src={status}
                alt="Weather"
            >
            </img>
        </div>
    );
};

