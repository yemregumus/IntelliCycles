CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dateofbirth TIMESTAMP NOT NULL,
    avatar VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS membership (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    membershiptype VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES "user"(id)
    ON DELETE CASCADE
);