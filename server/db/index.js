const Datastore = require('nedb-promises')
const db = new Datastore({ filename: 'server/db/Lab15Database' });
// const db = new Datastore();


const insertRealStartTimeData = async ({startTime, endTime, weatherStaus}) => {
    try {
        // const allDocument = await db.find({startTime : /.*/});
        // const last = allDocument[allDocument.length - 1];
        // await db.update({_id : last._id}, {...last, startTime, endTime, weatherStaus});
        await db.insert({startTime, endTime, weatherStaus});
        console.log("Update");

    } catch (error) {
        await db.insert({startTime, endTime, weatherStaus});
        console.log("Insert");
    }
}

const getEndTime = async () => {
    try {
        const last = (await db.find({startTime : /.*/}).limit(1).sort({endTime : -1}))[0];
        return last.endTime;
    } catch (error) {
        console.error(error);
    }
}

const clearTheDatabase = async () => {
    await db.remove({}, {multi : true});
}

module.exports = {
    insertRealStartTimeData : insertRealStartTimeData,
    getEndTime : getEndTime,
    clearTheDatabase : clearTheDatabase
};