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

module.exports = lab15;