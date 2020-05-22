import axios from "axios";
export const setIsLoading = (status) => ({ type: "SET_IS_LOADING", payload: status });
export const setIsLoading14 = (status) => ({ type: "SET_IS_LOADING_14", payload: status });
export const setData = (data) => ({type : "SET_DATA", payload: data})
export const setData14 = (data) => ({type : "SET_DATA_14", payload: data})


export const solveData = (lambda, range, experimentsAmount) => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        try {
            let serverData = await axios.get('/simulation-discrete-random-variable', { params: { lambda: lambda, range: range, experimentsAmount: experimentsAmount } });
            let data = serverData.data;
            console.log(data);
            data.labels = [...Array(data.practicalProbabilities.length).keys()];
            data.labels[data.labels.length - 1] = `More than ${data.labels[data.labels.length - 1]}`;
            dispatch(setData(data));
        } catch (error) {
            console.error(error);
        } finally{
            dispatch(setIsLoading(false));
        }
    }
}

export const solveData14 = (data) => async (dispatch) => {
    dispatch(setIsLoading14(true));
    try {
        const outputServerData = await axios.get('/lab-14', {params : data});
        const outputData = outputServerData.data;
        console.log(outputData);
        dispatch(setData14(outputData));
    } catch (error) {
        console.error(error);
    } finally{
        dispatch(setIsLoading14(false));
    }
}