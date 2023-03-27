# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular project
RUN npm run build

# Expose the port that the application will run on
EXPOSE 4200

# Start the application
CMD ["npm", "start"]