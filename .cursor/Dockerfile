# Base image with Bun and Node.js
FROM oven/bun:latest

# Install Node.js and other development tools
RUN apt-get update && apt-get install -y nodejs npm git && rm -rf /var/lib/apt/lists/*

# Create the 'developer' user that Cursor expects
RUN groupadd -g 1001 developer && \
    useradd -d /home/developer -s /bin/bash -u 1001 -g developer developer && \
    mkdir -p /home/developer && \
    chown developer:developer /home/developer

# Switch to the developer user
USER developer
WORKDIR /home/developer

# Expose common ports (optional, but useful for development)
EXPOSE 3000 5173 8080
