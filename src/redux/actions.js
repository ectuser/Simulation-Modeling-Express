export const setIsLoading = (status) => ({ type: "SET_IS_LOADING", payload: status });
export const setIsLoading14 = (status) => ({ type: "SET_IS_LOADING_14", payload: status });
export const setData = (data) => ({type : "SET_DATA", payload: data})
export const setData14 = (data) => ({type : "SET_DATA_14", payload: data})

export const solveData13 = (lambda, range, experimentsAmount) => ({
    type: "SOLVE_DATA_13",
    payload: {lambda, range, experimentsAmount}
})
export const solveData14 = (data) => ({
    type: "SOLVE_DATA_14",
    payload: data
})

// export const solveData14 = (data) => async (dispatch) => {
//     dispatch(setIsLoading14(true));
//     try {
//         const outputServerData = await axios.get('/lab-14', {params : data});
//         const outputData = outputServerData.data;
//         console.log(outputData);
//         dispatch(setData14(outputData));
//     } catch (error) {
//         console.error(error);
//     } finally{
//         dispatch(setIsLoading14(false));
//     }
// }