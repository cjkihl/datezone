# Base image with Bun and Node.js
FROM oven/bun:1.2.18-alpine

# Install Node.js (latest LTS)
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies using Bun
RUN bun install

# Expose common ports
EXPOSE 3000 5173 8080
