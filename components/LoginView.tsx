import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const LoginView: React.FC = () => {
    const { signInWithGoogle, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            setError(null);
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Error signing in');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-nura-bg dark:bg-background-dark">
                <div className="w-16 h-16 border-4 border-nura-petrol dark:border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-nura-bg dark:bg-background-dark font-display">
            <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-fade-in-up">
                {/* Logo */}
                <div className="flex flex-col items-center gap-2">
                    <div className="size-20 bg-nura-petrol dark:bg-primary rounded-full flex items-center justify-center shadow-lg shadow-nura-petrol/20 dark:shadow-primary/20">
                        <span className="material-symbols-outlined text-white text-4xl">water_drop</span>
                    </div>
                    <h1 className="text-4xl font-bold text-nura-petrol dark:text-white tracking-tighter">NURA</h1>
                    <p className="text-nura-muted dark:text-slate-400 font-medium">Nutrição para o seu Flow</p>
                </div>

                {/* Action */}
                <div className="w-full flex flex-col gap-4">
                    <button
                        onClick={handleLogin}
                        className="w-full h-14 bg-white dark:bg-surface-dark border border-nura-border dark:border-white/10 rounded-xl flex items-center justify-center gap-3 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-nura-main dark:text-white font-semibold relative overflow-hidden group"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        <span>Continuar com Google</span>
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            {error}
                        </p>
                    )}
                </div>

                <p className="text-xs text-center text-nura-muted dark:text-slate-500 max-w-xs leading-relaxed">
                    Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                    <br /><br />
                    Nura usa IA para otimizar sua nutrição.
                </p>
            </div>
        </div>
    );
};
