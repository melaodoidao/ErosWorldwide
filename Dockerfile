# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
# Note: VITE_ variables must be present at build time
# We can pass them as ARG or assume they are in .env (which we copied)
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if we had one, but default is fine for SPA if we handle routing
# For React Router to work, we need to redirect all requests to index.html
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
