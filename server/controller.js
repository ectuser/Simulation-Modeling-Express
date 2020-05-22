const lab13 = require('./businessLogic/lab13');
const lab14 = require('./businessLogic/lab14');

const Lab13Controller = async (req, res) => {
    const lambda = req.query.lambda;
    const range = req.query.range;
    const experimentsAmount = req.query.experimentsAmount;
    let data = await lab13(Number(lambda), Number(range), Number(experimentsAmount)); // output should be object
    res.json(data);
}

const Lab14Controller = async (req, res) => {
    let output = await lab14(Number(req.query.average), Number(req.query.variance), Number(req.query.experimentsAmount)); // output should be object
    res.json(output);
}

module.exports = {
    Lab13Controller : Lab13Controller,
    Lab14Controller : Lab14Controller
};