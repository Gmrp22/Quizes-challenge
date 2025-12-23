const { addAttempt, getAttempts, getHighScore } = require('../services/attempts.service');

// POST /attempts
async function postAttempt(req, res, next) {
	const userId = req.user && req.user.username; // or req.user.id if JWT contains id
	const { quizId, score, percentage } = req.body;
	if (!quizId || typeof score !== 'number' || typeof percentage !== 'number') {
		return res.status(400).json({ error: 'quizId, score, and percentage are required.' });
	}
	try {
		const attempt = await addAttempt(userId, { quizId, score, percentage });
		res.status(201).json(attempt);
	} catch (error) {
		next(error);
	}
}

// GET /attempts
async function getUserAttempts(req, res, next) {
	const userId = req.user && req.user.username; // or req.user.id if JWT contains id
	try {
		const attempts = await getAttempts(userId);
		// Return only quizId, score, percentage as per requirements
		const result = attempts.map(a => ({ quizId: a.quizId, score: a.score, percentage: a.percentage }));
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}

// GET /quizzes/highscore/:quizId
async function getHighscore(req, res, next) {
	const userId = req.user && req.user.username; // or req.user.id if JWT contains id
	const { quizId } = req.params;
	try {
		const highscore = await getHighScore(userId, quizId);
		if (!highscore) {
			return res.status(404).json({ error: 'No attempts found for this quiz.' });
		}
		res.status(200).json(highscore);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	postAttempt,
	getUserAttempts,
	getHighscore,
};
