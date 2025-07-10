
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('gemini-gram-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('gemini-gram-user');
    }
  }, []);

  const login = (username: string): boolean => {
    // In a real app, you'd verify password against a backend.
    // Here, we just find a mock user.
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('gemini-gram-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gemini-gram-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
