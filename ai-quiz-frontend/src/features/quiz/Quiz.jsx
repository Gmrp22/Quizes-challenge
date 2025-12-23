
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuizzes } from "../../hooks/useQuizzes";
import { useAttempts } from "../../hooks/useAttempts";

const ProgressBar = ({ current, total }) => (
	<div className="w-full bg-gray-200 rounded-full h-3 mb-4">
		<div
			className="bg-blue-600 h-3 rounded-full transition-all"
			style={{ width: `${(current / total) * 100}%` }}
		></div>
	</div>
);

const Quiz = () => {
	const { id } = useParams();
	const { quiz, loading, error, fetchQuizById } = useQuizzes();
	const { createNewAttempt } = useAttempts();
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const [correct, setCorrect] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [finished, setFinished] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [result, setResult] = useState(null);

	useEffect(() => {
		fetchQuizById(id);
		setCurrent(0);
		setSelected(null);
		setShowFeedback(false);
		setCorrect(false);
		setAnswers([]);
		setFinished(false);
		setResult(null);
	}, [id, fetchQuizById]);

	if (loading) {
		return (
			<div className="max-w-xl mx-auto py-10 px-4">
				<div className="animate-pulse h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
				<div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
				<div className="h-32 bg-gray-100 rounded mb-4"></div>
				<div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
				<div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
				<div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
				<div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
			</div>
		);
	}
	if (error) {
		return <div className="text-red-500 text-center py-10">{error}</div>;
	}
	if (!quiz || !quiz.questions) {
		return <div className="text-center py-10">Quiz not found.</div>;
	}

	const total = quiz.questions.length;
	const q = quiz.questions[current];

	const handleSelect = (idx) => {
		if (showFeedback || finished) return;
		setSelected(idx);
		setShowFeedback(true);
		const isCorrect = idx === q.correctAnswer;
		setCorrect(isCorrect);
		setAnswers((prev) => [...prev, { questionId: q.id, selected: idx, correct: isCorrect }]);
	};

	const handleNext = () => {
		setShowFeedback(false);
		setSelected(null);
		setCorrect(false);
		if (current + 1 < total) {
			setCurrent((c) => c + 1);
		} else {
			setFinished(true);
			handleFinish();
		}
	};

		const handleFinish = async () => {
			const correctCount = answers.filter((a) => a.correct).length;
			const percentage = Math.round((correctCount / total) * 100);
			setResult({ correct: correctCount, total, percentage });
			setSubmitting(true);
			try {
				await createNewAttempt({ quizId: quiz.id, score: correctCount, percentage });
			} catch {
				// Optionally handle error (e.g., show toast)
			} finally {
				setSubmitting(false);
			}
		};

	const handleRetake = () => {
		setCurrent(0);
		setSelected(null);
		setShowFeedback(false);
		setCorrect(false);
		setAnswers([]);
		setFinished(false);
		setResult(null);
	};

	return (
		<div className="max-w-xl mx-auto py-10 px-4">
			<h1 className="text-2xl font-bold mb-2 text-primary">{quiz.title}</h1>
			<p className="mb-6 text-gray-600">{quiz.description}</p>
			<ProgressBar current={finished ? total : current + 1} total={total} />
			<div className="mb-4 text-sm text-gray-500">
				Question {finished ? total : current + 1} of {total}
			</div>

			{!finished ? (
				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<div className="mb-4 font-medium text-lg">{q.question}</div>
					<div className="flex flex-col gap-3">
						{q.options.map((opt, idx) => (
							<button
								key={idx}
								className={`py-2 px-4 rounded border text-left transition
									${selected === idx
										? correct
											? "bg-green-100 border-green-400 text-green-800"
											: "bg-red-100 border-red-400 text-red-800"
										: "bg-gray-50 border-gray-200 hover:bg-blue-50"}
									${showFeedback && idx === q.correctAnswer ? "ring-2 ring-green-400" : ""}
								`}
								disabled={showFeedback}
								onClick={() => handleSelect(idx)}
							>
								{opt}
							</button>
						))}
					</div>
					{showFeedback && (
						<div className={`mt-4 p-3 rounded text-sm ${correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
							{correct ? "Correct!" : "Incorrect."} {q.explanation && <span className="ml-2">{q.explanation}</span>}
						</div>
					)}
					{showFeedback && (
						<button
							className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleNext}
						>
							{current + 1 < total ? "Next Question" : "Finish Quiz"}
						</button>
					)}
				</div>
					) : (
						<div className="bg-white rounded-lg shadow p-6 mb-6 text-center">
							<h2 className="text-xl font-semibold mb-2">Quiz Results</h2>
							<div className="mb-2">Correct Answers: <span className="font-bold">{result?.correct}</span> / {total}</div>
							<div className="mb-2">Score: <span className="font-bold">{result?.percentage}%</span></div>
							<div className="mb-4">
								{result?.percentage >= 90 ? (
									<span className="text-green-600 font-semibold">Excellent!</span>
								) : result?.percentage >= 70 ? (
									<span className="text-blue-600 font-semibold">Keep practicing!</span>
								) : (
									<span className="text-red-600 font-semibold">Needs review.</span>
								)}
							</div>
							<button
								className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={handleRetake}
								disabled={submitting}
							>
								Retake Quiz
							</button>
						</div>
					)}
		</div>
	);
};

export default Quiz;
