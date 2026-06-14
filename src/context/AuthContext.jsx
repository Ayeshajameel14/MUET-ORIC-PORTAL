import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Only official MUET email addresses are accepted (any subdomain ending in muet.edu.pk)
const MUET_EMAIL_REGEX = /^[^\s@]+@([a-zA-Z0-9-]+\.)*muet\.edu\.pk$/i;

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@oric.muet.edu.pk',
    password: 'Admin@123',
    name: 'Dr. Syed Ahmed Shah',
    role: 'Director',
    department: 'ORIC Administration',
    avatar: 'SA',
  },
  {
    id: 2,
    email: 'researcher@muet.edu.pk',
    password: 'Research@123',
    name: 'Dr. Farah Naz',
    role: 'Researcher',
    department: 'Electrical Engineering',
    avatar: 'FN',
  },
  {
    id: 3,
    email: 'faculty@muet.edu.pk',
    password: 'Faculty@123',
    name: 'Prof. Imran Khan',
    role: 'Faculty',
    department: 'Computer Systems Engineering',
    avatar: 'IK',
  },
  {
    id: 4,
    email: '23sw155@students.muet.edu.pk',
    password: 'Student@123',
    name: 'Ayesha Jameel',
    role: 'Student',
    department: 'Software Engineering',
    avatar: 'AJ',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // In-memory store of generated reset codes, for the demo "forgot password" flow
  const [resetCodes, setResetCodes] = useState({});

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
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

    if (!MUET_EMAIL_REGEX.test(data.email)) {
      setIsLoading(false);
      return { success: false, error: 'Only official MUET email addresses (ending in muet.edu.pk) are accepted.' };
    }

    const exists = MOCK_USERS.find(
      u => u.email.toLowerCase() === data.email.toLowerCase()
    );

    setIsLoading(false);

    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: MOCK_USERS.length + 1,
      email: data.email,
      password: data.password,
      name: data.fullName,
      role: data.role || 'Researcher',
      department: data.department,
      avatar: data.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    };
    MOCK_USERS.push(newUser);

    const { password: _p, ...safeUser } = newUser;
    setUser(safeUser);
    return { success: true };
  }, []);

  // Step 1 of "forgot password": verify the email belongs to a registered MUET account
  const requestPasswordReset = useCallback(async (email) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!MUET_EMAIL_REGEX.test(email)) {
      setIsLoading(false);
      return { success: false, error: 'Only official MUET email addresses (ending in muet.edu.pk) are accepted.' };
    }

    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    setIsLoading(false);

    if (!found) {
      return { success: false, error: 'No account found with this email address.' };
    }

    // Generate a 6-digit reset code (in production this would be emailed by the server)
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setResetCodes(prev => ({ ...prev, [email.toLowerCase()]: code }));

    return { success: true, code };
  }, []);

  // Step 2 of "forgot password": verify code and set new password
  const resetPassword = useCallback(async (email, code, newPassword) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const expected = resetCodes[email.toLowerCase()];
    if (!expected || expected !== code) {
      setIsLoading(false);
      return { success: false, error: 'The verification code is incorrect or has expired.' };
    }

    const idx = MOCK_USERS.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) {
      setIsLoading(false);
      return { success: false, error: 'Account not found.' };
    }

    MOCK_USERS[idx].password = newPassword;
    setResetCodes(prev => {
      const next = { ...prev };
      delete next[email.toLowerCase()];
      return next;
    });

    setIsLoading(false);
    return { success: true };
  }, [resetCodes]);

  // Change password while logged in
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!user) {
      setIsLoading(false);
      return { success: false, error: 'You must be signed in to change your password.' };
    }

    const idx = MOCK_USERS.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (idx === -1 || MOCK_USERS[idx].password !== currentPassword) {
      setIsLoading(false);
      return { success: false, error: 'Current password is incorrect.' };
    }

    MOCK_USERS[idx].password = newPassword;
    setIsLoading(false);
    return { success: true };
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user, isLoading, login, logout, register,
      requestPasswordReset, resetPassword, changePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
