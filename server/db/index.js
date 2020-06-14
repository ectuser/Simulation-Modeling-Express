const Datastore = require('nedb-promises')
const db = new Datastore({ filename: 'server/db/Lab15Database' });


const insertRealStartTimeData = async ({startTime, endTime, weatherStaus}) => {
    try {
        const allDocument = await db.find({});
        const last = allDocument[allDocument.length - 1];
        await db.update({_id : last._id}, {...last, startTime, endTime, weatherStaus});
        console.log("Update");

    } catch (error) {
        await db.insert({startTime, endTime, weatherStaus});
        console.log("Insert");
    }
}

const getEndTime = async () => {
    try {
        const allDocument = await db.find({});
        const last = allDocument[allDocument.length - 1];
        return last.endTime;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    insertRealStartTimeData : insertRealStartTimeData,
    getEndTime : getEndTime
};