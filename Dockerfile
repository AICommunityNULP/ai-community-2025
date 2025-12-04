# Stage 1: Build stage (for future build steps if needed)
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (if any build dependencies are added in the future)
RUN npm install

# Copy application files
COPY . .

# Stage 2: Production stage with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder stage
COPY --from=builder /app/*.html /usr/share/nginx/html/
COPY --from=builder /app/*.css /usr/share/nginx/html/
COPY --from=builder /app/*.js /usr/share/nginx/html/
COPY --from=builder /app/*.json /usr/share/nginx/html/
COPY --from=builder /app/images /usr/share/nginx/html/images

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]