# Task Management Application

A full-stack task management application built with MERN stack (MongoDB, Express.js, React, Node.js) that allows users to create, manage, and track their tasks with authentication and authorization.

##  Features

### Core Features
- **User Authentication**
  - User registration with email and password
  - Secure login with JWT token authentication
  - Protected routes on both frontend and backend
  - Logout functionality

- **Task Management**
  - Create tasks with title, description, priority, due date, and status
  - View tasks in Board (Kanban) or List view
  - Update task details and change status
  - Delete tasks with confirmation
  - Filter tasks by status and priority
  - Search tasks by title or description

- **Dashboard**
  - Task statistics overview
  - Total tasks count
  - Completed vs Pending tasks
  - Priority breakdown with visual indicators
  - Real-time statistics updates

### Bonus Features
- **Kanban Board View** - Drag-and-drop ready column layout
- **List View** - Table format with sortable columns
- **Modern UI/UX** - Professional black/white theme with Tailwind CSS
- **Responsive Design** - Mobile-friendly interface
- **Real-time Updates** - Automatic refresh of statistics
- **Loading States** - User feedback during async operations
- **Error Handling** - Comprehensive error messages and validation

##  Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

##  Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie handling
- **cors** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool and dev server

##  Project Structure

```
assignment/
├── server/                    # Backend
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── models/
│   │   ├── user.js           # User model
│   │   └── tasks.js          # Task model
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── tasks.js          # Task routes
│   ├── controller/
│   │   ├── authController.js # Auth logic
│   │   └── taskController.js # Task logic
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   └── errorHandler.js   # Error handling
│   ├── server.js             # Entry point
│   └── .env                  # Environment variables
│
└── client/                   # Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   ├── Tasks/
    │   │   │   ├── TaskList.jsx
    │   │   │   ├── TaskItem.jsx
    │   │   │   ├── TaskForm.jsx
    │   │   │   ├── TaskFilters.jsx
    │   │   │   ├── TaskCard.jsx
    │   │   │   ├── TaskModal.jsx
    │   │   │   ├── KanbanBoard.jsx
    │   │   │   └── Tasks.jsx
    │   │   ├── Dashboard/
    │   │   │   ├── Dashboard.jsx
    │   │   │   └── TaskStats.jsx
    │   │   └── Layout/
    │   │       ├── Navbar.jsx
    │   │       ├── Header.jsx
    │   │       ├── Sidebar.jsx
    │   │       └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

##  Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd assignment
```

### 2. Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
DB_URL=mongodb+srv://your-username:your-password@cluster.mongodb.net/taskmanager
PORT=5000
SECRET_KEY=your-jwt-secret-key-here
```

**Environment Variables Explained:**
- `DB_URL` - Your MongoDB connection string (local or Atlas)
- `PORT` - Port number for backend server (default: 5000)
- `SECRET_KEY` - Secret key for JWT token generation (use a strong random string)

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

##  API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/getuser` | Get current user | Yes |

### Task Routes (Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks for logged-in user | Yes |
| GET | `/api/tasks/stats` | Get task statistics | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: Date.now)
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  status: String (enum: ['Todo', 'In Progress', 'Completed'], default: 'Todo'),
  dueDate: Date,
  userId: ObjectId (ref: 'User', required),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

##  Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View task statistics and overview
4. **Tasks Page**: 
   - Switch between Board and List views
   - Create new tasks using the "Create Task" button
   - Edit tasks by clicking on them
   - Delete tasks using the delete button
   - Filter tasks by status and priority
   - Search tasks by title or description
5. **Logout**: Click logout in the sidebar

##  Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for authentication
- HTTP-only cookies for token storage
- Protected API routes with JWT middleware
- CORS configuration for secure cross-origin requests
- Input validation on both frontend and backend
- Error handling middleware

##  UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Styling** - Professional black/white theme with Tailwind CSS
- **Loading States** - Visual feedback during data fetching
- **Error Handling** - User-friendly error messages
- **Icons** - Lucide React icons throughout the app
- **Smooth Transitions** - Hover effects and animations
- **Empty States** - Helpful messages when no data exists

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Ensure port 5000 is not in use

**Frontend won't connect to backend:**
- Verify backend is running on port 5000
- Check CORS settings in `server/server.js`
- Ensure API base URL is correct in `client/src/services/api.js`

**Authentication issues:**
- Clear browser cookies
- Check JWT token expiration (set to 7 days)
- Verify SECRET_KEY is set in .env

##  Assumptions Made

1. Users have a valid MongoDB database (local or Atlas)
2. Node.js and npm are properly installed
3. Users will create their own `.env` file based on `.env.example`
4. JWT tokens expire after 7 days
5. All task fields are optional except title and userId
6. Users can only view/modify their own tasks
7. Date formats are handled by browser's locale settings

##  Future Enhancements

- Drag-and-drop functionality for Kanban board
- Task categories/tags
- Task comments and attachments
- Email notifications for due dates
- Task sharing between users
- Dark mode toggle
- Export tasks to CSV/PDF
- Calendar view
- Task templates
- Advanced filtering options

##  Author

**Tejash**
- GitHub: [@tejash111](https://github.com/tejash111)

##  License

This project is created as part of an assignment and is available for educational purposes.

##  Acknowledgments

- MERN Stack documentation
- Tailwind CSS for styling
- Lucide React for icons
- MongoDB Atlas for database hosting
