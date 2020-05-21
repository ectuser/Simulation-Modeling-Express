
const lab13 = async (lambda) => {

}

const generate = async (lambda) => {
    let alpha = Math.random();
    let m = 0;
    let S = 0;
    while (S < lambda){
        S -= Math.log(alpha);
        m++;
    }
    return m;
}

const getProbability = (m, lambda, t) => {

}

module.exports = lab13;