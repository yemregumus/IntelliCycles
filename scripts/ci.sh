#!/bin/bash

# CI: Backend

cd Backend || exit 1

npm install

npm run dev &

npm test || exit 1