import React, {useRef} from 'react';
import { Button, TextField, Divider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { simulate, setIsWorking } from 'redux/lab18/store';
import { Alert } from '@material-ui/lab';
import { selectLab18 } from '../redux/lab18/store';

export const Lab18 = () => {

    const dispatch = useDispatch();
    const lambdaEmployeeRef = useRef<HTMLInputElement>();
    const userEmployeeRef = useRef<HTMLInputElement>();

    const {error} = useSelector(selectLab18);

    const onStart = () => {
        const employeeLambda = Number(userEmployeeRef.current!.value);
        const userLambda = Number(lambdaEmployeeRef.current!.value);

        dispatch(setIsWorking(true));
        dispatch(simulate({employeeLambda, userLambda}));
    };

    const onStop = () => {
        dispatch(setIsWorking(false));
    };

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField defaultValue="0.0003" label="Employee intensity" inputRef={lambdaEmployeeRef} />
            <Divider style={{ margin:"30px"}} />
            <TextField defaultValue="0.0002" label="User intensity" inputRef={userEmployeeRef} />
            <Divider style={{ margin:"30px"}} />
            <Button variant="contained" color="primary" onClick={onStart}>Start</Button>
            <Button variant="contained" color="secondary" onClick={onStop} >Stop</Button>
            <Typography>Total 20 employee</Typography>
        </div>
    );
};