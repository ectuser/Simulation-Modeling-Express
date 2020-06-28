import React, {useRef} from 'react';
import { Button, TextField, Divider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { simulate, setIsWorking } from 'redux/lab18/store';
import { Alert } from '@material-ui/lab';
import { selectLab18 } from '../redux/lab18/store';

export const Lab18 = () => {

    const dispatch = useDispatch();
    const lambdaEmployeeRef = useRef<HTMLInputElement>();
    const userLambdaRef = useRef<HTMLInputElement>();

    const {
        error, employeeQueue, usersQueue,
        practicalAverage, practicalVariance,
        averageAbsoluteMistake, averageRelativeMistake,
        varianceAbsoluteMistake, varianceRelativeMistake
    } = useSelector(selectLab18);

    const onStart = () => {
        const employeeLambda = Number(lambdaEmployeeRef.current!.value);
        const userLambda = Number(userLambdaRef.current!.value);

        dispatch(setIsWorking(true));
        dispatch(simulate({employeeLambda, userLambda}));
    };

    const onStop = () => {
        dispatch(setIsWorking(false));
    };

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField defaultValue="0.0001" label="Employee intensity" inputRef={lambdaEmployeeRef} />
            <Divider style={{ margin:"30px"}} />
            <TextField defaultValue="0.0007" label="User intensity" inputRef={userLambdaRef} />
            <Divider style={{ margin:"30px"}} />
            <Button variant="contained" color="primary" onClick={onStart}>Start</Button>
            <Button variant="contained" color="secondary" onClick={onStop} >Stop</Button>
            <Typography>Total 20 employee</Typography>
            {employeeQueue.map((item, i) => (
                <Typography key={i}>Employee {i} (productivity: {item.productivity}) - {item.currentCustomer && <span>Customer {item.currentCustomer.requestTime}</span>}</Typography>
            ))}
            <Typography>Users Queue: {usersQueue.length}</Typography>
            <Typography>Average: {practicalAverage.toFixed(2)}. Error: {averageAbsoluteMistake.toFixed(2)}({(averageRelativeMistake * 100).toFixed(2)} %)</Typography>
            <Typography>Variance: {practicalVariance.toFixed(2)}. Error: {varianceAbsoluteMistake.toFixed(2)}({(varianceRelativeMistake * 100).toFixed(2)} %)</Typography>
        </div>
    );
};