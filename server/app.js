const express = require('express');
const { PORT } = require('./config.js')
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
})

app.get('/status', (req, res) => {
    const status = {
        "Status" : "Running"
    }

    res.send(status);
});