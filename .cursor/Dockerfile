# Base image with Bun and Node.js
FROM oven/bun:latest

# Install Node.js and other development tools
RUN apt-get update && apt-get install -y nodejs npm git && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd -g 1000 ubuntu && \
    useradd -d /home/ubuntu -s /bin/bash -u 1000 -g ubuntu ubuntu

# Set user and working directory to home
USER ubuntu
WORKDIR /home/ubuntu

# Expose common ports (optional, but useful for development)
EXPOSE 3000 5173 8080
