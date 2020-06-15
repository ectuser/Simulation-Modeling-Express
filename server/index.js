const controller = require('./controller');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require("body-parser");

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 


app.use(express.static(path.join(__dirname, '../build')));

app.get('/simulation-discrete-random-variable', controller.Lab13Controller);
app.get('/lab-14', controller.Lab14Controller);

app.get('/lab-15/get-current-time', controller.Lab15GetCurrentTimeController);
app.get('/lab-15', controller.Lab15Controller);
app.post('/lab-15/set-start-time', controller.Lab15SetStartTimeController);
app.get('/lab-15/clear-database', controller.Lab15ClearDatabase);
app.get('/lab-15/process-the-results', controller.Lab15ProcessTheResults);



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))