# AI Quiz App API Documentation

## Overview
This API allows users to register, log in, take quizzes, and track their progress. All endpoints are RESTful and require JWT authentication for protected routes.

---

## Authentication

### Register
- **POST** `/api/auth/register`
- **Body:** `{ "username": string, "password": string }`
- **Response:** `201 Created` `{ message: string }`
- **Errors:** `400`, `409`

### Login
- **POST** `/api/auth/login`
- **Body:** `{ "username": string, "password": string }`
- **Response:** `200 OK` `{ token: string }`
- **Errors:** `400`, `401`

---

## Quizzes

### List All Quizzes
- **GET** `/api/quizzes`
- **Response:** `200 OK` `[Quiz]`

### Get Quiz by ID
- **GET** `/api/quizzes/:id`
- **Response:** `200 OK` `Quiz`
- **Errors:** `404`

### Create Quiz
- **POST** `/api/quizzes`
- **Auth:** Required
- **Body:** `Quiz`
- **Response:** `201 Created` `Quiz`
- **Errors:** `400`, `401`

### Update Quiz
- **PUT** `/api/quizzes/:id`
- **Auth:** Required
- **Body:** `Quiz`
- **Response:** `200 OK` `Quiz`
- **Errors:** `400`, `401`, `404`

### Delete Quiz
- **DELETE** `/api/quizzes/:id`
- **Auth:** Required
- **Response:** `200 OK` `Quiz`
- **Errors:** `401`, `404`

### Get User Highscore for Quiz
- **GET** `/api/quizzes/highscore/:quizId`
- **Auth:** Required
- **Response:** `200 OK` `Attempt`
- **Errors:** `401`, `404`

---

## Attempts

### Submit Attempt
- **POST** `/api/attempts`
- **Auth:** Required
- **Body:** `{ "quizId": string, "score": number, "percentage": number }`
- **Response:** `201 Created` `Attempt`
- **Errors:** `400`, `401`

### Get User Attempts
- **GET** `/api/attempts`
- **Auth:** Required
- **Response:** `200 OK` `[ { "quizId": string, "score": number, "percentage": number } ]`
- **Errors:** `401`

---

## Data Models

### User
```
{
  "id": string,
  "username": string,
  "passwordHash": string
}
```

### Quiz
```
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
```

### Attempt
```
{
  "id": string,
  "userId": string,
  "quizId": string,
  "score": number,
  "percentage": number,
  "completedAt": string
}
```

---

## Error Handling
- All errors return JSON: `{ "error": string }` or `{ "error": { "message": string, "status": number } }`
- Common status codes: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `409 Conflict`, `500 Internal Server Error`

---

## Security
- JWT authentication required for all quiz management and attempt endpoints.
- Use the `Authorization: Bearer <token>` header.

---

## Try It Out
- Swagger UI available at `/api/docs`
