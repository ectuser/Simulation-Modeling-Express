const controller = require('./controller');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require("body-parser");
const Lab15Controller = require("./controllers/Lab15Controller");
const Lab13Controller = require('./controllers/Lab13Controller');
const Lab14Controller = require('./controllers/Lab14Controller');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 


app.use(express.static(path.join(__dirname, '../build')));

app.get('/simulation-discrete-random-variable', Lab13Controller.main);
app.get('/lab-14', Lab14Controller.main);

app.get('/lab-15/get-current-time', Lab15Controller.Lab15GetCurrentTimeController);
app.get('/lab-15', Lab15Controller.main);
app.post('/lab-15/set-start-time', Lab15Controller.Lab15SetStartTimeController);
app.get('/lab-15/clear-database', Lab15Controller.Lab15ClearDatabase);
app.get('/lab-15/process-the-results', Lab15Controller.Lab15ProcessTheResults);



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))