
## Introduction
This web application is designed to facilitate online project management and collaboration. It aims to provide users with tools for task tracking, team communication, and project planning, ensuring a seamless experience.

## Prerequisites
Before setting up the project, ensure you have the following software and tools installed:
- **Node.js**: The runtime environment for executing JavaScript code server-side. [Installation guide](https://nodejs.org/)

## Dependencies and Libraries
Below is a list of essential packages used in this project, as specified in `./package.json`:

### Dependencies
- **express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model application data.

### DevDependencies
- **nodemon**: A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Installation
Follow these steps to set up the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mathewchris96-complete.git
   ```

2. **Install Node.js** (if not already installed): Follow the [Node.js installation guide](https://nodejs.org/).

3. **Install project dependencies**:
   Navigate to the project directory and run:
   ```bash
   npm install
   ```

## Configuration
To configure the environment, follow these steps:

1. Copy the example environment file:
   ```bash
   cp ./env.example ./env
   ```

2. Modify the `.env` file with appropriate values:
   - `PORT`: The port number on which the server will run.
   - `DB_CONNECTION_STRING`: The connection string for the MongoDB database.
   - `SESSION_SECRET`: A secret key for session management.

## Running the Project
To start the server, use the following command:
```bash
npm start
```
This command will execute the script defined in `./package.json`. Check `./server.js` for the default port and basic server behavior.

## Additional npm Scripts
The project includes additional npm scripts for various tasks:

- **Testing**: Run tests using:
  ```bash
  npm test
  ```

- **Development**: Start the server with automatic restarts on file changes using:
  ```bash
  npm run dev
  ```

Ensure you explore `./package.json` for more scripts and their usage.

## Conclusion
This documentation provides a comprehensive guide to setting up and running the web application. Ensure all instructions are followed accurately for a successful setup.