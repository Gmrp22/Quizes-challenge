const path = require('path');
const { readJson, writeJson } = require('../utils/fileHandler');
const { generateId } = require('../utils/validator');

const ATTEMPTS_FILE = path.join(__dirname, '../data/attempts.json');

async function getAttempts(userId) {
	try {
		const attempts = await readJson(ATTEMPTS_FILE);
		return attempts.filter(a => a.userId === userId);
	} catch (error) {
		console.error('Error getting attempts:', error.message);
		throw new Error('Could not retrieve attempts');
	}
}

async function addAttempt(userId, { quizId, score, percentage }) {
	try {
		const attempts = await readJson(ATTEMPTS_FILE);
		const newAttempt = {
			id: generateId(attempts),
			userId,
			quizId,
			score,
			percentage,
			completedAt: new Date().toISOString(),
		};
		attempts.push(newAttempt);
		await writeJson(ATTEMPTS_FILE, attempts);
		return newAttempt;
	} catch (error) {
		console.error('Error adding attempt:', error.message);
		throw new Error('Could not add attempt');
	}
}

async function getHighScore(userId, quizId) {
	try {
		const attempts = await readJson(ATTEMPTS_FILE);
		const userAttempts = attempts.filter(a => a.userId === userId && a.quizId === quizId);
		if (userAttempts.length === 0) return null;
		// Highest score, if tie, latest completedAt
		return userAttempts.reduce((best, curr) => {
			if (!best || curr.score > best.score || (curr.score === best.score && curr.completedAt > best.completedAt)) {
				return curr;
			}
			return best;
		}, null);
	} catch (error) {
		console.error('Error getting high score:', error.message);
		throw new Error('Could not retrieve high score');
	}
}

module.exports = {
	getAttempts,
	addAttempt,
	getHighScore,
};
