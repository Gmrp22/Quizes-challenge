# Overview
Act as a senior frontend engineer. Your goal is to architect and implement an React app for an AI Quiz App. This is an educational platform. We need a modular, scalable, and clean architecture. Must look professional and real.
# App Guidelines

## App Description
The AI Development Quiz App is an educational product designed to help users test and reinforce their understanding of AI software development concepts such as agent design, prompt engineering, and workflow automation. The goal is to build a small but realistic quiz platform that feels like a complete product — something that could be extended, improved, or scaled in future iterations.

## Quiz Platform
- Help users learn and test their knowledge of AI software development concepts
- Provide a smooth and engaging quiz-taking experience
- Record user progress and results over time
- Support easy expansion with new quizzes or question sets
- Demonstrate best practices in product structure, persistence, and user flow


## Core Features
### Home
- Landing page explaining what the app is and what users can do
- Show a list of all available quizzes retrieved form the API ( **GET** `/api/quizzes`)
- Each quiz has a clear "Start Quiz" buttont to start a quiz immediately.
- If user is not logged in, you MUST be redirected to login page.

### Navigation
- Simple navigation using navbar, allowing users to move between home, quiz, dashboard and results views.
- Avoid unnecesary rerenders.
- Smooth transitions between pages.

## Quiz Experience
- Each quiz consists of multiple questions (at least 5) with one correct answer for each.
- After answering, users immediately see whether they were correct and can read a short explanation.
- Display a progress indicator (e.g., "Question 3 of 10") keeps the user oriented include a progress bar.
- A "Retake Quiz" button allows users to start over once quiz is finished.
- Once a quiz is finished a new attempt must be registered via API

## Scoring & Results
- At the end of the quiz:
    - Display total correct answers and percentage.
    - Show performance feedback (e.g., "Excellent," "Keep practicing," "Needs review")
    - Store quiz results and attempts via API (**POST** `/api/attempts`)
## Dashboard
- Show completed quizzes.
- Allow users to review previous quizzes and answers retrieve from the API (**GET** `/api/attempts`)
- Provide optional filtering or sorting quizzes by completition status, score and date.

## Persistence & Data
- Quiz content is coming form the API.
- JWT token stored in localStorage.

## User Management
- User registration page
- User login form with validation and security to not show passwords in browser.



## Required Frontend Technologies
- It uses React (Functional Components) and vite
- Styling: Tailwind CSS
- Icons: Lucide-react
- State management: React Context (for Auth and quiz) and Custom Hooks (For Quiz Logic, Auth Logic)
- Routing: React Router ( include protected routes: Home, Dashboard,Quiz)
- API interaction: Axios


##  Integration with API (Mandatory)
The Frontend MUST interact with the API using these exact structures:

### Users (from users.json)
- `{ "id": string, "username": string, "passwordHash": string }`
### Quizzes (quizzes.json) - MUST follow this template:
- `[{ "id": string, "title": string, "description": string, "questions": [{ "id": number, "question": string, "options": string[], "correctAnswer": number, "explanation": string }] }]`
### Scores & Attempts (attempts.json)
- `{ "id": string, "userId": string, "quizId": string, "score": number, "percentage": number, "completedAt": string }`

## Endpoints Implementation
Implement the following RESTful calls using Axios:
- **Auth**: `POST /api/auth/register` and `POST /api/auth/login`.
- **Quiz Management**:
    - `GET /api/quizzes`: List all categories.
    - `GET /api/quizzes/:id`: Get a specific quiz.
    - `POST /api/quizzes`: Create a new quiz using the strict template.
    - `PUT /api/quizzes/:id`: Update an existing quiz.
    - `DELETE /api/quizzes/:id`: Remove a quiz.
- **User Progress & Scoring**:
    - `GET /api/quizzes/highscore/:quizId`: Get user's best score.
    - `POST /api/attempts`: Send { quizId, score, percentage } to persist a new attempt.
    - `GET /api/attempts`: received body will be: `{ quizId, score, percentage }`.

##  Important Considerations (MUST be included)
- Loading states: skeletons
- Error handling and retry for API calls
- Basic security practices (JWT expiration, input validation)
- Consistent themes: colors, typography and component style. Try to simulate a fun and modern app.
## Output
- Full responsive design
- Component architecture
- Full working Pages ( Home, Quiz, Dashboard, Login, Register)
- Working application
- API integration
- State management
- Avoid unnecesary rerenders
- Follow the app structured defined below

## Folder Structure

ai-quiz-frontend/
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── context/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   │   └── components/
│   │   ├── home/
│   │   └── quiz/
│   │       └── components/
│   ├── hooks/
│   ├── routes/
│   └── utils/

## App Flow Example
### New User
1. User registers -> API creates user
2. Redirected to login page
3. User logs in -> redirected to Home page
4. Home Page displays all quizzes with "Start Quiz" buttons.
5. Clicking "Start Quiz" buttons renders the Quiz compontent:
    1. Show progress bar and textual progress ( e.g "2/5")
    2. User selects an answer -> sees immdiate feedback
    3. Next question button appears
    4. Repeat until last question
    5. Show results: socre, percentage, amount of correct answers and retake option
6. Dashboard
- View stats for passed/failed quizzes
- Review past attempts and scores and percentages.

7. Navigation between pages should be smooth.