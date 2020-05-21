import React, { useRef } from 'react';
import { TextField, Button, Divider, Grid } from "@material-ui/core"
import axios from "axios";

const styles = {
    divider: {
        margin: "20px auto"
    }
}

export const Lab13 = () => {

    let lambdaRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        
        const lambda = lambdaRef.current.value;
        console.log(lambda, Number(lambda));
        if (isNaN(lambda)){
            alert("Please type number");
            return;
        }
        
        let data = await axios.get('/simulation-discrete-random-variable', { params: { lambda: lambda }});
        console.log(data);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <form noValidate autoComplete="off" onSubmit={submit}>
                    <TextField id="standard-basic" label="Lambda" inputRef={lambdaRef} />
                    <Divider style={styles.divider} />
                    <Button type="submit" variant="contained" color="primary">
                        Start
                </Button>
                </form>
            </Grid>
            <Grid item xs={6}>
                Hello world
            </Grid>
        </Grid>
    )
}