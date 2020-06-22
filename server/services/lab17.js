const main = (lambda, prevT) => {
    const alpha = 0.5;

    return prevT + ( -Math.log(alpha) / lambda );
};

module.exports = {
    lab17 : main
}