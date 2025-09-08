# Use Node.js lightweight image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy rest of the code
COPY . .

# Set default environment variables
ENV PORT=8000
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

# Expose the app port
EXPOSE 8000

# Start the app
CMD ["node", "app.js"]
