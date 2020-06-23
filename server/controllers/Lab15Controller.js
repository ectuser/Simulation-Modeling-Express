const lab15 = require('../services/lab15');
const db = require('../db/index');

const Lab15Controller = async (req, res) => {
    const {t, i, startTime} = req.query;
    console.log(t, i, startTime);
    let result = await lab15.main({t : Number(t), i : Number(i)});

    const endTime = (Number(startTime) + Number(result.t) * 3600 * 1000).toString();

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

    const endTime = Number(await db.getEndTime());

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

const Lab15ProcessTheResults = async (req, res) => {
    let events = await db.getAllEvents();
    events = events.map((item, i) => ({...item, startTime : Number(item.startTime), endTime : Number(item.endTime)}));
    const result = await lab15.processTheResults(events);
    res.json(result);
}

module.exports = {
    main : Lab15Controller,
    Lab15GetCurrentTimeController : Lab15GetCurrentTimeController,
    Lab15SetStartTimeController : Lab15SetStartTimeController,
    Lab15ClearDatabase : Lab15ClearDatabase,
    Lab15ProcessTheResults : Lab15ProcessTheResults
};