Please use my prompt and generate a step by step guide for me to implement this project using github copilot



## Data Models & JSON Structures
- The application must consume data following the provided template.
### Users (users.json)
- Structure: `{ "id": string, "username": string, "passwordHash": string }`

### Quizzes (quizzes.json) - MUST follow this template:
- Structure: 
  {
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
  }

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
    - `GET /api/quizzes/highscore/:quizId`: Get user's best score for a specific quiz.     - High scores are calculated dynamically from stored attempts and are not persisted as a separate record.
    - `POST /api/attempts`: Request body received will be `{ quizId, score, percentage }`
    - `GET /api/attempts`: Request body received will be `{ quizId, score, percentage }`.
    - userId will not be send form the client in the request, it must be retrieved from the authenticated user.



FRONTEND


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