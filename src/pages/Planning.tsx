import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Ajout du lien avec le cerveau de l'app

const Planning = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth(); // Récupération de la déconnexion et de l'utilisateur

    // Configuration de la grille
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const rooms = ['Salle Atlas', 'Salle Orion', 'Salle Helios', 'Salle Luna'];

    const handleLogout = () => {
        logout(); // Efface le token et l'état de connexion
        navigate('/'); // Redirige vers le login
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* --- HEADER --- */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
                <div className="flex justify-between items-center max-w-7xl mx-auto">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-blue-200 shadow-lg">
                            T
                        </div>
                        <div>
                            <span className="text-xl font-extrabold text-slate-800 block leading-none">TechSpace</span>
                            <span className="text-xs text-blue-600 font-medium">Gestion de salles</span>
                        </div>
                    </div>

                    {/* Profil et Déconnexion */}
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                            {/* On affiche le prénom/nom de l'utilisateur s'il existe, sinon un texte par défaut */}
                            <p className="text-sm font-bold text-slate-900">
                                {user ? `${user.firstname} ${user.lastname}` : 'Collaborateur'}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">
                                {user?.email || 'Session active'}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- CONTENU PRINCIPAL --- */}
            <main className="max-w-7xl mx-auto p-6">
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Planning des salles</h1>
                    <p className="text-slate-500 mt-1">Cliquez sur un créneau libre pour effectuer une réservation.</p>
                </header>

                {/* --- LA GRILLE DE RÉSERVATION --- */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="p-5 border-r border-slate-200 text-slate-400 font-bold text-xs uppercase tracking-wider w-28 bg-white">
                                        Heures
                                    </th>
                                    {rooms.map(room => (
                                        <th key={room} className="p-5 text-slate-800 font-bold text-sm border-r border-slate-100 last:border-0">
                                            {room}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map(hour => (
                                    <tr key={hour} className="border-b border-slate-100 group transition-colors">
                                        <td className="p-5 border-r border-slate-200 text-center text-sm font-bold text-slate-400 bg-slate-50/30">
                                            {hour}
                                        </td>
                                        {rooms.map(room => (
                                            <td key={`${room}-${hour}`} className="p-2 border-r border-slate-100 last:border-0">
                                                <button
                                                    onClick={() => console.log(`Réservation : ${room} à ${hour}`)}
                                                    className="w-full py-4 rounded-xl border-2 border-dashed border-slate-100 text-xs font-semibold text-slate-300 
                                     hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-inner transition-all duration-200"
                                                >
                                                    LIBRE
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Planning;