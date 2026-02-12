import React from 'react';

const Login = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-blue-600 w-12 h-12 rounded-lg mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">T</span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    TechSpace Solutions
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Gestion de réservation de salles
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-xl sm:px-10 border border-slate-100">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email professionnel</label>
                            <input
                                type="email"
                                placeholder="prenom.nom@techspace.com"
                                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none transition-all"
                            />
                        </div>

                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            Se connecter
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-500">Nouveau collaborateur ?</span>
                            </div>
                        </div>
                        <button className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                            Créer un compte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;