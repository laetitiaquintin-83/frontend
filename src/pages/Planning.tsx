import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Planning = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    // --- CONFIGURATION ---
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const rooms = ['Salle Atlas', 'Salle Orion', 'Salle Helios', 'Salle Luna'];

    // --- ÉTATS (STATES) ---
    // 1. Liste des réservations
    const [reservations, setReservations] = useState([
        { id: 1, room: 'Salle Atlas', hour: '09:00', user: 'Jean Admin' }
    ]);

    // 2. État pour la modale (null = fermé, {room, hour} = ouvert)
    const [selectedSlot, setSelectedSlot] = useState<{room: string, hour: string} | null>(null);

    // --- FONCTIONS ---
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Ouvrir la modale
    const handleOpenModal = (room: string, hour: string) => {
        setSelectedSlot({ room, hour });
    };

    // Confirmer la réservation
    const handleConfirmBooking = () => {
        if (selectedSlot) {
            const userName = user ? `${user.firstname} ${user.lastname}` : 'Utilisateur';
            
            const newBooking = {
                id: Date.now(),
                room: selectedSlot.room,
                hour: selectedSlot.hour,
                user: userName
            };
            
            setReservations([...reservations, newBooking]);
            setSelectedSlot(null); // Ferme la modale après validation
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* NAVBAR */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-blue-200 shadow-lg">
                            T
                        </div>
                        <div>
                            <span className="text-xl font-extrabold text-slate-800 block leading-none">TechSpace</span>
                            <span className="text-xs text-blue-600 font-medium">Gestion de salles</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-slate-900">
                                {user ? `${user.firstname} ${user.lastname}` : 'Chargement...'}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
                        </div>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
                            Déconnexion
                        </button>
                    </div>
                </div>
            </nav>

            {/* CONTENU PRINCIPAL */}
            <main className="max-w-7xl mx-auto p-6">
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Planning des salles</h1>
                    <p className="text-slate-500 mt-1">Réservez votre espace de travail en un clic.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="p-5 border-r border-slate-200 text-slate-400 font-bold text-xs uppercase tracking-wider w-28 bg-white">Heures</th>
                                    {rooms.map(room => (
                                        <th key={room} className="p-5 text-slate-800 font-bold text-sm border-r border-slate-100 last:border-0">{room}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map(hour => (
                                    <tr key={hour} className="border-b border-slate-100 group transition-colors">
                                        <td className="p-5 border-r border-slate-200 text-center text-sm font-bold text-slate-400 bg-slate-50/30">{hour}</td>
                                        {rooms.map(room => {
                                            const isReserved = reservations.find(res => res.room === room && res.hour === hour);
                                            
                                            return (
                                                <td key={`${room}-${hour}`} className="p-2 border-r border-slate-100 last:border-0">
                                                    {isReserved ? (
                                                        <div className="w-full py-3 px-2 rounded-xl bg-blue-100 border-2 border-blue-200 text-center animate-in fade-in duration-500">
                                                            <p className="text-[10px] font-bold text-blue-600 uppercase">Occupé</p>
                                                            <p className="text-[11px] font-extrabold text-blue-900 truncate">{isReserved.user}</p>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleOpenModal(room, hour)}
                                                            className="w-full py-4 rounded-xl border-2 border-dashed border-slate-100 text-xs font-semibold text-slate-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                                        >
                                                            LIBRE
                                                        </button>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* --- MODALE DE CONFIRMATION --- */}
            {selectedSlot && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 animate-in zoom-in duration-200">
                        <div className="text-center">
                            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl text-blue-600">📅</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">Confirmer ?</h3>
                            <p className="text-slate-500 mt-3 leading-relaxed">
                                Vous allez réserver la <span className="text-slate-900 font-bold">{selectedSlot.room}</span> à <span className="text-slate-900 font-bold">{selectedSlot.hour}</span>.
                            </p>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button 
                                onClick={() => setSelectedSlot(null)}
                                className="flex-1 px-4 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold hover:bg-slate-50 transition-all active:scale-95"
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={handleConfirmBooking}
                                className="flex-1 px-4 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
                            >
                                Réserver
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planning;