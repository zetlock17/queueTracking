import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;