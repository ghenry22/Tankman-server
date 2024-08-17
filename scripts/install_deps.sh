#!/bin/bash

# Update package list
# sudo apt-get update

# Install Node.js and npm
# sudo apt-get install -y nodejs npm

# Install nodemon globally
sudo npm install -g nodemon

# Install PM2 for PROD
sudp npm install -g pm2

# Verify installation
nodemon -v