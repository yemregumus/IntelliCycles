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

## POST

### `/api/auth/register-user`

**Description**: Register a new user and adds 'Free' membership type for the user.

**Expects**:

- Request Body: firstName, lastName, username, email, password, avatar.

**Returns**:

- Body: JWT Token.

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

## PATCH

### `/api/user/:userId`

**Description**: Update the user information.

**Expects**:

- Request Body: firstName, lastName, email, avatar.

### `/api/user/password/:userId`

**Description**: Update the user password.

**Expects**:

- Request Body: oldPassword, newPassword.

## DELETE

### `/api/user/:userId`

**Description**: Delete the user.

### `/api/membership/:userId`

**Description**: Delete the membership of the user.

## Task Management

### POST /api/tasks/create

**Description:** Create a new task for a user.

**Expects:**

Request Body: `userid`, `name`, `description`, `due_date`, `reminder_datetime`, `color`, `repeat_interval`, `complete`, `start_time`, `end_time`, `streak.

**Returns:**

Body: The ID of the created task.

### GET /api/tasks/user/:userid

**Description:** Get all tasks for a specific user.

**Returns:**

Body: An array of tasks for the specified user.

### GET /api/tasks/:id

**Description:** Get a specific task by ID.

**Returns:**

Body: The task with the specified ID.

### PUT /api/tasks/:id

**Description:** Update a task with the given ID.

**Expects:**

Request Body: `name`, `description`, `due_date`, `reminder_datetime`, `color`, `repeat_interval`, `complete`, `start_time`, `end_time`, `streak.

### DELETE /api/tasks/:id

**Description:** Delete a task with the given ID.

**Returns:**

Body: A message indicating the task was successfully deleted.

## Example Response Format

**Successful Response:**

```json
{
    "ok": true,
    "message": "Task created successfully",
    "body": {
        "activityId": 123
    }
}
```

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
