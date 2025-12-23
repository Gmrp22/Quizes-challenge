
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizzes } from "../../hooks/useQuizzes";

const SkeletonCard = () => (
	<div className="animate-pulse bg-gray-100 rounded-lg p-6 shadow-md flex flex-col gap-4">
		<div className="h-6 bg-gray-200 rounded w-2/3"></div>
		<div className="h-4 bg-gray-200 rounded w-1/2"></div>
		<div className="h-10 bg-gray-200 rounded w-full mt-2"></div>
	</div>
);

const Home = () => {
	const navigate = useNavigate();
	const { quizzes, loading, error, fetchQuizzes } = useQuizzes();

	useEffect(() => {
		fetchQuizzes();
	}, [fetchQuizzes]);

	return (
		<div className="max-w-3xl mx-auto py-10 px-4">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-2 text-primary">AI Development Quiz App</h1>
				<p className="text-gray-600">
					Test and reinforce your understanding of AI software development concepts. Choose a quiz below to get started!
				</p>
			</div>
			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[...Array(4)].map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
			)}
			{error && (
				<div className="text-red-500 text-center mb-4">{error}</div>
			)}
			{!loading && !error && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{quizzes.length === 0 ? (
						<div className="col-span-2 text-center text-gray-500">No quizzes available.</div>
					) : (
						quizzes.map((quiz) => (
							<div
								key={quiz.id}
								className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between"
							>
								<div>
									<h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
									<p className="text-gray-600 mb-4">{quiz.description}</p>
								</div>
								<button
									className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
									onClick={() => navigate(`/quiz/${quiz.id}`)}
								>
									Start Quiz
								</button>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
