#!/bin/bash

# Update package list
# apt-get update
# if [ $? -ne 0 ]; then
#   echo "Failed to update package list"
#   exit 1
# fi

# Install Node.js and npm
# apt-get install -y nodejs npm
# if [ $? -ne 0 ]; then
#   echo "Failed to install Node.js and npm"
#   exit 1
# fi

# Install nodemon globally
npm install -g nodemon
if [ $? -ne 0 ]; then
  echo "Failed to install nodemon"
  exit 1
fi

# Install pm2 globally
npm install -g pm2
if [ $? -ne 0 ]; then
  echo "Failed to install pm2"
  exit 1
fi

# Verify installations
nodemon -v
if [ $? -ne 0 ]; then
  echo "Nodemon installation verification failed"
  exit 1
fi

pm2 -v
if [ $? -ne 0 ]; then
  echo "PM2 installation verification failed"
  exit 1
fi

echo "Nodemon and PM2 installed successfully"
exit 0