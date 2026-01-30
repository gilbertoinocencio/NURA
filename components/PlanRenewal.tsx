import React, { useState } from 'react';
import { AppView } from '../types';

interface PlanRenewalProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

export const PlanRenewal: React.FC<PlanRenewalProps> = ({ onBack, onNavigate }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('aesthetic');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden shadow-2xl bg-renewal-bg dark:bg-renewal-bg-dark font-display antialiased transition-colors duration-300 text-renewal-text dark:text-white animate-fade-in">
      
      {/* Header */}
      <header className="flex items-center justify-between p-6 pt-8 pb-2 sticky top-0 z-30 bg-renewal-bg/95 dark:bg-renewal-bg-dark/95 backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
        >
          <span className="material-symbols-outlined text-renewal-text dark:text-gray-200 transition-transform group-hover:-translate-x-1">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-renewal-text-sec dark:text-gray-400">Renovação de Plano</span>
        </div>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-renewal-text dark:text-gray-200">help</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        
        {/* Hero Section */}
        <section className="px-6 pt-6 pb-4 text-center animate-fade-in-up">
          <h1 className="text-renewal-text dark:text-gray-100 text-[34px] font-light leading-[1.15] tracking-tight mb-3">
            Um novo ciclo <br/> <span className="font-bold text-renewal-primary dark:text-gray-200">começa agora.</span>
          </h1>
          <p className="text-renewal-text-sec dark:text-gray-400 text-base font-normal leading-relaxed max-w-[280px] mx-auto">
            Sua consistência no último trimestre foi inspiradora. Vamos recalibrar seu Flow.
          </p>
        </section>

        {/* Consistency Card */}
        <section className="px-6 py-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-renewal-surface dark:bg-renewal-surface-dark rounded-2xl p-6 shadow-sm border border-[#E5E0DA] dark:border-gray-800 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-renewal-primary/5 dark:bg-renewal-primary/20 rounded-full blur-2xl"></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-renewal-text-sec dark:text-gray-400 text-sm font-medium tracking-wide uppercase">Consistência</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-renewal-primary dark:text-white text-4xl font-light tracking-tighter">85%</span>
                  <span className="inline-flex items-center text-renewal-secondary dark:text-gray-300 text-sm font-bold bg-[#F0EBE6] dark:bg-white/10 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                    +5%
                  </span>
                </div>
              </div>
              {/* Ring Chart */}
              <div className="w-12 h-12 relative flex items-center justify-center">
                 <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
                    <path className="text-[#E5E0DA] dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                    <path className="text-renewal-primary" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                 </svg>
              </div>
            </div>
            
            <div className="h-px w-full bg-[#E5E0DA] dark:bg-gray-800"></div>
            
            <div className="flex justify-between items-center text-sm relative z-10">
              <span className="text-renewal-text dark:text-gray-200 font-medium">12 Semanas Concluídas</span>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-renewal-primary flex items-center justify-center border-2 border-white dark:border-renewal-surface-dark text-white shadow-sm z-20">
                  <span className="material-symbols-outlined text-[12px]">star</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#E5E0DA] dark:bg-gray-600 border-2 border-white dark:border-renewal-surface-dark z-10"></div>
                <div className="w-6 h-6 rounded-full bg-[#E5E0DA] dark:bg-gray-600 border-2 border-white dark:border-renewal-surface-dark z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Goal Section */}
        <section className="px-6 pt-6 pb-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-renewal-text dark:text-gray-100 text-lg font-bold leading-tight tracking-tight">
            Qual é o foco para o próximo capítulo?
          </h3>
        </section>

        <section className="px-6 space-y-3 pb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          
          <label className="group cursor-pointer block">
            <input 
              className="peer sr-only" 
              name="goal" 
              type="radio" 
              value="aesthetic"
              checked={selectedGoal === 'aesthetic'}
              onChange={() => setSelectedGoal('aesthetic')}
            />
            <div className="relative flex items-center p-4 rounded-xl border border-[#E5E0DA] dark:border-gray-700 bg-renewal-surface dark:bg-renewal-surface-dark transition-all duration-300 hover:border-renewal-primary/30 peer-checked:border-renewal-primary peer-checked:ring-1 peer-checked:ring-renewal-primary peer-checked:bg-[#F4F8F9] dark:peer-checked:bg-renewal-primary/10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F0EBE6] dark:bg-white/5 text-renewal-secondary dark:text-gray-300 transition-colors peer-checked:bg-renewal-primary peer-checked:text-white">
                <span className="material-symbols-outlined">spa</span>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-renewal-text dark:text-gray-100 text-base font-bold leading-snug">Estética</p>
                <p className="text-renewal-text-sec dark:text-gray-400 text-sm font-normal">Esculpir e definir</p>
              </div>
              <div className="h-5 w-5 rounded-full border-2 border-[#D1CCC5] dark:border-gray-600 peer-checked:border-renewal-primary peer-checked:bg-renewal-primary flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
              </div>
            </div>
          </label>

          <label className="group cursor-pointer block">
            <input 
              className="peer sr-only" 
              name="goal" 
              type="radio" 
              value="health"
              checked={selectedGoal === 'health'}
              onChange={() => setSelectedGoal('health')}
            />
            <div className="relative flex items-center p-4 rounded-xl border border-[#E5E0DA] dark:border-gray-700 bg-renewal-surface dark:bg-renewal-surface-dark transition-all duration-300 hover:border-renewal-primary/30 peer-checked:border-renewal-primary peer-checked:ring-1 peer-checked:ring-renewal-primary peer-checked:bg-[#F4F8F9] dark:peer-checked:bg-renewal-primary/10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F0EBE6] dark:bg-white/5 text-renewal-secondary dark:text-gray-300 transition-colors peer-checked:bg-renewal-primary peer-checked:text-white">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-renewal-text dark:text-gray-100 text-base font-bold leading-snug">Saúde</p>
                <p className="text-renewal-text-sec dark:text-gray-400 text-sm font-normal">Longevidade e equilíbrio</p>
              </div>
              <div className="h-5 w-5 rounded-full border-2 border-[#D1CCC5] dark:border-gray-600 peer-checked:border-renewal-primary peer-checked:bg-renewal-primary flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
              </div>
            </div>
          </label>

          <label className="group cursor-pointer block">
            <input 
              className="peer sr-only" 
              name="goal" 
              type="radio" 
              value="performance"
              checked={selectedGoal === 'performance'}
              onChange={() => setSelectedGoal('performance')}
            />
            <div className="relative flex items-center p-4 rounded-xl border border-[#E5E0DA] dark:border-gray-700 bg-renewal-surface dark:bg-renewal-surface-dark transition-all duration-300 hover:border-renewal-primary/30 peer-checked:border-renewal-primary peer-checked:ring-1 peer-checked:ring-renewal-primary peer-checked:bg-[#F4F8F9] dark:peer-checked:bg-renewal-primary/10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F0EBE6] dark:bg-white/5 text-renewal-secondary dark:text-gray-300 transition-colors peer-checked:bg-renewal-primary peer-checked:text-white">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-renewal-text dark:text-gray-100 text-base font-bold leading-snug">Performance</p>
                <p className="text-renewal-text-sec dark:text-gray-400 text-sm font-normal">Potência e resistência</p>
              </div>
              <div className="h-5 w-5 rounded-full border-2 border-[#D1CCC5] dark:border-gray-600 peer-checked:border-renewal-primary peer-checked:bg-renewal-primary flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
              </div>
            </div>
          </label>

        </section>
      </main>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-renewal-bg via-renewal-bg/95 to-transparent dark:from-renewal-bg-dark dark:via-renewal-bg-dark/95 pt-12">
        <button 
           onClick={() => onNavigate(AppView.REFINE_PLAN)}
           className="w-full bg-renewal-primary hover:bg-renewal-primary/90 text-white font-medium text-lg py-4 px-6 rounded-xl shadow-lg shadow-renewal-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Gerar Plano Personalizado
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

    </div>
  );
};