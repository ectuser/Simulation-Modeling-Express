import React from 'react';
import { TextField, Button, Divider, Grid, CircularProgress } from "@material-ui/core";
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
    const labels = useSelector(state => state.labels14);
    const probabilities = useSelector(state => state.probabilities14);
    const maxProbability = Math.max(...probabilities);

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
                    datasets: [{
                        data: probabilities
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
                                suggestedMin: 0
                            }
                        }]
                    }
                }
            } />
        </div>
    );
}