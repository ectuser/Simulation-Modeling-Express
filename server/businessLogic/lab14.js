const lab14 = async (average, variance, experimentsAmount) => {
    const intervalsAmount = Math.ceil(Math.log(experimentsAmount)) + 1;
    // const intervalsAmount = Math.ceil(Math.sqrt(experimentsAmount)) + 1;

    const [additionMethodValues, exactAdditionMethodValues] = doExperiments(average, variance, experimentsAmount);
    console.log("Exact method values: ", exactAdditionMethodValues);

    const [additionMethodDensity, additionMethodProbabilities, additionMethodIntervals, chiSquare] = countDensity(additionMethodValues, average, variance, intervalsAmount, experimentsAmount);
    console.log("Chi square: ", chiSquare);

    const resultObject = {
        labels: additionMethodIntervals,
        probabilities: {
            practical: additionMethodDensity,
            theoretical: additionMethodProbabilities
        }
    };
    return resultObject;

}

const countDensity = (values, average, variance, intervalsAmount, experimentsAmount) => {
    const leftGraphBorder = Math.min(...values);
    const rightGraphBorder = Math.max(...values);

    const intervalValue = Math.abs(rightGraphBorder - leftGraphBorder) / intervalsAmount;

    console.log(leftGraphBorder, rightGraphBorder, intervalValue, intervalsAmount);
    const intervals = getIntervals(leftGraphBorder, rightGraphBorder, intervalValue, intervalsAmount);
    console.log("Intervals: ", intervals);
    const selections = selectData(values, intervals);
    console.log("Selections: ", selections);
    const probabilities = getProbabilities(selections, experimentsAmount);
    console.log("Probabilities: ", probabilities);


    const allArea = getAllArea(intervalValue, probabilities);
    const coef = 1 / allArea;
    const density = getAllDensity(probabilities, coef);
    console.log(coef);
    // Эта штука нужна, чтобы сумма площадей фигур была = 1


    console.log("All area: ", allArea);
    const theoreticalProbabilities = getTheoreticalProbabilities(intervals, variance, average);
    console.log("Theoretical probabilities", theoreticalProbabilities);
    const pis = countPis([0, ...intervals], theoreticalProbabilities);
    console.log(pis)

    const chiSquare = countChiSquare(pis, experimentsAmount, selections);


    return [density, theoreticalProbabilities, intervals, chiSquare];
}

const countChiSquare = (pis, N, selections) => {
    let sum = 0;
    for (let i = 0; i < selections.length; i++){
        sum += ((selections[i] ** 2) / (N * pis[i]))
    }
    const chi = sum - N;
    return chi;
}

const countPis = (intervals, probabilities) => {
    let pis = []
    for (let i = 1; i < intervals.length; i++){
        const a = intervals[i - 1];
        const b = intervals[i];
        const pxi = probabilities[i - 1];
        const res = (b - a) * pxi * ((a + b) / 2)
        if (res < 0){
            console.log(a, b, pxi, i);
        }
        pis.push(res);
    }
    return pis;
}

const getAllDensity = (probabilities, coef) => probabilities.map((item, i) => item * coef);

const getAllArea = (intervalValue, probabilities) => [...probabilities.map((item, i) => item * intervalValue)].reduce((a,b) => a + b);

const getTheoreticalProbabilities = (intervals, variance, average) => intervals.map((x, i) => ((Math.E ** (-((x - average) ** 2) / (2 * variance))) / (Math.sqrt(variance) * Math.sqrt(2 * Math.PI))));

const getProbabilities = (selections, N) => selections.map((item, i) => item / N);

const selectData = (values, intervals) => {
    let selections = new Array(intervals.length).fill(0);
    for (let val of values) {
        for (let i = 0; i < intervals.length; i++) {
            if (val < intervals[i]) {
                selections[i]++;
                break;
            }
        }
    }
    return selections;
}

const getIntervals = (leftGraphBorder, rightGraphBorder, intervalValue, intervalsAmount) => {
    let intervals = new Array(intervalsAmount);
    intervals[0] = leftGraphBorder + intervalValue;
    for (let i = 1; i < intervalsAmount - 1; i++) {
        intervals[i] = intervals[i - 1] + intervalValue;
    }
    intervals[intervalsAmount - 1] = rightGraphBorder;
    return intervals;
}

const doExperiments = (average, variance, N) => {
    let additionMethodResults = [];
    let exactAdditionMethodResults = [];
    for (let i = 0; i < N; i++) {
        let sum = countSum(12);
        const zeta = sum - 6;
        let zetaForExact = zeta + (zeta ** 3 - 3 * zeta) / 240 ;
        const additionMethodXi = countXi(zeta, average, variance);
        const exactAdditionMethodXi = countXi(zetaForExact, average, variance);
        additionMethodResults.push(additionMethodXi);
        exactAdditionMethodResults.push(exactAdditionMethodXi);
    }
    console.log(additionMethodResults);
    return [additionMethodResults, exactAdditionMethodResults];
}

const countXi = (zeta, average, variance) => Math.sqrt(variance) * zeta + average;

const countSum = (n) => {
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum += Math.random();
    }
    return sum;
}


module.exports = lab14;