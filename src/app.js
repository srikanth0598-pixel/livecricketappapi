const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');

const tournamentsRoutes = require('./routes/tournamentsRoutes');
const matchRoutes = require('./routes/matchRoutes');
const scorecardRoutes = require('./routes/scorecardRoutes');
const ballRoutes = require('./routes/ballRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");
// Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/tournaments', tournamentsRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/scorecards', scorecardRoutes);
app.use('/api/balls', ballRoutes);
 

// Error handler (always last)
app.use(errorHandler);

module.exports = app;