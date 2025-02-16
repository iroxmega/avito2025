import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-provider';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        localStorage.setItem('redirectTo', location.pathname);
        return <Navigate to="/auth" />;
    }

    return children;
};
