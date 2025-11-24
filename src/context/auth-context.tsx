"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useData } from '@/hooks/use-data';

interface AuthContextType {
  user: User | null;
  login: (phone: string, password?: string) => Promise<boolean>;
  signup: (newUser: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dataContext = useData();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('agro-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('agro-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (phone: string, password?: string): Promise<boolean> => {
    if (!dataContext || dataContext.loading) return false;

    const foundUser = dataContext.data.users.find(
      (u) => u.phone === phone && (password ? u.password === password : true)
    );

    if (foundUser) {
      const userToStore: User = { ...foundUser };
      delete userToStore.password; 

      setUser(userToStore);
      localStorage.setItem('agro-user', JSON.stringify(userToStore));
      return true;
    }

    return false;
  }, [dataContext]);

  const signup = useCallback(async (newUser: Omit<User, 'id'>): Promise<boolean> => {
    if (!dataContext || dataContext.loading) return false;

    const existingUser = dataContext.data.users.find(u => u.phone === newUser.phone);
    if (existingUser) {
      return false; // User already exists
    }

    const newId = Math.max(0, ...dataContext.data.users.map(u => u.id)) + 1;
    const userWithId: User = { ...newUser, id: newId };

    const updatedUsers = [...dataContext.data.users, userWithId];
    dataContext.setData('users', updatedUsers);
    
    // Automatically log in the new user
    const userToStore = { ...userWithId };
    delete userToStore.password;
    setUser(userToStore);
    localStorage.setItem('agro-user', JSON.stringify(userToStore));
    
    return true;
  }, [dataContext]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('agro-user');
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
