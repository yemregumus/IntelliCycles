#!/bin/bash

# This sciprt is the start the backend in development mode.

# Procedures to close the server.
closeServer() {

    echo "Close dev server."

    cd dockerCompose
    
    docker compose -f docker-compose.dev.yml down

    exit 0
}

# Call the function to start the procedure to close the server
trap closeServer SIGINT

# Start postgreSQL.

cd dockerCompose || exit 1

echo "Start PostgreSQL container."

docker compose -f docker-compose.dev.yml up --build -d || exit 1

# Start the server in 'Dev' mode.

cd ..

clear

echo "Start server in dev mode."

npm run api-dev || exit 1