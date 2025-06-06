#!/bin/bash

echo "Updating package index..."
sudo apt-get update -y

echo "Installing Docker and Docker Compose..."
sudo apt-get install -y docker.io docker-compose

echo "Enabling Docker service..."
systemctl enable dockerAdd commentMore actions
systemctl start docker

echo "Docker setup completed successfully"