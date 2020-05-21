const lab13 = require('./businessLogic/lab13');

const Lab13Controller = async (req, res) => {
    const lambda = req.query.lambda;
    const range = req.query.range;
    const experimentsAmount = req.query.experimentsAmount;
    let data = await lab13(Number(lambda), Number(range), Number(experimentsAmount)); // output should be object
    // console.log(output);
    res.json(data);
}

module.exports = {
    Lab13Controller : Lab13Controller
};