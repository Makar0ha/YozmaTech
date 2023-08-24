# Project Setup Guide

Hey folks! 👋 Welcome to our project. Below are the instructions to get everything up and running smoothly.

## Frontend

### Mock Server

1. **Start the Mock Server:**

   - Navigate to `fe/json-mock-api` in your terminal.
   - Run `npm i` to install dependencies.
   - If needed for specific cases, run `sudo npm install -g json-server`.
   - Launch the server with `json-server --watch src/db.json`.

2. **Client Application:**

   - Go to `fe/client` in your terminal.
   - Run `npm i` to install dependencies.
   - Initiate the client with `npm start`.
   - Access the client in your browser at [http://localhost:3001](http://localhost:3001).
   - Log in with credentials: Username - `two`, Password - `password`.

## Backend

3. **Setting Up the Backend:**

   - Navigate to the `be/` directory.
   - Execute the command `docker-compose up -d` to start the server.
   - The backend server will be accessible at [http://localhost:3003](http://localhost:3003).

## Chat Functionality

4. **Using the Chat Feature:**

   - For the chat functionality, navigate to `SimpleChat` directory.
   - Open `/a/index.html` in a browser pointed to `http://a.com` domain.
   - Similarly, open `/b/index.html` in a browser pointed to `http://b.com` domain.

Feel free to reach out if you encounter any issues or need further assistance. Have a great day!