const lab13 = require('./businessLogic/lab13');

const Lab13Controller = async (req, res) => {
    const lambda = req.query.lambda;
    const output = await lab13(lambda); // output should be object
    res.json(output);
}

module.exports = {
    Lab13Controller : Lab13Controller
};