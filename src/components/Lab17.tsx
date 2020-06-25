import React, {useRef} from 'react';
import { TextField, Divider, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {emulateFlow, showErrorRequest, selectLab17, startStopFlows, countMistake} from '../redux/lab17/store';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

export const Lab17 = () => {
    const dispatch = useDispatch();

    const {
        error, firstFlowCounter, secondFlowCounter, 
        thirdFlowCounter, intervalCounterThirdFlow, intervalCounterTotal,

        averageAbsMistakeTotal, averageRelativeMistakeTotal, 
        varianceAbsMistakeTotal, varianceRelativeMistakeTotal,

        averageAbsMistakeThird, averageRelativeMistakeThird,
        varianceAbsMistakeThird, varianceRelativeMistakeThird
    } = useSelector(selectLab17);

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
        dispatch(countMistake());
    }

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField defaultValue="0.0003" id="standard-basic" label="Lambda 1" inputRef={lambda1Ref} />
            <Divider style={{ margin:"30px"}} />
            <TextField defaultValue="0.0002" id="standard-basic" label="Lambda 2" inputRef={lambda2Ref} />
            <Divider style={{ margin:"30px"}} />
            {/* <TextField id="standard-basic" label="Amount of experiments" inputRef={experimentsAmountRef} /> */}
            <Button variant="contained" color="primary" onClick={onClick}>Start</Button>
            <Button variant="contained" color="secondary" onClick={onStop} >Stop</Button>

            <Bar data={
                    {
                        datasets: [{
                            data: [firstFlowCounter, secondFlowCounter, firstFlowCounter + secondFlowCounter, thirdFlowCounter]
                        }],
                        labels: ["1 flow", "2 flow", "Total 1&2", "3 flow"]
                    }

                } options={
                    {
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0
                                }
                            }]
                        }
                    }
                } />

            <Typography variant="h2">Total 1 and 2 flows</Typography>
            <Typography>Average mistake: {averageAbsMistakeTotal.toFixed(2)} ({(averageRelativeMistakeTotal * 100).toFixed(2)} %)</Typography>
            <Typography>Variance mistake: {varianceAbsMistakeTotal.toFixed(2)} ({(varianceRelativeMistakeTotal * 100).toFixed(2)} %)</Typography>

            <Typography variant="h2">Third flow</Typography>
            <Typography>Average mistake: {averageAbsMistakeThird.toFixed(2)} ({(averageRelativeMistakeThird * 100).toFixed(2)} %)</Typography>
            <Typography>Variance mistake: {varianceAbsMistakeThird.toFixed(2)} ({(varianceRelativeMistakeThird * 100).toFixed(2)} %)</Typography>
        </div>
    );
};