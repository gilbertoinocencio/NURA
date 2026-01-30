import React from 'react';
import { AppView } from '../types';

interface QuarterlyPlanProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

export const QuarterlyPlan: React.FC<QuarterlyPlanProps> = ({ onBack, onNavigate }) => {
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
        
        {/* Hero Stats */}
        <div className="w-full flex flex-col items-center justify-center py-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span className="text-xs font-bold uppercase tracking-wide">Otimizado: Mesomorfo</span>
          </div>
          <div className="relative flex flex-col items-center">
            <h2 className="text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-none">
              2.450
            </h2>
            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">Kcal Diárias</span>
          </div>
        </div>

        {/* Macro Cards */}
        <div className="grid grid-cols-3 gap-4 w-full mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-slate-100 dark:border-transparent">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Proteína</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">180g</span>
            <div className="h-1 w-8 bg-primary rounded-full mt-1"></div>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-slate-100 dark:border-transparent">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Carboidratos</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">240g</span>
            <div className="h-1 w-8 bg-orange-400 rounded-full mt-1"></div>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-slate-100 dark:border-transparent">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Gorduras</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">75g</span>
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
            
            {/* Phase 1 */}
            <div className="timeline-item flex gap-4 pb-8">
              <div className="flex-shrink-0 z-10">
                <div className="size-12 rounded-full bg-white dark:bg-surface-dark border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">01</span>
                </div>
              </div>
              <div className="flex-1 bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-transparent">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">Adaptação Metabólica</h4>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 uppercase">Fase 1</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Restauro do baseline metabólico com aumento gradual de calorias e foco em densidade nutricional.
                </p>
              </div>
            </div>

            {/* Phase 2 (Highlighted) */}
            <div className="timeline-item flex gap-4 pb-8">
              <div className="flex-shrink-0 z-10">
                <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </div>
              </div>
              <div className="flex-1 bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-primary/20 dark:border-primary/20 relative overflow-hidden ring-1 ring-primary/20">
                <div className="absolute -right-4 -top-4 size-20 bg-primary/5 rounded-full blur-xl"></div>
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h4 className="font-bold text-primary">Flow de Construção</h4>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-primary/10 text-primary uppercase">Foco</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">
                  Ciclagem de carboidratos alinhada aos treinos de hipertrofia. Maximização do glicogênio muscular.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="timeline-item flex gap-4">
              <div className="flex-shrink-0 z-10">
                <div className="size-12 rounded-full bg-white dark:bg-surface-dark border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">03</span>
                </div>
              </div>
              <div className="flex-1 bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-transparent">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">Consolidação</h4>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 uppercase">Fase 3</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Estabilização do peso e transição para alimentação intuitiva mantendo a composição corporal.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 p-6 z-20">
         <div className="max-w-md mx-auto">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] group">
              <span className="text-base">Ativar Plano Trimestral</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
         </div>
      </div>

    </div>
  );
};