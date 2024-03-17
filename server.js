const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    res.json({ message: "This is data from the backend." });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
