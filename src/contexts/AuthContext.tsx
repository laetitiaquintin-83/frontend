// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/api';

// On définit la forme des données pour TypeScript
interface AuthContextType {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Au chargement de l'app, on regarde si on a déjà un badge (token)
    const token = localStorage.getItem('token');
    if (token) {
      authService.getProfile()
        .then(data => setUser(data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('token', data.token); // On enregistre le badge
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token'); // On jette le badge
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, 
      loading, 
      isAuthenticated: !!user,
      login, 
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}