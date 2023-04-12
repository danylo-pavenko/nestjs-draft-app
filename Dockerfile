# Use official Node.js v16 image as base image
FROM node:16.14.0

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the rest of the application code to the container
COPY ./dist ./dist

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Expose port 3000 for the NestJS app
EXPOSE 5001

# Set environment variables for PostgreSQL connection
ENV PGHOST=localhost \
    PGUSER=postgres \
    PGPASSWORD=postgrespw \
    PGDATABASE=dans-app

# Create database
RUN sleep 10 && psql -U postgres -c 'CREATE DATABASE "dans-app";'
RUN psql -U postgres -d dans-app -c "INSERT INTO roles (?, ?) VALUES ('ADMIN', 'User with administrator attributes'), ('USER', 'Regular user');"

# Start the NestJS app
CMD ["npm", "run", "start:dev"]
