// src/components/PrivateRoute.tsx
import React from 'react'; // Ajoute cet import
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// On utilise React.ReactNode au lieu de JSX.Element
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-blue-600 font-bold animate-pulse">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // On redirige vers "/" (ton login) si pas connecté
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // On caste en JSX.Element pour faire plaisir à TS si besoin
  return <>{children}</>;
}

export default PrivateRoute;