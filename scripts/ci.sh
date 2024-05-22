#!/bin/bash

// CI: Backend

cd backend || exit 1

npm install

npm test || exit 1