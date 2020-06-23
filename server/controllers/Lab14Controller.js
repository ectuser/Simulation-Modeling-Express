const lab14 = require('../services/lab14');

const Lab14Controller = async (req, res) => {
    let output = await lab14(Number(req.query.average), Number(req.query.variance), Number(req.query.experimentsAmount)); // output should be an object
    res.json(output);
};

module.exports = {
    main : Lab14Controller
};