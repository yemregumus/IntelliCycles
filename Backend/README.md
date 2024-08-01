# Backend - IntelliCycles, PRJ 666

# API Documentation

All the APIs returns an object with the same properties as described below.

```
{
    ok: success, // will contain a boolean number indicating the success/failure of the request.
    message: message, // will contain a message according to the status of the request.
    body: data, // will contain the data, if requested.
};
```

## GET

### `/`

**Description**: Health check.

**Returns**: Version of the project in the body of the response.

### `/api/user/:userId`

**Description**: Get user information.

**Returns**: firstname, lastname and username of the user.

### `/api/membership/:userId`

**Description**: Get user's membership information.

**Returns**: membership type of the user.

### `/api/activity/user/:userId` or `/api/activity/user/:userId?type=:activityType`

**Description**: Get user's activities.

**Returns**: array of object having name, description, dueDateTime, reminderDatetime, color, repeatInterval, complete, startDateTime, endDateTime, streak.

### `/api/activity/:activityId`

**Description**: Get user's activity using activity id.

**Returns**: name, description, dueDateTime, reminderDatetime, color, repeatInterval, complete, startDateTime, endDateTime, streak.

### `/api/chatbot/question`

**Description**: Get all the questions for the chatbot.

**Returns**: array of question id and question.

### `/api/chatbot/answer/:questionId`

**Description**: Get answer of the question id passed.

**Returns**: answer

## POST

### `/api/auth/register-user`

**Description**: Register a new user and adds 'Free' membership type for the user.

**Expects**:

- Request Body: firstName, lastName, username, email, password, avatar.

**Returns**:

- Body: JWT Token.

### `/api/activity/:type/:userId`

**Description**: Create a new activity for the user.

**Expects**:

- Request Body: name, description, dueDateTime, reminderDatetime, color, repeatInterval, complete, startDateTime, endDateTime, streak. The data varies depending on the type of the activity.

**Returns**:

- Body: Activity Id.

### `/api/auth/validate-user`

**Description**: Validate a registered user.

**Expects**:

- Request Body: username, password.

**Returns**:

- Body: JWT Token.

### `/api/membership/:id`

**Description**: Add membership for a registered user.

**Expects**:

- Request Body: membershipType.

### `/api/chatbot/question`

**Description**: Create a new question-answer for the chatbot.

**Expects**:

- Request Body: question, answer

## PATCH

### `/api/user/:userId`

**Description**: Update the user information.

**Expects**:

- Request Body: firstName, lastName, email, avatar.

### `/api/user/password/:userId`

**Description**: Update the user password.

**Expects**:

- Request Body: oldPassword, newPassword.

### `/api/activity/:activityId`

**Description**: Update the user activity.

**Expects**:

- Request Body: All the required data according to the activity type.

## DELETE

### `/api/user/:userId`

**Description**: Delete the user.

### `/api/membership/:userId`

**Description**: Delete the membership of the user.

### `/api/activity/:activityId`

**Description**: Delete the activity of the user using activity id.

## How to run the project?

**Note**: You must be in `/Backend` directory.

### Dev mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```
