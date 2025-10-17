import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TaskList from './components/Tasks/TaskList';
import PrivateRoute from './components/layout/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;