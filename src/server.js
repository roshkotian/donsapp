const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();
const { PORT } = require('./src/config/configs')

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));