const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../build')));

app.get('/get-user', (req, res) => {
    res.json({ name: "Ivan" });
})



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))