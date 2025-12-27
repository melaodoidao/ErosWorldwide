# Eros API - Node.js + SQLite

FROM node:20-alpine

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source
COPY . .

# Create data directory
RUN mkdir -p /app/data

EXPOSE 3001

CMD ["npm", "start"]
