const express = require('express');
const quizzesController = require('../controllers/quizzes.controller');

const router = express.Router();

// Quizzes endpoints
router.get('/quizzes', quizzesController.getQuizzes);
router.get('/quizzes/:id', quizzesController.getQuiz);
router.post('/quizzes', quizzesController.postQuiz);
router.put('/quizzes/:id', quizzesController.putQuiz);
router.delete('/quizzes/:id', quizzesController.deleteQuizById);
module.exports = router;
