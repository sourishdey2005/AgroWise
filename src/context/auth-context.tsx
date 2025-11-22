"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/types';
import usersData from '@/data/users.json';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (phone: string, password?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    // In a real app, you'd have password hashing and secure checks.
    // For this mock app, we'll just check the phone number and optionally a plain-text password.
    const foundUser = usersData.users.find(
      (u) => u.phone === phone && (password ? u.password === password : true)
    );

    if (foundUser) {
      const userToStore: User = { ...foundUser };
      delete userToStore.password; // Do not store password in local storage

      setUser(userToStore);
      localStorage.setItem('agro-user', JSON.stringify(userToStore));
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('agro-user');
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
