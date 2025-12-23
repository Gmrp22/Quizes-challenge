const fs = require('fs').promises;

/**
 * Reads a JSON file asynchronously and parses its content.
 * @param {string} filePath - Path to the JSON file.
 * @returns {Promise<any>} - Parsed JSON data.
 */
async function readJson(filePath) {
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error(`Error reading JSON from ${filePath}:`, error.message);
		throw error;
	}
}

/**
 * Writes data as JSON to a file asynchronously.
 * @param {string} filePath - Path to the JSON file.
 * @param {any} data - Data to write.
 * @returns {Promise<void>}
 */
async function writeJson(filePath, data) {
	try {
		const json = JSON.stringify(data, null, 2);
		await fs.writeFile(filePath, json, 'utf-8');
	} catch (error) {
		console.error(`Error writing JSON to ${filePath}:`, error.message);
		throw error;
	}
}

module.exports = {
	readJson,
	writeJson,
};
