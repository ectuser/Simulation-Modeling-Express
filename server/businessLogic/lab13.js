
const lab13 = async (lambda, range, experimentsAmount) => {
    let theoreticalProbabilities = [];
    for (let i = 0; i < range; i++) {
        theoreticalProbabilities.push(await getProbability(i, lambda));
    }
    console.log(theoreticalProbabilities);
    let theoreticalDistribution = await getDistribution(theoreticalProbabilities);
    console.log(theoreticalDistribution);
    const practicalProbabilities = await doExperiments(theoreticalDistribution, experimentsAmount);
    console.log(practicalProbabilities);

    const theoreticalAverage = countAverage(theoreticalProbabilities);
    const theoreticalVariance = countVariance(theoreticalProbabilities, theoreticalAverage);
    
    const practicalAverage = countAverage(practicalProbabilities);
    const practicalVariance = countVariance(practicalProbabilities, practicalAverage);

    const absDeltaAverage = countAbsMistake(theoreticalAverage, practicalAverage);
    const absDeltaVariance = countAbsMistake(theoreticalVariance, practicalVariance);


    const relativeDeltaAverage = countRelativeMistake(absDeltaAverage, theoreticalAverage);
    const relativeDeltaVariance = countRelativeMistake(absDeltaVariance, theoreticalVariance);

    console.log({average : practicalAverage,
        variance : practicalVariance,
        averageRelativeMistake : relativeDeltaAverage,
        varianceRelativeMistake : relativeDeltaVariance});
    return {
        practicalProbabilities : practicalProbabilities,
        average : practicalAverage,
        variance : practicalVariance,
        averageRelativeMistake : relativeDeltaAverage,
        varianceRelativeMistake : relativeDeltaVariance
    }


    // return theoreticalProbabilities;
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
        for (let i = 0; i < theoreticalDistribution.length; i++){
            if (rnd < theoreticalDistribution[i]){
                selectedAmount[i]++;
                break;
            }
        }
    }
    let practicalProbabilities = new Array(theoreticalDistribution.length).fill(0);
    for (let i = 0; i < theoreticalDistribution.length; i++){
        practicalProbabilities[i] = selectedAmount[i] / experimentsAmount;
    }
    return practicalProbabilities;
}

const countAverage = (probabilities) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++){
        sum += i * probabilities[i];
    }
    return sum;
}
const countVariance = (probabilities, average) => {
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++){
        sum += i ** 2 * probabilities[i];
    }
    let res = sum - (average ** 2)
    return res;
}

const countAbsMistake = (first, second) => Math.abs(first - second);

const countRelativeMistake = (absMistake, theoreticalData) => absMistake / Math.abs(theoreticalData);

const fact = async (num) => {
    let res = 1;
    for (let i = 2; i <= num; i++)
        res = res * i;
    return res;
}

module.exports = lab13;