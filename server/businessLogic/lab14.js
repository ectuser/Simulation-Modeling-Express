const chiSquareTable = require("./chiSquareTable");

const lab14 = async (average, variance, experimentsAmount) => {
    const intervalsAmount = Math.ceil(Math.log(experimentsAmount)) + 1;
    // const intervalsAmount = Math.ceil(Math.sqrt(experimentsAmount)) + 1;

    const [additionMethodValues, exactAdditionMethodValues, boxMullerMethodValues] = doExperiments(average, variance, experimentsAmount);
    console.log("Exact method values: ", exactAdditionMethodValues);

    const [additionMethodDensity, additionMethodProbabilities,
        additionMethodIntervals, additionMethodChiSquare,
        additionMethodPracticalAverage, additionMethodPracticalVariance,
        additionMethodRelativeAverageMistake, additionMethodRelativeVarianceMistake] = countDensity(additionMethodValues, average, variance, intervalsAmount, experimentsAmount);

    const [exactAdditionMethodDensity, exactAdditionMethodProbabilities,
        exactAdditionMethodIntervals, exactAdditionMethodChiSquare,
        exactAdditionMethodPracticalAverage, exactAdditionMethodPracticalVariance,
        exactAdditionMethodRelativeAverageMistake, exactAdditionMethodRelativeVarianceMistake] = countDensity(exactAdditionMethodValues, average, variance, intervalsAmount, experimentsAmount);

    const [boxMullerMethodDensity, boxMullerMethodProbabilities,
        boxMullerMethodIntervals, boxMullerMethodChiSquare,
        boxMullerMethodPracticalAverage, boxMullerMethodPracticalVariance,
        boxMullerMethodRelativeAverageMistake, boxMullerMethodRelativeVarianceMistake] = countDensity(boxMullerMethodValues, average, variance, intervalsAmount, experimentsAmount);

    let tableChiSquare = null;
    try {
        const ALPHA = 0.7;
        tableChiSquare = getChiSquareFromTable(intervalsAmount, ALPHA);
    } catch (error) {
        tableChiSquare = null;
    }
    // console.log("Chi square: ", additionMethodPracticalAverage, additionMethodPracticalVariance, additionMethodRelativeAverageMistake, additionMethodRelativeVarianceMistake);

    const resultObject = {
        additionMethod: {
            practicalDensity: additionMethodDensity,
            theoreticalDensity: additionMethodProbabilities,
            labels: additionMethodIntervals,
            practicalAverage: additionMethodPracticalAverage,
            practicalVariance: additionMethodPracticalVariance,
            averageMistake: additionMethodRelativeAverageMistake,
            varianceMistake: additionMethodRelativeVarianceMistake,
            chiSquare: additionMethodChiSquare
        },
        exactAdditionMethod: {
            practicalDensity: exactAdditionMethodDensity,
            theoreticalDensity: exactAdditionMethodProbabilities,
            labels: exactAdditionMethodIntervals,
            practicalAverage: exactAdditionMethodPracticalAverage,
            practicalVariance: exactAdditionMethodPracticalVariance,
            averageMistake: exactAdditionMethodRelativeAverageMistake,
            varianceMistake: exactAdditionMethodRelativeVarianceMistake,
            chiSquare: exactAdditionMethodChiSquare
        },
        boxMullerMethod: {
            practicalDensity: boxMullerMethodDensity,
            theoreticalDensity: boxMullerMethodProbabilities,
            labels: boxMullerMethodIntervals,
            practicalAverage: boxMullerMethodPracticalAverage,
            practicalVariance: boxMullerMethodPracticalVariance,
            averageMistake: boxMullerMethodRelativeAverageMistake,
            varianceMistake: boxMullerMethodRelativeVarianceMistake,
            chiSquare: boxMullerMethodChiSquare
        },
        tableChiSquare: tableChiSquare

    };
    return resultObject;

}

const countDensity = (values, average, variance, intervalsAmount, experimentsAmount) => {
    const [practicalAverage, practicalVariance, relativeAverageMistake, relativeVarianceMistake] = countExDxAndMistakes(values, experimentsAmount, average, variance);

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
    const pis = countPis([leftGraphBorder, ...intervals], average, variance);
    console.log(pis);

    const chiSquare = countChiSquare(experimentsAmount, selections, pis);




    return [density, theoreticalProbabilities, intervals, chiSquare, practicalAverage, practicalVariance, relativeAverageMistake, relativeVarianceMistake];
}

const countExDxAndMistakes = (values, experimentsAmount, theoreticalAverage, theoreticalVariance) => {
    const practicalAverage = (values.reduce((a, b) => a + b)) / experimentsAmount;
    const practicalVariance = (values.map((item, i) => item ** 2).reduce((a, b) => a + b)) / experimentsAmount - practicalAverage ** 2;

    const absAverageMistake = Math.abs(theoreticalAverage - practicalAverage);
    const absVarianceMistake = Math.abs(theoreticalVariance - practicalVariance);

    const relativeAverageMistake = absAverageMistake / Math.abs(theoreticalAverage);
    const relativeVarianceMistake = absVarianceMistake / Math.abs(theoreticalVariance);

    return [practicalAverage, practicalVariance, relativeAverageMistake, relativeVarianceMistake];
}



const countChiSquare = (experimentsAmount, selections, pis) => {
    let sum = 0;
    for (let i = 0; i < pis.length; i++) {
        sum += ((selections[i] ** 2) / (experimentsAmount * pis[i]))
    }
    return sum - experimentsAmount;
}

const countPis = (intervals, average, variance) => {
    let pis = []
    for (let i = 1; i < intervals.length; i++) {
        const a = intervals[i - 1];
        const b = intervals[i];
        const x = (a + b) / 2;
        const pxi = countTheoreticalProbability(x, average, variance);
        const res = (b - a) * pxi;
        if (res < 0) {
            console.log(x, average, variance, pxi, a, b);
        }
        pis.push(res);
    }
    return pis;
}

const getAllDensity = (probabilities, coef) => probabilities.map((item, i) => item * coef);

const getAllArea = (intervalValue, probabilities) => [...probabilities.map((item, i) => item * intervalValue)].reduce((a, b) => a + b);

const getTheoreticalProbabilities = (intervals, variance, average) => intervals.map((x, i) => countTheoreticalProbability(x, average, variance));

const countTheoreticalProbability = (x, average, variance) => ((Math.E ** (-((x - average) ** 2) / (2 * variance))) / (Math.sqrt(variance) * Math.sqrt(2 * Math.PI)));

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
    let boxMullerMethodResults = [];
    for (let i = 0; i < N; i++) {
        let sum = countSum(12);
        const zeta = sum - 6;
        let zetaForExact = zeta + (zeta ** 3 - 3 * zeta) / 240;
        let zetaForBoxMullerMethod = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
        const additionMethodXi = countXi(zeta, average, variance);
        const exactAdditionMethodXi = countXi(zetaForExact, average, variance);
        const BoxMullerMethodXi = countXi(zetaForBoxMullerMethod, average, variance);
        additionMethodResults.push(additionMethodXi);
        exactAdditionMethodResults.push(exactAdditionMethodXi);
        boxMullerMethodResults.push(BoxMullerMethodXi);
    }
    console.log(additionMethodResults);
    return [additionMethodResults, exactAdditionMethodResults, boxMullerMethodResults];
}

const countXi = (zeta, average, variance) => Math.sqrt(variance) * zeta + average;

const countSum = (n) => {
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum += Math.random();
    }
    return sum;
}

const alphas = [0.95, 0.90, 0.80, 0.70, 0.50, 0.30, 0.20, 0.10, 0.05, 0.01, 0.001];
const getChiSquareFromTable = (m, alpha) => chiSquareTable.module[m][alphas.indexOf(alpha)];


module.exports = lab14;