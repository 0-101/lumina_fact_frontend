'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';

interface UserContextType {
  user: User | null;
  users: User[];
  login: (userId: string) => void;
  logout: () => void;
  switchUser: (userId: string) => void;
  addPoints: (points: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const MockUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const login = (userId: string) => {
    const userToLogin = users.find((u) => u.id === userId);
    if (userToLogin) {
      setUser(userToLogin);
    }
  };

  const logout = () => {
    setUser(null);
  };
  
  const switchUser = (userId: string) => {
    login(userId);
  };

  const addPoints = (points: number) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      setUser(updatedUser);
      // Also update the main list of users
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  return (
    <UserContext.Provider value={{ user, users, login, logout, switchUser, addPoints }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a MockUserProvider');
  }
  return context;
};
