const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const programsRoutes = require('./routes/programs-routes');


const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/programs', programsRoutes);

module.exports = app;