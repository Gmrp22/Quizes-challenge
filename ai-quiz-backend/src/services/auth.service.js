const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { readJson, writeJson } = require('../utils/fileHandler');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const SALT_ROUNDS = 10;

async function registerUser(username, password) {
	try {
		const users = await readJson(USERS_FILE);
		if (users.find(u => u.username === username)) {
			throw new Error('Username already exists');
		}
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const newUser = { username, password: hashedPassword };
		users.push(newUser);
		await writeJson(USERS_FILE, users);
		return { message: 'User registered successfully' };
	} catch (error) {
		console.error('Error in registerUser:', error.message);
		throw error;
	}
}

async function loginUser(username, password) {
	try {
		const users = await readJson(USERS_FILE);
		const user = users.find(u => u.username === username);
		if (!user) {
			throw new Error('Invalid username or password');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid username or password');
		}
		const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
		return { token };
	} catch (error) {
		console.error('Error in loginUser:', error.message);
		throw error;
	}
}

module.exports = {
	registerUser,
	loginUser,
};
