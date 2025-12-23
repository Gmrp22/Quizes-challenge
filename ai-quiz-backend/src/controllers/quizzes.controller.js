const {
	getAllQuizzes,
	getQuizById,
	createQuiz,
	updateQuiz,
	deleteQuiz,
} = require('../services/quizzes.service');

const { validateQuizInput } = require('../utils/validator');

// GET /quizzes
async function getQuizzes(req, res, next) {
	try {
		const quizzes = await getAllQuizzes();
		res.status(200).json(quizzes);
	} catch (error) {
		next(error);
	}
}

// GET /quizzes/:id
async function getQuiz(req, res, next) {
	try {
		const quiz = await getQuizById(req.params.id);
		res.status(200).json(quiz);
	} catch (error) {
		if (error.message === 'Quiz not found') {
			res.status(404).json({ error: error.message });
		} else {
			next(error);
		}
	}
}

// POST /quizzes
async function postQuiz(req, res, next) {
	const validation = validateQuizInput(req.body);
	if (!validation.valid) {
		return res.status(400).json({ error: validation.message });
	}
	try {
		const quiz = await createQuiz(req.body);
		res.status(201).json(quiz);
	} catch (error) {
		next(error);
	}
}

// PUT /quizzes/:id
async function putQuiz(req, res, next) {
	const validation = validateQuizInput(req.body);
	if (!validation.valid) {
		return res.status(400).json({ error: validation.message });
	}
	try {
		const quiz = await updateQuiz(req.params.id, req.body);
		res.status(200).json(quiz);
	} catch (error) {
		if (error.message === 'Quiz not found') {
			res.status(404).json({ error: error.message });
		} else {
			next(error);
		}
	}
}

// DELETE /quizzes/:id
async function deleteQuizById(req, res, next) {
	try {
		const quiz = await deleteQuiz(req.params.id);
		res.status(200).json(quiz);
	} catch (error) {
		if (error.message === 'Quiz not found') {
			res.status(404).json({ error: error.message });
		} else {
			next(error);
		}
	}
}

module.exports = {
	getQuizzes,
	getQuiz,
	postQuiz,
	putQuiz,
	deleteQuizById,
};
