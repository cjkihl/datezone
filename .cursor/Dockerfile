# Base image with Bun and Node.js
FROM oven/bun:1.2.18-alpine

# Install Node.js and other development tools
RUN apk add --no-cache nodejs npm git

# Create a non-root user
RUN addgroup -g 1000 ubuntu && \
    adduser -D -s /bin/sh -u 1000 -G ubuntu ubuntu

# Set user and working directory to home
USER ubuntu
WORKDIR /home/ubuntu

# Expose common ports (optional, but useful for development)
EXPOSE 3000 5173 8080
