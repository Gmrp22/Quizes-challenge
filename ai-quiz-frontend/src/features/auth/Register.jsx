
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthApi } from "../../hooks/useAuthApi";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [touched, setTouched] = useState(false);
	const navigate = useNavigate();
	const { registerUser, loading, error } = useAuthApi();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setTouched(true);
		if (!username || !password || password !== confirm) return;
		const success = await registerUser(username, password);
		if (success) {
			navigate("/login");
		}
	};

	return (
		<div className="max-w-md mx-auto py-10 px-4">
			<h1 className="text-2xl font-bold mb-6 text-center text-primary">Register</h1>
			<form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
				<div>
					<label className="block mb-1 font-medium">Username</label>
					<input
						type="text"
						className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete="username"
						disabled={loading}
					/>
					{touched && !username && (
						<div className="text-red-500 text-sm mt-1">Username is required</div>
					)}
				</div>
				<div>
					<label className="block mb-1 font-medium">Password</label>
					<input
						type="password"
						className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="new-password"
						disabled={loading}
					/>
					{touched && !password && (
						<div className="text-red-500 text-sm mt-1">Password is required</div>
					)}
				</div>
				<div>
					<label className="block mb-1 font-medium">Confirm Password</label>
					<input
						type="password"
						className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
						autoComplete="new-password"
						disabled={loading}
					/>
					{touched && password !== confirm && (
						<div className="text-red-500 text-sm mt-1">Passwords do not match</div>
					)}
				</div>
				{error && <div className="text-red-500 text-center text-sm">{error}</div>}
				<button
					type="submit"
					className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-60"
					disabled={loading}
				>
					{loading ? "Registering..." : "Register"}
				</button>
			</form>
			<div className="text-center mt-4 text-sm">
				Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
			</div>
		</div>
	);
};

export default Register;
