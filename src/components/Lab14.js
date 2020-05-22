import React from 'react';
import { TextField, Button, Divider, Typography, CircularProgress } from "@material-ui/core";
import { Bar } from 'react-chartjs-2';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { solveData14 } from "../redux/actions";


const styles = {
    divider: {
        margin: "20px auto"
    }
}

export const Lab14 = () => {
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.isLoading14);
    const additionMethodData = useSelector(state => state.additionMethod);
    const exactAdditionMethodData = useSelector(state => state.exactAdditionMethod);
    const boxMullerMethodData = useSelector(state => state.boxMullerMethod);
    const tableChiSquare = useSelector(state => state.tableChiSquare);

    const checkThatDataIsCorrect = (data) => Object.entries(data).every(el => (!isNaN(Number(el[1]))))

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        if (!checkThatDataIsCorrect(data) && data.variance >= 0 && data.experimentsAmount > 0) {
            alert("Wrong values");
            return;
        }
        dispatch(solveData14(data));

    }

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField id="standard-basic" label="Average" name="average" inputRef={register} />
                <Divider style={styles.divider} />
                <TextField id="standard-basic" label="Variance" name="variance" inputRef={register} />
                <Divider style={styles.divider} />
                <TextField id="standard-basic" label="Amount of experiments" name="experimentsAmount" inputRef={register} />
                <Divider style={styles.divider} />
                <Button type="submit" variant="contained" color="primary">
                    Start
                </Button>
            </form>
            {isLoading && <CircularProgress />}
            <Bar data={
                {
                    datasets: [
                        {
                            type: 'bar',
                            data: additionMethodData.practicalDensity
                        },
                        {
                            type: 'line',
                            data: additionMethodData.theoreticalDensity
                        },
                    ],
                    labels: additionMethodData.labels
                }

            } options={
                {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Addition method'
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
            <Typography variant="h5" gutterBottom>
                {additionMethodData.practicalAverage && additionMethodData.averageMistake && <span>Average: {additionMethodData.practicalAverage.toFixed(2)} (error = {(additionMethodData.averageMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
            {additionMethodData.practicalVariance && additionMethodData.varianceMistake && <span>Average: {additionMethodData.practicalVariance.toFixed(2)} (error = {(additionMethodData.varianceMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {additionMethodData.chiSquare && tableChiSquare && <span>Chi Square: {additionMethodData.chiSquare.toFixed(2)}
                    {(
                        additionMethodData.chiSquare < tableChiSquare ? <span>&lt;</span> :
                        additionMethodData.chiSquare === tableChiSquare ? <span>=</span> :
                                <span>&gt;</span>
                    )}
                    {tableChiSquare}
                    <br />
                    ->
                    {(additionMethodData.chiSquare < tableChiSquare) ? <span>false</span> : <span>true</span>}
                    (alpha: 0.7)</span>
                }
                {boxMullerMethodData.chiSquare && tableChiSquare == null && <span>Too many events. Can't get Chi Square from table</span>}
            </Typography>
            <Divider style={styles.divider} />
            <Bar data={
                {
                    datasets: [
                        {
                            type: 'bar',
                            data: exactAdditionMethodData.practicalDensity
                        },
                        {
                            type: 'line',
                            data: exactAdditionMethodData.theoreticalDensity
                        },
                    ],
                    labels: exactAdditionMethodData.labels
                }

            } options={
                {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Exact addition method'
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
            <Typography variant="h5" gutterBottom>
                {exactAdditionMethodData.practicalAverage && exactAdditionMethodData.averageMistake && <span>Average: {exactAdditionMethodData.practicalAverage.toFixed(2)} (error = {(exactAdditionMethodData.averageMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
            {exactAdditionMethodData.practicalVariance && exactAdditionMethodData.varianceMistake && <span>Average: {exactAdditionMethodData.practicalVariance.toFixed(2)} (error = {(exactAdditionMethodData.varianceMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {exactAdditionMethodData.chiSquare && tableChiSquare && <span>Chi Square: {exactAdditionMethodData.chiSquare.toFixed(2)}
                    {(
                        exactAdditionMethodData.chiSquare < tableChiSquare ? <span>&lt;</span> :
                        exactAdditionMethodData.chiSquare === tableChiSquare ? <span>=</span> :
                                <span>&gt;</span>
                    )}
                    {tableChiSquare}
                    <br />
                    ->
                    {(exactAdditionMethodData.chiSquare < tableChiSquare) ? <span>false</span> : <span>true</span>}
                    (alpha: 0.7)</span>
                }
                {boxMullerMethodData.chiSquare && tableChiSquare == null && <span>Too many events. Can't get Chi Square from table</span>}
            </Typography>
            <Divider style={styles.divider} />
            <Bar data={
                {
                    datasets: [
                        {
                            type: 'bar',
                            data: boxMullerMethodData.practicalDensity
                        },
                        {
                            type: 'line',
                            data: boxMullerMethodData.theoreticalDensity
                        },
                    ],
                    labels: boxMullerMethodData.labels
                }

            } options={
                {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Box-Muller method'
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
            <Typography variant="h5" gutterBottom>
                {boxMullerMethodData.practicalAverage && boxMullerMethodData.averageMistake && <span>Average: {boxMullerMethodData.practicalAverage.toFixed(2)} (error = {(boxMullerMethodData.averageMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
            {boxMullerMethodData.practicalVariance && boxMullerMethodData.varianceMistake && <span>Average: {boxMullerMethodData.practicalVariance.toFixed(2)} (error = {(boxMullerMethodData.varianceMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {boxMullerMethodData.chiSquare && tableChiSquare && <span>Chi Square: {boxMullerMethodData.chiSquare.toFixed(2)}
                    {(
                        boxMullerMethodData.chiSquare < tableChiSquare ? <span>&lt;</span> :
                        boxMullerMethodData.chiSquare === tableChiSquare ? <span>=</span> :
                                <span>&gt;</span>
                    )}
                    {tableChiSquare}
                    <br />
                    ->
                    {(boxMullerMethodData.chiSquare < tableChiSquare) ? <span>false</span> : <span>true</span>}
                    (alpha: 0.7)</span>
                }
                {boxMullerMethodData.chiSquare && tableChiSquare == null && <span>Too many events. Can't get Chi Square from table</span>}
            </Typography>
            <Divider style={styles.divider} />
        </div>
    );
}