#!/bin/bash

# This sciprt is the start the backend in production mode.

# Procedures to close the server.
closeServer() {
    
    docker compose down

    exit 0
}

# Call the function to start the procedure to close the server
trap closeServer SIGINT

# Start postgreSQL.

cd dockerCompose || exit 1

docker compose -f docker-compose.yml up || exit 1