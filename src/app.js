const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const programsRoutes = require('./routes/programs-routes');

const authRoutes = require('./routes/auth-routes');

const app = express();

app.use(cors({
    origin: [ 'http://localhost:3000', 'https://robertportfolio.github.io/' ], // Укажите ваш источник
    credentials: true, // Разрешить отправку куки
}));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/programs', programsRoutes);
app.use('/auth', authRoutes);

module.exports = app;