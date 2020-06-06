import React, { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Divider, Grid, CircularProgress, Typography } from "@material-ui/core"
import { Bar } from 'react-chartjs-2';
import { solveData, selectLab13 } from "../redux/lab13/reducer";

const styles = {
    divider: {
        margin: "20px auto"
    }
}

export const Lab13 = () => {
    const dispatch = useDispatch();
    let lambdaRef = useRef();
    let rangeRef = useRef();
    let experimentsAmountRef = useRef();

    const isLoading = useSelector(state => state.isLoading);
    const average = useSelector(state => state.average);
    const variance = useSelector(state => state.variance);
    const averageRelativeMistake = useSelector(state => state.averageRelativeMistake);
    const varianceRelativeMistake = useSelector(state => state.varianceRelativeMistake);
    const labels = useSelector(state => state.labels);
    const practicalProbabilities = useSelector(state => state.practicalProbabilities);
    const countedChiSquare = useSelector(state => state.countedChiSquare);
    const tableChiSquare = useSelector(state => state.tableChiSquare);

    const submit = async (event) => {
        event.preventDefault();

        const lambda = Number(lambdaRef.current.value);
        const range = Number(rangeRef.current.value);
        const experimentsAmount = Number(experimentsAmountRef.current.value);

        if (isNaN(lambda) || isNaN(range) || isNaN(experimentsAmount) || lambda <= 0 || range <= 0 || experimentsAmount <= 0) {
            alert("Please type number");
            return;
        }
        dispatch(solveData({lambda, range, experimentsAmount}));


        // console.log(data);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <form noValidate autoComplete="off" onSubmit={submit}>
                    <TextField id="standard-basic" label="Lambda" inputRef={lambdaRef} />
                    <Divider style={styles.divider} />
                    <TextField id="standard-basic" label="Amount of events" inputRef={rangeRef} />
                    <Divider style={styles.divider} />
                    <TextField id="standard-basic" label="Amount of experiments" inputRef={experimentsAmountRef} />
                    <Divider style={styles.divider} />
                    <Button type="submit" variant="contained" color="primary">
                        Start
                    </Button>
                </form>
            </Grid>
            <Grid item xs={6}>
                {isLoading && <CircularProgress />}
                <Bar data={
                    {
                        datasets: [{
                            data: practicalProbabilities
                        }],
                        labels: labels
                    }

                } options={
                    {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Frequency'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 1
                                }
                            }]
                        }
                    }
                } />
                <Typography variant="h5" gutterBottom>
                    {average && averageRelativeMistake && <span>Average: {average.toFixed(2)} (error = {(averageRelativeMistake * 100).toFixed(2)} %)</span>}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {variance && varianceRelativeMistake && <span>Variance: {variance.toFixed(2)} (error = {(varianceRelativeMistake * 100).toFixed(2)} %)</span>}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {countedChiSquare && tableChiSquare && <span>Chi Square: {countedChiSquare.toFixed(2)}
                        {(
                            countedChiSquare < tableChiSquare ? <span>&lt;</span> :
                                countedChiSquare === tableChiSquare ? <span>=</span> :
                                    <span>&gt;</span>
                        )}
                        {tableChiSquare}
                        <br />
                    ->
                    {(countedChiSquare < tableChiSquare) ? <span>false</span> : <span>true</span>}
                    (alpha: 0.7)</span>
                    }
                </Typography>
            </Grid>
        </Grid>
    )
}
