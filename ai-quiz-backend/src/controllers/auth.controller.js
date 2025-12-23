const { registerUser, loginUser } = require('../services/auth.service');
const { validateAuthInput } = require('../utils/validator');

// POST /register
async function register(req, res, next) {
	const { username, password } = req.body;
	const validation = validateAuthInput({ username, password });
	if (!validation.valid) {
		return res.status(400).json({ error: validation.message });
	}
	try {
		const result = await registerUser(username, password);
		res.status(201).json(result);
	} catch (error) {
		if (error.message === 'Username already exists') {
			res.status(409).json({ error: error.message });
		} else {
			next(error);
		}
	}
}

// POST /login
async function login(req, res, next) {
	const { username, password } = req.body;
	const validation = validateAuthInput({ username, password });
	if (!validation.valid) {
		return res.status(400).json({ error: validation.message });
	}
	try {
		const result = await loginUser(username, password);
		res.status(200).json(result);
	} catch (error) {
		if (error.message === 'Invalid username or password') {
			res.status(401).json({ error: error.message });
		} else {
			next(error);
		}
	}
}

module.exports = {
	register,
	login,
};
