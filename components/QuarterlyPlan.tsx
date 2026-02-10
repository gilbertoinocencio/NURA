import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { PlanService, QuarterlyPlanData } from '../services/planService';
import { useAuth } from '../contexts/AuthContext';

interface QuarterlyPlanProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

export const QuarterlyPlan: React.FC<QuarterlyPlanProps> = ({ onBack, onNavigate }) => {
  const { user } = useAuth();
  const [plan, setPlan] = useState<QuarterlyPlanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (user) loadPlan();
  }, [user]);

  const loadPlan = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const activePlan = await PlanService.getActivePlan(user.id);
      setPlan(activePlan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!user) return;
    setGenerating(true);
    try {
      const newPlan = await PlanService.generatePlan(user.id);
      setPlan(newPlan);
    } catch (e) {
      console.error(e);
      alert("Erro ao gerar plano. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display animate-fade-in">

      {/* Header */}
      <header className="flex items-center justify-between p-6 pt-8 z-20">
        <button
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-0.5">Feed the Flow</span>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Plano Gerado IA</h1>
        </div>
        <button
          onClick={() => onNavigate(AppView.PLAN_SHARE)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300"
        >
          <span className="material-symbols-outlined text-[24px]">ios_share</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pb-32">

        {!plan ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Seu Plano Personalizado</h2>
            <p className="text-slate-500 mb-8 max-w-xs">
              A IA Nura analisará seu perfil, biotipo e objetivos para criar uma estratégia trimestral única.
            </p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-primary text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center gap-2"
            >
              {generating ? (
                <>
                  <span className="animate-spin material-symbols-outlined">sync</span>
                  Gerando Estratégia...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">bolt</span>
                  Gerar Plano Agora
                </>
              )}
            </button>
          </div>
        ) : (
          <>
            {/* Hero Stats */}
            <div className="w-full flex flex-col items-center justify-center py-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span className="text-xs font-bold uppercase tracking-wide">{plan.optimization_tag}</span>
              </div>
              <div className="relative flex flex-col items-center">
                <h2 className="text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-none">
                  {plan.calories}
                </h2>
                <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">Kcal Diárias</span>
              </div>
            </div>

            {/* Macro Cards */}
            <div className="grid grid-cols-3 gap-4 w-full mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-slate-100 dark:border-transparent">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Proteína</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{plan.macros.protein}g</span>
                <div className="h-1 w-8 bg-primary rounded-full mt-1"></div>
              </div>
              <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-slate-100 dark:border-transparent">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Carboidratos</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{plan.macros.carbs}g</span>
                <div className="h-1 w-8 bg-orange-400 rounded-full mt-1"></div>
              </div>
              <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-slate-100 dark:border-transparent">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Gorduras</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{plan.macros.fats}g</span>
                <div className="h-1 w-8 bg-purple-400 rounded-full mt-1"></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                Jornada de 3 Meses
              </h3>
              <div className="flex flex-col space-y-0">

                {plan.phases.map((phase, idx) => {
                  const isMainPhase = idx === 1; // Highlight the middle phase
                  return (
                    <div key={idx} className="timeline-item flex gap-4 pb-8">
                      <div className="flex-shrink-0 z-10">
                        {isMainPhase ? (
                          <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-[20px]">bolt</span>
                          </div>
                        ) : (
                          <div className="size-12 rounded-full bg-white dark:bg-surface-dark border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">0{idx + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className={`flex-1 bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border ${isMainPhase ? 'border-primary/20 ring-1 ring-primary/20 relative overflow-hidden' : 'border-slate-100 dark:border-transparent'}`}>
                        {isMainPhase && <div className="absolute -right-4 -top-4 size-20 bg-primary/5 rounded-full blur-xl"></div>}
                        <div className="flex justify-between items-start mb-2 relative z-10">
                          <h4 className={`font-bold ${isMainPhase ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{phase.title}</h4>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${isMainPhase ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500'}`}>{phase.tag}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </>
        )}
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 p-6 z-20">
        <div className="max-w-md mx-auto">
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] group">
            <span className="text-base">{plan ? "Ativar Plano Trimestral" : "Começar Agora"}</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>

    </div>
  );
};