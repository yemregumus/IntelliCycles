#!/bin/bash

# CI: Backend

cd Backend || exit 1

npm install

npm run dev & || exit 1

npm test || exit 1