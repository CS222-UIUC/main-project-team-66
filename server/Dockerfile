# Development stage 
FROM node:22-alpine

# Setting the working directory inside the container
WORKDIR /app

# Installing the specific version of npm 
RUN npm install -g npm@10.9.0

# Intalling vite 
RUN npm install -g vite


# Copying package.json and package-lock.json
COPY package*.json ./

# Installing the dependencies
RUN npm install

# Copying all the files of the server
COPY . .

# port which the server runs on 
EXPOSE 8080

# Command to start the application in development mode
CMD ["npm", "run", "dev"]