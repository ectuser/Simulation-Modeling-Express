const lab13 = require('./services/lab13');
const lab14 = require('./services/lab14');
const lab15 = require('./services/lab15');

const Lab13Controller = async (req, res) => {
    const lambda = req.query.lambda;
    const range = req.query.range;
    const experimentsAmount = req.query.experimentsAmount;
    let data = await lab13(Number(lambda), Number(range), Number(experimentsAmount)); // output should be object
    res.json(data);
};

const Lab14Controller = async (req, res) => {
    let output = await lab14(Number(req.query.average), Number(req.query.variance), Number(req.query.experimentsAmount)); // output should be object
    res.json(output);
};

const Lab15Controller = async (req, res) => {
    const {t, i} = req.query;
    console.log(t, i);
    let result = await lab15({events : [], t : Number(t), i : Number(i)});
    console.log(result);
    res.json(result);
};

module.exports = {
    Lab13Controller : Lab13Controller,
    Lab14Controller : Lab14Controller,
    Lab15Controller : Lab15Controller
};