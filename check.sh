#!/bin/bash

echo "Sourcing NVM script..."
source ~/.nvm/nvm.sh

nvm use 18

echo "Running TypeScript compiler..."
tsc --project .

echo "Running ESLint..."
eslint .

echo "Script execution completed :)"
