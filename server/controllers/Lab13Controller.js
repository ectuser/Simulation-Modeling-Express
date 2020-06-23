const lab13 = require('../services/lab13');

const Lab13Controller = async (req, res) => {
    const lambda = req.query.lambda;
    const range = req.query.range;
    const experimentsAmount = req.query.experimentsAmount;
    let data = await lab13(Number(lambda), Number(range), Number(experimentsAmount)); // output should be an object
    res.json(data);
};

module.exports = {
	main : Lab13Controller
};