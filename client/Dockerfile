# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . . 

# Expose the port that the React app runs on
EXPOSE 5173

# Command to start the React app in development mode
CMD ["npm", "run", "dev"]

