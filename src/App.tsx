import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Planning from './pages/Planning';

function App() {
  return (
    <Router>
      <Routes>
        {/* L'adresse par défaut (http://localhost:5173/) affiche le Login */}
        <Route path="/" element={<Login />} />

        {/* L'adresse /planning affichera notre futur calendrier */}
        <Route path="/planning" element={<Planning />} />
      </Routes>
    </Router>
  );
}

export default App;