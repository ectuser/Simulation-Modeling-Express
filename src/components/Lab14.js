import React from 'react';
import { TextField, Button, Divider, Typography, CircularProgress } from "@material-ui/core";
import { Bar } from 'react-chartjs-2';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { solveData, selectLab14 } from "../redux/lab14/reducer";


const styles = {
    divider: {
        margin: "20px auto"
    }
}

export const Lab14 = () => {
    const dispatch = useDispatch();

    const {isLoading, additionMethod, exactAdditionMethod, boxMullerMethod, tableChiSquare} = useSelector(selectLab14);
    console.log("rerender");
    // const additionMethodData = useSelector(state => state.additionMethod);
    // const exactAdditionMethodData = useSelector(state => state.exactAdditionMethod);
    // const boxMullerMethodData = useSelector(state => state.boxMullerMethod);
    // const tableChiSquare = useSelector(state => state.tableChiSquare);

    const checkThatDataIsCorrect = (data) => Object.entries(data).every(el => (!isNaN(Number(el[1]))))

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        if (!checkThatDataIsCorrect(data) && data.variance >= 0 && data.experimentsAmount > 0) {
            alert("Wrong values");
            return;
        }
        dispatch(solveData(data));

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
                            data: additionMethod.practicalDensity
                        },
                        {
                            type: 'line',
                            data: additionMethod.theoreticalDensity
                        },
                    ],
                    labels: additionMethod.labels
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
                {additionMethod.practicalAverage && additionMethod.averageMistake && <span>Average: {additionMethod.practicalAverage.toFixed(2)} (error = {(additionMethod.averageMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
            {additionMethod.practicalVariance && additionMethod.varianceMistake && <span>Average: {additionMethod.practicalVariance.toFixed(2)} (error = {(additionMethod.varianceMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {additionMethod.chiSquare && tableChiSquare && <span>Chi Square: {additionMethod.chiSquare.toFixed(2)}
                    {(
                        additionMethod.chiSquare < tableChiSquare ? <span>&lt;</span> :
                        additionMethod.chiSquare === tableChiSquare ? <span>=</span> :
                                <span>&gt;</span>
                    )}
                    {tableChiSquare}
                    <br />
                    ->
                    {(additionMethod.chiSquare < tableChiSquare) ? <span>false</span> : <span>true</span>}
                    (alpha: 0.7)</span>
                }
                {boxMullerMethod.chiSquare && tableChiSquare == null && <span>Too many events. Can't get Chi Square from table</span>}
            </Typography>
            <Divider style={styles.divider} />
            <Bar data={
                {
                    datasets: [
                        {
                            type: 'bar',
                            data: exactAdditionMethod.practicalDensity
                        },
                        {
                            type: 'line',
                            data: exactAdditionMethod.theoreticalDensity
                        },
                    ],
                    labels: exactAdditionMethod.labels
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
                {exactAdditionMethod.practicalAverage && exactAdditionMethod.averageMistake && <span>Average: {exactAdditionMethod.practicalAverage.toFixed(2)} (error = {(exactAdditionMethod.averageMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
            {exactAdditionMethod.practicalVariance && exactAdditionMethod.varianceMistake && <span>Average: {exactAdditionMethod.practicalVariance.toFixed(2)} (error = {(exactAdditionMethod.varianceMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {exactAdditionMethod.chiSquare && tableChiSquare && <span>Chi Square: {exactAdditionMethod.chiSquare.toFixed(2)}
                    {(
                        exactAdditionMethod.chiSquare < tableChiSquare ? <span>&lt;</span> :
                        exactAdditionMethod.chiSquare === tableChiSquare ? <span>=</span> :
                                <span>&gt;</span>
                    )}
                    {tableChiSquare}
                    <br />
                    ->
                    {(exactAdditionMethod.chiSquare < tableChiSquare) ? <span>false</span> : <span>true</span>}
                    (alpha: 0.7)</span>
                }
                {boxMullerMethod.chiSquare && tableChiSquare == null && <span>Too many events. Can't get Chi Square from table</span>}
            </Typography>
            <Divider style={styles.divider} />
            <Bar data={
                {
                    datasets: [
                        {
                            type: 'bar',
                            data: boxMullerMethod.practicalDensity
                        },
                        {
                            type: 'line',
                            data: boxMullerMethod.theoreticalDensity
                        },
                    ],
                    labels: boxMullerMethod.labels
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
                {boxMullerMethod.practicalAverage && boxMullerMethod.averageMistake && <span>Average: {boxMullerMethod.practicalAverage.toFixed(2)} (error = {(boxMullerMethod.averageMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
            {boxMullerMethod.practicalVariance && boxMullerMethod.varianceMistake && <span>Average: {boxMullerMethod.practicalVariance.toFixed(2)} (error = {(boxMullerMethod.varianceMistake * 100).toFixed(2)} %)</span>}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {boxMullerMethod.chiSquare && tableChiSquare && <span>Chi Square: {boxMullerMethod.chiSquare.toFixed(2)}
                    {(
                        boxMullerMethod.chiSquare < tableChiSquare ? <span>&lt;</span> :
                        boxMullerMethod.chiSquare === tableChiSquare ? <span>=</span> :
                                <span>&gt;</span>
                    )}
                    {tableChiSquare}
                    <br />
                    ->
                    {(boxMullerMethod.chiSquare < tableChiSquare) ? <span>false</span> : <span>true</span>}
                    (alpha: 0.7)</span>
                }
                {boxMullerMethod.chiSquare && tableChiSquare == null && <span>Too many events. Can't get Chi Square from table</span>}
            </Typography>
            <Divider style={styles.divider} />
        </div>
    );
}