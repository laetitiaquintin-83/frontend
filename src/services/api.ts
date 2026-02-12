// src/services/api.ts

// On utilise maintenant le port 5000 pour correspondre à notre serveur Node/Express
const API_URL = 'http://localhost:5000/api'; 

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options.headers as Record<string, string>) }
    });

    // On récupère les données
    const data = await response.json();

    if (!response.ok) {
      // Si le serveur répond avec une erreur (ex: 401 pour mauvais mot de passe)
      throw { status: response.status, message: data.error || 'Une erreur est survenue' };
    }

    return data;
  } catch (error: any) {
    // Si l'erreur n'a pas de status, c'est que la connexion réseau a échoué (serveur éteint ou mauvais port)
    if (!error.status) {
      throw { status: 0, message: 'Le serveur est inaccessible (Vérifiez qu\'il est lancé sur le port 5000)' };
    }
    throw error;
  }
}

export const authService = {
  login: (credentials: any) => fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  register: (userData: any) => fetchAPI('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  getProfile: () => fetchAPI('/me')
};