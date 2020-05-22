const lab14 = async (average, variance, experimentsAmount) => {
    const intervalsAmount = Math.ceil(Math.log(experimentsAmount)) + 1;
    // const intervalsAmount = Math.ceil(Math.sqrt(experimentsAmount)) + 1;

    const values = doExperiments(average, variance, experimentsAmount);

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

    const resultObject = {
        labels: intervals,
        probabilities: {
            practical: density,
            theoretical: theoreticalProbabilities
        }
    };
    return resultObject;

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
    let results = [];
    for (let i = 0; i < N; i++) {
        let sum = countSum(12);
        const zeta = sum - 6;
        let xi = Math.sqrt(variance) * zeta + average;
        results.push(xi);
    }
    console.log(results);
    return results;
}

const countSum = (n) => {
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum += Math.random();
    }
    return sum;
}


module.exports = lab14;