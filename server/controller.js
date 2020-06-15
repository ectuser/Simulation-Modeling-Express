const lab13 = require('./services/lab13');
const lab14 = require('./services/lab14');
const lab15 = require('./services/lab15');
const db = require('./db/index');

const Lab13Controller = async (req, res) => {
    const lambda = req.query.lambda;
    const range = req.query.range;
    const experimentsAmount = req.query.experimentsAmount;
    let data = await lab13(Number(lambda), Number(range), Number(experimentsAmount)); // output should be an object
    res.json(data);
};

const Lab14Controller = async (req, res) => {
    let output = await lab14(Number(req.query.average), Number(req.query.variance), Number(req.query.experimentsAmount)); // output should be an object
    res.json(output);
};

const Lab15Controller = async (req, res) => {
    const {t, i, startTime} = req.query;
    console.log(t, i, startTime);
    let result = await lab15({t : Number(t), i : Number(i)});

    const endTime = Number(startTime) + Number(result.t) * 3600 * 1000;

    await db.insertRealStartTimeData({startTime, endTime, weatherStaus : result.i});
    console.log(result);
    res.json(result);
};

const Lab15GetCurrentTimeController = async (req, res) => {
    const currentTimeNumber = Number(req.query.currentTime);
    console.log(currentTimeNumber);
    const date = new Date(currentTimeNumber);
    date.setHours(date.getHours() + 1);
    console.log(date.getTime());

    const endTime = await db.getEndTime();

    let shouldChangeTheWeather = false;

    if (endTime <= date.getTime()){
        console.log("CHANGE THE WEATHER");
        shouldChangeTheWeather = true;
    }


    res.json({time : date.getTime().toString(), shouldChangeTheWeather});
};

const Lab15SetStartTimeController = async (req, res) => {
    const time = req.body.time;
    await db.insertRealStartTimeData(req.body.time);
}

const Lab15ClearDatabase = async (req, res) => {
    await db.clearTheDatabase();
    res.send("success");
}

module.exports = {
    Lab13Controller : Lab13Controller,
    Lab14Controller : Lab14Controller,
    Lab15Controller : Lab15Controller,
    Lab15GetCurrentTimeController : Lab15GetCurrentTimeController,
    Lab15SetStartTimeController : Lab15SetStartTimeController,
    Lab15ClearDatabase : Lab15ClearDatabase
};