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
