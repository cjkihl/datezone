# Base image with Bun and Node.js
FROM oven/bun:latest

# Install Node.js and other development tools
RUN apt-get update && apt-get install -y nodejs npm git && rm -rf /var/lib/apt/lists/*

# Switch to the existing bun user (should already exist in oven/bun image)
USER bun
WORKDIR /home/bun

# Expose common ports (optional, but useful for development)
EXPOSE 3000 5173 8080
