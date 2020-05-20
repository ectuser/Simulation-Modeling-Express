const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public/build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))