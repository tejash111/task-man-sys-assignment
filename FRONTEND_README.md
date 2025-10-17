# Task Manager Application

A simple full-stack task management application with authentication.

## Features

✅ User Registration & Login
✅ Create, Read, Update, Delete Tasks
✅ Task Priority (Low, Medium, High)
✅ Task Status (Todo, In Progress, Completed)
✅ Due Dates
✅ Protected Routes
✅ Cookie-based Authentication

## How to Run

### Backend (Server)
1. Navigate to server folder: `cd server`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   ```
4. Start server: `npm start` or `npm run dev`

### Frontend (Client)
1. Navigate to client folder: `cd client`
2. Dependencies already installed
3. Start client: `npm run dev`
4. Open browser at: `http://localhost:5173`

## Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Dashboard**: View and manage your tasks
4. **Add Task**: Click "Add Task" button
5. **Edit Task**: Click "Edit" on any task
6. **Delete Task**: Click "Delete" on any task
7. **Logout**: Click "Logout" button

## API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/getuser` - Get current user

### Tasks (Protected)
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create task
- GET `/api/tasks/:id` - Get single task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

## Tech Stack

**Backend:**
- Node.js
- Express
- MongoDB/Mongoose
- JWT Authentication
- Cookie Parser

**Frontend:**
- React
- React Router
- Axios
- Context API for state management
