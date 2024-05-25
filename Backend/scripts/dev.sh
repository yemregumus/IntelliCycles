#!/bin/bash

# This sciprt is the start the backend in development mode.

# Procedures to close the server.
closeServer() {

    cd dockerCompose
    
    docker compose down

    exit 0
}

# Call the function to start the procedure to close the server
trap closeServer SIGINT

# Start postgreSQL.

cd dockerCompose || exit 1

docker compose -f docker-compose.dev.yml up --build -d || exit 1

cd ..

clear

npm run api-dev || exit 1