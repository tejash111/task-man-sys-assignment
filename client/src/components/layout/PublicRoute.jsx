import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoaderCircle } from 'lucide-react';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><LoaderCircle className='animate-spin'/></div>;
  }

  return !user ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
