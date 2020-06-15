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
    const durationsSum = getDurationsSum(stateDurations);
    stateDurations = getFrequency(stateDurations, durationsSum);
    
}

const getStateDurations = (events) => events.map((item ,i) => ({ state : item.weatherStaus, duration : (item.endTime - item.startTime) / (1000 * 3600) })); 

const getDurationsSum = (arr) => arr.map(item => item.duration).reduce((sum, el) => sum + el)

const getFrequency = (stateDurations, durationsSum) => stateDurations.map((item, i) => ({...item, frequency : item.duration / durationsSum}));

module.exports = {
    main : lab15,
    processTheResults : processTheResults
};