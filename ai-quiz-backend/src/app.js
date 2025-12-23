const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const quizzesRoutes = require('./routes/quizzes.routes');
const attemptsRoutes = require('./routes/attempts.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', authRoutes);
app.use('/api', quizzesRoutes);
app.use('/api', attemptsRoutes); // attempts and highscore endpoints

// Error middleware (should be last)
app.use(errorHandler);

module.exports = app;
