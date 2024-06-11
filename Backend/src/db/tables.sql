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
CREATE TABLE IF NOT EXISTS userActivity (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    reminder_datetime TIMESTAMP,
    color VARCHAR(20),
    repeat_interval VARCHAR(20),
    complete BOOLEAN,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    streak INTEGER,
    FOREIGN KEY (userid) REFERENCES "user"(id)
    ON DELETE CASCADE
);

-- Function to create a new user and return the user ID
CREATE OR REPLACE FUNCTION create_user(
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    dateofbirth TIMESTAMP,
    avatar VARCHAR(255)
) RETURNS INTEGER AS $$
DECLARE
    user_id INTEGER;
BEGIN
    INSERT INTO "user" (firstname, lastname, username, email, password, dateofbirth, avatar)
    VALUES (firstname, lastname, username, email, password, dateofbirth, avatar)
    RETURNING id INTO user_id;
    RETURN user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to retrieve user information by user ID
CREATE OR REPLACE FUNCTION read_user_by_id(
    user_id INTEGER
) RETURNS TABLE (
    id INTEGER,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(255),
    email VARCHAR(255),
    dateofbirth TIMESTAMP,
    avatar VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY SELECT id, firstname, lastname, username, email, dateofbirth, avatar
    FROM "user"
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to delete a user by user ID
CREATE OR REPLACE FUNCTION delete_user(
    user_id INTEGER
) RETURNS VOID AS $$
BEGIN
    DELETE FROM "user"
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create a new membership and return the membership ID
CREATE OR REPLACE FUNCTION create_membership(
    userid INTEGER,
    membershiptype VARCHAR(255)
) RETURNS INTEGER AS $$
DECLARE
    membership_id INTEGER;
BEGIN
    INSERT INTO membership (userid, membershiptype)
    VALUES (userid, membershiptype)
    RETURNING id INTO membership_id;
    RETURN membership_id;
END;
$$ LANGUAGE plpgsql;

-- Function to retrieve memberships by user ID
CREATE OR REPLACE FUNCTION read_memberships_by_user_id(
    user_id INTEGER
) RETURNS TABLE (
    id INTEGER,
    userid INTEGER,
    membershiptype VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY SELECT id, userid, membershiptype
    FROM membership
    WHERE userid = user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update membership type by membership ID
CREATE OR REPLACE FUNCTION update_membership(
    membership_id INTEGER,
    membershiptype VARCHAR(255)
) RETURNS VOID AS $$
BEGIN
    UPDATE membership
    SET membershiptype = membershiptype
    WHERE id = membership_id;
END;
$$ LANGUAGE plpgsql;

-- Function to delete a membership by membership ID
CREATE OR REPLACE FUNCTION delete_membership(
    membership_id INTEGER
) RETURNS VOID AS $$
BEGIN
    DELETE FROM membership
    WHERE id = membership_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create a new user activity and return the activity ID
CREATE OR REPLACE FUNCTION create_user_activity(
    activity_userid INTEGER,
    activity_type VARCHAR(20),
    activity_name VARCHAR(100),
    activity_description TEXT,
    activity_due_date TIMESTAMP,
    activity_reminder_datetime TIMESTAMP,
    activity_color VARCHAR(20),
    activity_repeat_interval VARCHAR(20),
    activity_complete BOOLEAN,
    activity_start_time TIMESTAMP,
    activity_end_time TIMESTAMP,
    activity_streak INTEGER
) RETURNS INTEGER AS $$
DECLARE
    activity_id INTEGER;
BEGIN
    INSERT INTO userActivities (userid, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak)
    VALUES (activity_userid, activity_type, activity_name, activity_description, activity_due_date, activity_reminder_datetime, activity_color, activity_repeat_interval, activity_complete, activity_start_time, activity_end_time, activity_streak)
    RETURNING id INTO activity_id;
    RETURN activity_id;
END;
$$ LANGUAGE plpgsql;

-- Function to retrieve user activities by user ID
CREATE OR REPLACE FUNCTION read_user_activities_by_user_id(
    user_id INTEGER
) RETURNS TABLE (
    activity_id INTEGER,
    type VARCHAR(20),
    name VARCHAR(100),
    description TEXT,
    due_date TIMESTAMP,
    reminder_datetime TIMESTAMP,
    color VARCHAR(20),
    repeat_interval VARCHAR(20),
    complete BOOLEAN,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    streak INTEGER
) AS $$
BEGIN
    RETURN QUERY SELECT id, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak
    FROM userActivities
    WHERE userid = user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update user activity by activity ID
CREATE OR REPLACE FUNCTION update_user_activity(
    activity_id INTEGER,
    activity_type VARCHAR(20),
    activity_name VARCHAR(100),
    activity_description TEXT,
    activity_due_date TIMESTAMP,
    activity_reminder_datetime TIMESTAMP,
    activity_color VARCHAR(20),
    activity_repeat_interval VARCHAR(20),
    activity_complete BOOLEAN,
    activity_start_time TIMESTAMP,
    activity_end_time TIMESTAMP,
    activity_streak INTEGER
) RETURNS VOID AS $$
BEGIN
    UPDATE userActivities
    SET 
        type = COALESCE(activity_type, type),
        name = COALESCE(activity_name, name),
        description = COALESCE(activity_description, description),
        due_date = COALESCE(activity_due_date, due_date),
        reminder_datetime = COALESCE(activity_reminder_datetime, reminder_datetime),
        color = COALESCE(activity_color, color),
        repeat_interval = COALESCE(activity_repeat_interval, repeat_interval),
        complete = COALESCE(activity_complete, complete),
        start_time = COALESCE(activity_start_time, start_time),
        end_time = COALESCE(activity_end_time, end_time),
        streak = COALESCE(activity_streak, streak)
    WHERE id = activity_id;
END;
$$ LANGUAGE plpgsql;

-- Function to retrieve user activities by activity type and user ID
CREATE OR REPLACE FUNCTION get_user_activities_by_type(
    activity_type VARCHAR(20),
    user_id INTEGER
) RETURNS TABLE (
    activity_id INTEGER,
    userid INTEGER,
    type VARCHAR(20),
    name VARCHAR(100),
    description TEXT,
    due_date TIMESTAMP,
    reminder_datetime TIMESTAMP,
    color VARCHAR(20),
    repeat_interval VARCHAR(20),
    complete BOOLEAN,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    streak INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT activity_id, userid, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak
    FROM userActivity
    WHERE type = activity_type AND userid = user_id;
END;
$$ LANGUAGE plpgsql;



-- Function to delete a user activity by activity ID
CREATE OR REPLACE FUNCTION delete_user_activity(
    activity_id INTEGER
) RETURNS VOID AS $$
BEGIN
    DELETE FROM userActivities
    WHERE id = activity_id;
END;
$$ LANGUAGE plpgsql;
