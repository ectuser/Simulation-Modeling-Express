import React, {useRef} from 'react';
import { TextField, Divider, Button, TextFieldClassKey } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {emulateFlow, showErrorRequest, selectLab17, startStopFlows} from '../redux/lab17/store';
import { useDispatch, useSelector } from 'react-redux';
import {Lambdas} from '../redux/lab17/models';

export const Lab17 = () => {
    const dispatch = useDispatch();

    const {error, firstFlowCounter} = useSelector(selectLab17);

    const lambda1Ref = useRef<HTMLInputElement>();
    const lambda2Ref = useRef<HTMLInputElement>();

    const onClick = () => {
        const lambda1 = Number(lambda1Ref.current!.value);
        const lambda2 = Number(lambda2Ref.current!.value);
    
        if (isNaN(lambda1) || isNaN(lambda2)){
            dispatch(showErrorRequest("Lambda is not a number"));
            return;
        }
        dispatch(startStopFlows(true));

        dispatch(emulateFlow({lambda1, lambda2}));
    };

    const onStop = () => {
        dispatch(startStopFlows(false));
    }

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField id="standard-basic" label="Lambda 1" inputRef={lambda1Ref} />
            <Divider style={{ margin:"30px"}} />
            <TextField id="standard-basic" label="Lambda 2" inputRef={lambda2Ref} />
            <Divider style={{ margin:"30px"}} />
            {/* <TextField id="standard-basic" label="Amount of experiments" inputRef={experimentsAmountRef} /> */}
            <Button variant="contained" color="primary" onClick={onClick}>Start</Button>
            <Button variant="contained" color="secondary" onClick={onStop} >Stop</Button>

            <div>{firstFlowCounter}</div>
        </div>
    );
};