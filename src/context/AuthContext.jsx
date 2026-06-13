import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@oric.muet.edu.pk',
    password: 'Admin@123',
    name: 'Dr. Syed Ahmed Shah',
    role: 'Director',
    department: 'ORIC Administration',
    employeeId: 'MUET-001',
    avatar: 'SA',
  },
  {
    id: 2,
    email: 'researcher@muet.edu.pk',
    password: 'Research@123',
    name: 'Dr. Farah Naz',
    role: 'Researcher',
    department: 'Electrical Engineering',
    employeeId: 'MUET-045',
    avatar: 'FN',
  },
  {
    id: 3,
    email: 'faculty@muet.edu.pk',
    password: 'Faculty@123',
    name: 'Prof. Imran Khan',
    role: 'Faculty',
    department: 'Computer Systems Engineering',
    employeeId: 'MUET-112',
    avatar: 'IK',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 900));
    
    const found = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    setIsLoading(false);
    
    if (found) {
      const { password: _p, ...safeUser } = found;
      setUser(safeUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password. Please try again.' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const exists = MOCK_USERS.find(
      u => u.email.toLowerCase() === data.email.toLowerCase()
    );
    
    setIsLoading(false);
    
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    
    // In a real app, this would create the user via API
    const newUser = {
      id: MOCK_USERS.length + 1,
      email: data.email,
      name: data.fullName,
      role: data.role || 'Researcher',
      department: data.department,
      employeeId: data.employeeId,
      avatar: data.fullName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase(),
    };
    setUser(newUser);
    return { success: true };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
