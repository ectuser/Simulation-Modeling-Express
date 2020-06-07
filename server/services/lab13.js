const chiSquareTable = require("./chiSquareTable");

const lab13 = async (lambda, range, experimentsAmount) => {
    range++;
    let theoreticalProbabilities = [];
    for (let i = 0; i < range; i++) {
        theoreticalProbabilities.push(await getProbability(i, lambda));
    }
    console.log(theoreticalProbabilities);
    let theoreticalDistribution = await getDistribution(theoreticalProbabilities);
    console.log(theoreticalDistribution);
    const [practicalProbabilities, selectedAmount] = await doExperiments(theoreticalDistribution, experimentsAmount);
    console.log(practicalProbabilities);

    const theoreticalAverage = countAverage(theoreticalProbabilities);
    const theoreticalVariance = countVariance(theoreticalProbabilities, theoreticalAverage);

    const practicalAverage = countAverage(practicalProbabilities);
    const practicalVariance = countVariance(practicalProbabilities, practicalAverage);

    console.log("Theoretical : ", theoreticalVariance, "\n Practical : ", practicalVariance);

    const absDeltaAverage = countAbsMistake(theoreticalAverage, practicalAverage);
    const absDeltaVariance = countAbsMistake(theoreticalVariance, practicalVariance);


    const relativeDeltaAverage = countRelativeMistake(absDeltaAverage, theoreticalAverage);
    const relativeDeltaVariance = countRelativeMistake(absDeltaVariance, theoreticalVariance);

    const countedChiSquare = countChiSquare(theoreticalProbabilities, experimentsAmount, selectedAmount);
    const ALPHA = 0.7;
    const tableChiSquare = getChiSquareFromTable(range, ALPHA);

    return {
        practicalProbabilities: practicalProbabilities,
        average: practicalAverage,
        variance: practicalVariance,
        averageRelativeMistake: relativeDeltaAverage,
        varianceRelativeMistake: relativeDeltaVariance,
        countedChiSquare: countedChiSquare,
        tableChiSquare: tableChiSquare
    }
}

const getProbability = async (m, lambda) => ((lambda ** m * Math.E ** (-lambda))) / (await fact(m));

const getDistribution = async (probabilities) => {
    let distribution = new Array(probabilities.length).fill(0);
    distribution[0] = probabilities[0];
    for (let i = 1; i < probabilities.length - 1; i++) {
        distribution[i] = distribution[i - 1] + probabilities[i];
    }
    distribution[distribution.length - 1] = 1;
    return distribution;
}

const doExperiments = async (theoreticalDistribution, experimentsAmount) => {
    let selectedAmount = new Array(theoreticalDistribution.length).fill(0);;
    for (let i = 0; i < experimentsAmount; i++) {
        let rnd = Math.random();
        for (let i = 0; i < theoreticalDistribution.length; i++) {
            if (rnd < theoreticalDistribution[i]) {
                selectedAmount[i]++;
                break;
            }
        }
    }
    let practicalProbabilities = new Array(theoreticalDistribution.length).fill(0);
    for (let i = 0; i < theoreticalDistribution.length; i++) {
        practicalProbabilities[i] = selectedAmount[i] / experimentsAmount;
    }
    return [practicalProbabilities, selectedAmount];
}

const countAverage = (probabilities) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += i * probabilities[i];
    }
    return sum;
}
const countVariance = (probabilities, average) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += i ** 2 * probabilities[i];
    }
    let res = sum - (average ** 2)
    return res;
}

const countAbsMistake = (first, second) => Math.abs(first - second);

const countRelativeMistake = (absMistake, theoreticalData) => absMistake / Math.abs(theoreticalData);

const countChiSquare = (ps, experimentsAmount, selectedAmount) => {
    let sum = 0;
    for (let i = 0; i < selectedAmount.length; i++) {
        sum += ((selectedAmount[i] ** 2) / (experimentsAmount * ps[i]));
    }
    sum -= experimentsAmount;
    return sum;
}

const alphas = [0.95, 0.90, 0.80, 0.70, 0.50, 0.30, 0.20, 0.10, 0.05, 0.01, 0.001];
const getChiSquareFromTable = (m, alpha) => chiSquareTable.module[m][alphas.indexOf(alpha)];

const fact = async (num) => {
    let res = 1;
    for (let i = 2; i <= num; i++)
        res = res * i;
    return res;
}

module.exports = lab13;