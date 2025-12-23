
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthApi } from "../../hooks/useAuthApi";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [touched, setTouched] = useState(false);
	const navigate = useNavigate();
	const { loginUser, loading, error } = useAuthApi();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setTouched(true);
		if (!username || !password) return;
		const success = await loginUser(username, password);
		if (success) {
			navigate("/");
		}
	};

	return (
		<div className="max-w-md mx-auto py-10 px-4">
			<h1 className="text-2xl font-bold mb-6 text-center text-primary">Login</h1>
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
						autoComplete="current-password"
						disabled={loading}
					/>
					{touched && !password && (
						<div className="text-red-500 text-sm mt-1">Password is required</div>
					)}
				</div>
				{error && <div className="text-red-500 text-center text-sm">{error}</div>}
				<button
					type="submit"
					className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-60"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
			<div className="text-center mt-4 text-sm">
				Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
			</div>
		</div>
	);
};

export default Login;
