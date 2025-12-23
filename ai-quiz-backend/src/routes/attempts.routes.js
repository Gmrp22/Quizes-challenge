const express = require('express');
const attemptsController = require('../controllers/attempts.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

// All attempts endpoints require authentication
router.post('/attempts', authenticateToken, attemptsController.postAttempt);
router.get('/attempts', authenticateToken, attemptsController.getUserAttempts);
router.get('/quizzes/highscore/:quizId', authenticateToken, attemptsController.getHighscore);

module.exports = router;
