import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            localStorage.removeItem('isAuthenticated');
        }
    }, [isAuthenticated]);

    const login = async (username: string, password: string) => {
        if (username === 'admin' && password === 'password') {
            setIsAuthenticated(true);
            const redirectTo = localStorage.getItem('redirectTo') || '/list';
            localStorage.removeItem('redirectTo');

            // Добавляем задержку перед редиректом, чтобы запрос успел выполниться
            setTimeout(() => navigate(redirectTo), 100);
        } else {
            throw new Error('Неверные учетные данные');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate('/auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
