const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const programsRoutes = require('./routes/programs-routes');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/programs', programsRoutes);
app.use('/auth', authRoutes);

module.exports = app;