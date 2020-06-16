const nerdamer = require('nerdamer/all');
const compareStatistics = require('./compareStatistics');

const lab15 = async ({t, i}) => {
    // states : 
    // 0 - clear
    // 1 - cloudy
    // 2 - overcast
    const states = ["clear", "cloudy", "overcast"];
    
    const coefs = [
        [-0.4, 0.3, 0.1],
        [0.4, -0.8, 0.4],
        [0.1, 0.4, -0.5]
    ];

    const alpha = 0.9;
    let taoRaw = Math.log(alpha) / coefs[i][i];

    // x / 24 = taoRaw / 1

    const tao = Math.round( 24 * taoRaw / 1 );

    t += tao;

    const probabilities = getProbabilities([...coefs], i);
    const distribution = getDistribution([...probabilities]);
    const probability = Math.random();
    i = getEvent(distribution, probability);
    return {t, i};
}

const getProbabilities = (coefs, i) => [...new Array(3)].map((item, j) => ((i === j) ? 0 : -coefs[i][j] / coefs[i][i]));
const getDistribution = (probabilities) => {
    let distribution = new Array(3).fill(0);
    distribution[0] = probabilities[0]
    distribution[1] = distribution[0] + probabilities[1];
    distribution[2] = 1;
    return distribution;
}
const getEvent = (distribution, probability) => distribution.indexOf(distribution.find(d => probability < d));


const processTheResults = async (events) => {
    const N = events.length;
    let stateDurations = getStateDurations(events);
    console.log(stateDurations);
    let statesSum = getStatesSum(stateDurations);
    const durationsSum = getDurationsSum(stateDurations);
    const statesFrequency = getFrequency(statesSum, durationsSum);

    const coefs = [
        [-0.4, 0.3, 0.1],
        [0.4, -0.8, 0.4],
        [0.1, 0.4, -0.5]
    ];
    // Teoretical probabilities:
    // -0.4x + 0.4y + 0.1z = 0
    // 0.3x - 0.8y + 0.4z = 0
    // x + y + z = 1

    var solution = nerdamer.solveEquations(
        [`-0.4*x + 0.4*y + 0.1*z = 0`, '0.3*x - 0.8*y + 0.4*z = 0', 'x + y + z = 1']
    );
    const teoreticalProbabilities = [solution[0][1], solution[1][1], solution[2][1]];


    const practicalExpected = compareStatistics.countAverage(statesFrequency);
    const practicalVariance = compareStatistics.countVariance(statesFrequency, practicalExpected);

    const theoreticalExpected = compareStatistics.countAverage(teoreticalProbabilities);
    const theoreticalVariance = compareStatistics.countVariance(teoreticalProbabilities, theoreticalExpected);

    const absExpectedMistake = compareStatistics.countAbsMistake(practicalExpected, theoreticalExpected);
    const absVarianceMistake = compareStatistics.countAbsMistake(practicalVariance, theoreticalVariance);

    const relativeExpectedMistake = compareStatistics.countRelativeMistake(absExpectedMistake, theoreticalExpected);
    const relativeVarianceMistake = compareStatistics.countRelativeMistake(absVarianceMistake, theoreticalVariance);

    return {practicalExpected, practicalVariance, relativeExpectedMistake, relativeVarianceMistake}
}

const getStateDurations = (events) => events.map((item ,i) => ({ state : item.weatherStaus, duration : (item.endTime - item.startTime) / (1000 * 3600) })); 

const getDurationsSum = (arr) => arr.map(item => item.duration).reduce((sum, el) => sum + el);

const getStatesSum = (arr) => {
    let sumArray = [0, 0, 0]
    for (let el of arr){
        sumArray[el.state] += el.duration
    }
    return sumArray;
} 

const getFrequency = (statesSum, durationsSum) => statesSum.map((item, i) => (item / durationsSum));

module.exports = {
    main : lab15,
    processTheResults : processTheResults
};