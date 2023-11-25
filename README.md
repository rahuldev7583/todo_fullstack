# Todo Full Stack App

This is a full-stack Todo application built using Vite, React, Tailwind CSS for the frontend and Node.js, Express, and MongoDB for the backend.

<img src="./todo_frontend/src/assets/checklist.png" alt="logo" width="150" height="150" >

## Table of contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints) -[Configuration](#configuration)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- User Authentication: Secure user authentication system by sending verification link to email.
- CRUD Operations: Create, read, update, and delete tasks.
- Responsive Design: The frontend is built to be responsive and usable on various devices.
- Modern Stack: Utilizes Vite, React, Tailwind CSS for the frontend, and Node.js, Express, MongoDB for the backend.

## Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/rahuldev7583/todo_fullstack.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo_fullstack
   ```

3. Install dependencies:

- Frontend:

  ```bash
  cd todo_frontend
  npm install
  ```

- Backend:
  ```bash
  cd todo_backend
  npm install
  ```

4. Configure the environment variables:
   Create a .env file in the todo_frontend and todo_backend directory and add the following:

- Frontend:

      VITE_API_BASE_URI="http://localhost:3000/api"

- Backend:

      PORT=3000
      LINK="http://localhost:3000/api"
      REDIRECT_LINK="http://localhost:5173"
      DATABASE_URL=your_mongodb_connection_string
      SECRET_KEY=add_secret_key_to_verify_jsonwebtoken
      GMAIL=your_gmail
      PASSWORD=gmail_password

5. Start the applications:

- Frontend:

  ```bash
   cd todo_frontend
   npm run dev
  ```

- Backend:

  ```bash
   cd todo_backend
   npm Start
  ```

Visit http://localhost:5173 in your browser to use the Todo application

## Folder Structure

    ├── todo_fullstack_app/
      │ ├── todo_frontend/

       │ │ ├── public/

        │ │ ├── src/

            │ │ ├── assets/

            │ │ ├── component/

            │ │ └── ...

        │ │ ├── config.js

        │ │ ├── .gitignore

        │ │ ├── package.json

        │ │ └── ...

    │ ├── todo_backend/


        │ │ ├── models/

        │ │ ├── routes/

        │ │ ├── .gitignore

        │ │ ├── package.json

        │ │ ├── index.js

        │ │ ├── fetchUser.js

        │ │ └── ...

    │ └── README.md

## API Endpoints

- Frontend

  - LOGIN: `${API_BASE_URL}/auth/login`
  - SIGNUP: `${API_BASE_URL}/auth/signup`
  - VERIFY: `${API_BASE_URL}/auth/verify`
  - GET_USERNAME: `${API_BASE_URL}/auth/username`
  - GET_TASKS: `${API_BASE_URL}/tasks`
  - GET_COMPLETED_TASK: `${API_BASE_URL}/tasks/completedtask`
  - ADD_TASKS: `${API_BASE_URL}/tasks/addtask`
  - UPDATE_TASKS: `${API_BASE_URL}/tasks/taskcomplete`
  - DELETE_TASKS: `${API_BASE_URL}/tasks/deletetask`

- Backend

  - GET /api/tasks: Get all tasks.
  - GET /api/tasks/completedtask: Get completed task.
  - POST /api/tasks/addtask: Create a new task.
  - PUT /api/tasks/taskcomplete/:id: Update a task.
  - DELETE /api/tasks/deletetask/:id: Delete a task

## Configuration

- This app verify email by sending email with json token Make sure you set up your App password in google account if you're using Gmail.

## Dependencies

### Frontend Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a file
- [react](https://reactjs.org/): JavaScript library for building user interfaces
- [react-dom](https://reactjs.org/): Entry point to the DOM and server renderers for React
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): DOM bindings for React Router

### Backend Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt): Password hashing library
- [cors](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a file
- [express](https://www.npmjs.com/package/express): Web application framework for Node.js
- [express-validator](https://www.npmjs.com/package/express-validator): Middleware for input validation
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token implementation
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling for Node.js
- [nodemailer](https://www.npmjs.com/package/nodemailer): Module for sending emails

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)
