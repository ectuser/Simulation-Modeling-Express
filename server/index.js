const controller = require('./controller');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');


app.use(express.static(path.join(__dirname, '../build')));

app.get('/simulation-discrete-random-variable', controller.Lab13Controller);
app.get('/lab-14', controller.Lab14Controller);



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))