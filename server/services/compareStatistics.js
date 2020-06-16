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

module.exports = {
    countAverage : countAverage,
    countVariance : countVariance,
    countAbsMistake : countAbsMistake,
    countRelativeMistake : countRelativeMistake
}