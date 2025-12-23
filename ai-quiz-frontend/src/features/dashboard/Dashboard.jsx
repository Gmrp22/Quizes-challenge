
import { useEffect, useState, useMemo } from "react";
import { useAttempts } from "../../hooks/useAttempts";
import { useQuizzes } from "../../hooks/useQuizzes";

const sortOptions = [
	{ value: "date", label: "Date (Newest)" },
	{ value: "score", label: "Score (High to Low)" },
];

const Dashboard = () => {
	const { attempts, loading, error, fetchAttempts } = useAttempts();
	const { quizzes, fetchQuizzes } = useQuizzes();
	const [sortBy, setSortBy] = useState("date");

	useEffect(() => {
		fetchAttempts();
		fetchQuizzes();
	}, [fetchAttempts, fetchQuizzes]);

	const sortedAttempts = useMemo(() => {
		if (!attempts) return [];
		let arr = [...attempts];
		if (sortBy === "score") {
			arr.sort((a, b) => b.score - a.score);
		} else {
			arr.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
		}
		return arr;
	}, [attempts, sortBy]);

	const getQuizTitle = (quizId) => {
		const quiz = quizzes.find((q) => q.id === quizId);
		return quiz ? quiz.title : quizId;
	};

	return (
		<div className="max-w-3xl mx-auto py-10 px-4">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-2 text-primary">Dashboard</h1>
				<p className="text-gray-600">Review your completed quizzes and performance.</p>
			</div>
			<div className="flex justify-end mb-4">
				<label className="mr-2 font-medium">Sort by:</label>
				<select
					className="border rounded px-2 py-1"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					{sortOptions.map((opt) => (
						<option key={opt.value} value={opt.value}>{opt.label}</option>
					))}
				</select>
			</div>
			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="animate-pulse bg-gray-100 rounded-lg p-6 shadow-md h-32"></div>
					))}
				</div>
			)}
			{error && <div className="text-red-500 text-center mb-4">{error}</div>}
			{!loading && !error && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{sortedAttempts.length === 0 ? (
						<div className="col-span-2 text-center text-gray-500">No attempts found.</div>
					) : (
						sortedAttempts.map((attempt) => (
							<div key={attempt.id} className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between">
								<div>
									<h2 className="text-xl font-semibold mb-2">{getQuizTitle(attempt.quizId)}</h2>
									<div className="mb-1 text-gray-600">Score: <span className="font-bold">{attempt.score}</span></div>
									<div className="mb-1 text-gray-600">Percentage: <span className="font-bold">{attempt.percentage}%</span></div>
									<div className="mb-1 text-gray-500 text-xs">Completed: {new Date(attempt.completedAt).toLocaleString()}</div>
								</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
