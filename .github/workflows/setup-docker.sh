#!/bin/bash

set -e

echo "Updating package index..."
sudo apt-get update -y

echo "Installing Docker and Docker Compose..."
sudo apt-get install -y docker.io docker-compose

echo "Enabling Docker service..."
sudo systemctl enable dockerAdd commentMore actions
sudo systemctl start docker

docker --version

echo "Docker setup completed successfully"