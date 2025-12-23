/**
 * Validates username and password in the request body.
 * Returns an object: { valid: boolean, message?: string }
 */
function validateAuthInput({ username, password }) {
	if (!username || typeof username !== 'string' || username.trim().length < 3) {
		return { valid: false, message: 'Username is required and must be at least 3 characters.' };
	}
	if (!password || typeof password !== 'string' || password.length < 6) {
		return { valid: false, message: 'Password is required and must be at least 6 characters.' };
	}
	return { valid: true };
}

/**
 * Generates a new numeric string id based on existing quizzes array.
 */
function generateId(quizzes) {
	if (!Array.isArray(quizzes) || quizzes.length === 0) return '1';
	const ids = quizzes.map(q => parseInt(q.id, 10)).filter(Number.isFinite);
	return (Math.max(...ids, 0) + 1).toString();
}

/**
 * Validates quiz input for creation and update.
 * Returns an object: { valid: boolean, message?: string }
 */
function validateQuizInput(quiz) {
	if (!quiz || typeof quiz !== 'object') {
		return { valid: false, message: 'Quiz data is required.' };
	}
	if (!quiz.title || typeof quiz.title !== 'string' || quiz.title.trim().length < 3) {
		return { valid: false, message: 'Quiz title is required and must be at least 3 characters.' };
	}
	if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
		return { valid: false, message: 'Quiz must have at least one question.' };
	}
	// Optionally, validate each question structure here
	return { valid: true };
}

module.exports = {
	validateAuthInput,
	generateId,
	validateQuizInput,
};
