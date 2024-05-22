# Backend - IntelliCycles, PRJ 666

# APIs

All the APIs returns an object with the same properties as described below.

{
ok: success, // will contain a boolean number indicating the success/failure of the request.
message: message, // will contain a message according to the status of the request.
body: data, // will contain the data, if requested.
};

## GET

- `/`: Health check.

**Return**: Version of the project in the body of the response.

## POST

- `/auth/register-user`: Register a new user.

**Expects**: Username and password in the body of the request object.

- `/auth/validate-user`: Validate an existing user.

**Expects**: Username and password in the body of the request object.
