# Backend - IntelliCycles, PRJ 666

# APIs

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

**Return**: Version of the project in the body of the response.

## POST

### `/auth/register-user`

**Description**: Register a new user.

**Expects**: 

- Request Body: firstName, lastName, username, email, password.

### `/auth/validate-user`

**Description**: Validate a registered user.

**Expects**: 

- Request Body: username, password.

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
