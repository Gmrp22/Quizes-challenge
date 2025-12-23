# Overview
Act as a senior backend engineer. Your goal is to architect and implement an API for an AI Quiz App. This is an educational platform. We need a modular, scalable, and clean architecture.
# App Guidelines

## App Description
The AI Development Quiz App is an educational product designed to help users test and reinforce their understanding of AI software development concepts such as agent design, prompt engineering, and workflow automation. The goal is to build a small but realistic quiz platform that feels like a complete product — something that could be extended, improved, or scaled in future iterations.

## Quiz Platform
- Help users learn and test their knowledge of AI software development concepts
- Provide a smooth and engaging quiz-taking experience
- Record user progress and results over time
- Support easy expansion with new quizzes or question sets
- Demonstrate best practices in product structure, persistence, and user flow


## Required Backend Technologies
- Node.js + Express (CommonJS modules)
- REST API (Stateless)
- Persistance: Use JSON file (simulate DB). No external DB.
- Security: JWT Authentication for users and sessions. Basic security practices (e,g cors, helmet, simple password hasing with bcryp)
- Documentation: Generate a swagger documentation, a docs folder with API.md as the two type of documentations.

##  Important Considerations (MUST be included)
- Correct error handling
- Input validation
- Separation of concerns (Services, Controllers, Routes, Middlewares)



## Data Models & JSON Structures
- The application must consume data following the provided templates.
### Users (users.json)
- Structure: `{ "id": string, "username": string, "passwordHash": string }`

### Quizzes (quizzes.json) - MUST follow this template:
- Structure: 
  `{
    "id": string,
    "title": string,
    "description": string,
    "questions": [
        {
          "id": number,
          "question": string,
          "options": string[],
          "correctAnswer": number,
          "explanation": string
        }
    ]
  }`

### Scores & Attempts (attempts.json)
- Structure: `{ "id": string, "userId": string, "quizId": string, "score": number, "percentage": number, "completedAt": string }`

# Features to Implement
- **Auth**:
    - `POST /api/auth/register`: Create user and hash password.
    - `POST /api/auth/login`: Validate and return JWT.
- **Quiz Management (Full CRUD)**:
    - `GET /api/quizzes`: List all quizzes.
    - `GET /api/quizzes/:id`: Get a specific quiz.
    - `POST /api/quizzes`: Create a new quiz.
    - `PUT /api/quizzes/:id`: Update an existing quiz.
    - `DELETE /api/quizzes/:id`: Remove a quiz.
- **User Progress & Scoring**:
    - `GET /api/quizzes/highscore/:quizId`: Get user's best score for a specific quiz. High scores are calculated dynamically from stored attempts and are not persisted as a separate record.
    - `POST /api/attempts`: Request body received will be `{ quizId, score, percentage }`
    - `GET /api/attempts`: Response body received will be `{ quizId, score, percentage }`.
    - userId will not be send form the client in the request, it must be retrieved from the authenticated user.


## Output
-  Full implementation of all endpoints described above.
- Input validation and correct error and status handling.
- Initial JSON template with 3 quiz categories.
- Follo the folder structure defined below.

## Folder Structure
ai-quiz-backend/
├── package.json
├── docs/
│   └── API.md
├── src/
│   ├── app.js
│   ├── index.js
│   ├── server.js
│   ├── controllers/
│   │   ├── attempts.controller.js
│   │   ├── auth.controller.js
│   │   └── quizzes.controller.js
│   ├── data/
│   │   ├── attempts.json
│   │   ├── quizzes.json
│   │   └── users.json
│   ├── docs/
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── routes/
│   │   ├── attempts.routes.js
│   │   ├── auth.routes.js
│   │   └── quizzes.routes.js
│   ├── services/
│   │   ├── attempts.service.js
│   │   ├── auth.service.js
│   │   └── quizzes.service.js
│   └── utils/
│       ├── fileHandler.js
│       └── validator.js