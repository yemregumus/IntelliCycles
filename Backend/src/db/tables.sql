-- Create the "user" table to store user information
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

-- Create the "membership" table to store membership information
CREATE TABLE IF NOT EXISTS membership (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL UNIQUE,
    membershiptype VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES "user"(id)
    ON DELETE CASCADE
);

-- Create the "userActivities" table to store user activities
CREATE TABLE IF NOT EXISTS useractivity (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    due_datetime TIMESTAMP,
    reminder_datetime TIMESTAMP,
    color VARCHAR(20),
    repeat_interval VARCHAR(20),
    complete BOOLEAN,
    streak INTEGER,
    start_datetime TIMESTAMP,
    end_datetime TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES "user"(id)
    ON DELETE CASCADE
);

-- Create the "chatBotQuestion" table to store user activities
CREATE TABLE IF NOT EXISTS chatBotQuestion (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);