const path = require('path');
const { readJson, writeJson } = require('../utils/fileHandler');
const { generateId } = require('../utils/validator');

const QUIZZES_FILE = path.join(__dirname, '../data/quizzes.json');

async function getAllQuizzes() {
	try {
		return await readJson(QUIZZES_FILE);
	} catch (error) {
		console.error('Error getting all quizzes:', error.message);
		throw new Error('Could not retrieve quizzes');
	}
}

async function getQuizById(id) {
	try {
		const quizzes = await readJson(QUIZZES_FILE);
		const quiz = quizzes.find(q => q.id === id);
		if (!quiz) throw new Error('Quiz not found');
		return quiz;
	} catch (error) {
		console.error('Error getting quiz by id:', error.message);
		throw error;
	}
}

async function createQuiz(quizData) {
	try {
		const quizzes = await readJson(QUIZZES_FILE);
		const newQuiz = { ...quizData, id: generateId(quizzes) };
		quizzes.push(newQuiz);
		await writeJson(QUIZZES_FILE, quizzes);
		return newQuiz;
	} catch (error) {
		console.error('Error creating quiz:', error.message);
		throw new Error('Could not create quiz');
	}
}

async function updateQuiz(id, updatedData) {
	try {
		const quizzes = await readJson(QUIZZES_FILE);
		const index = quizzes.findIndex(q => q.id === id);
		if (index === -1) throw new Error('Quiz not found');
		quizzes[index] = { ...quizzes[index], ...updatedData };
		await writeJson(QUIZZES_FILE, quizzes);
		return quizzes[index];
	} catch (error) {
		console.error('Error updating quiz:', error.message);
		throw error;
	}
}

async function deleteQuiz(id) {
	try {
		const quizzes = await readJson(QUIZZES_FILE);
		const index = quizzes.findIndex(q => q.id === id);
		if (index === -1) throw new Error('Quiz not found');
		const [deletedQuiz] = quizzes.splice(index, 1);
		await writeJson(QUIZZES_FILE, quizzes);
		return deletedQuiz;
	} catch (error) {
		console.error('Error deleting quiz:', error.message);
		throw error;
	}
}


module.exports = {
	getAllQuizzes,
	getQuizById,
	createQuiz,
	updateQuiz,
	deleteQuiz,
};
