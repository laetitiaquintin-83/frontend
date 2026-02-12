// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Planning from './pages/Planning';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Route publique : Le Login */}
      <Route path="/" element={<Login />} />

      {/* Route protégée : Le Planning */}
      <Route 
        path="/planning" 
        element={
          <PrivateRoute>
            <Planning />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;