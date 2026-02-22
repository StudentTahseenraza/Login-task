'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string; // Make phone optional
  role: 'patient' | 'doctor';
  avatar?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('schedula_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('schedula_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - In real app, this would be an API call
      const users = JSON.parse(localStorage.getItem('schedula_users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('schedula_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: any) => {
    try {
      const users = JSON.parse(localStorage.getItem('schedula_users') || '[]');
      
      // Check if user exists
      if (users.some((u: any) => u.email === userData.email)) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role || 'patient',
        password: userData.password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('schedula_users', JSON.stringify(users));
      
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('schedula_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schedula_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};