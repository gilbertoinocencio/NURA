import React, { useState } from 'react';
import { AppView } from '../types';

interface RefinePlanProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

export const RefinePlan: React.FC<RefinePlanProps> = ({ onBack, onNavigate }) => {
  const [goal, setGoal] = useState<'maintain' | 'define' | 'gain'>('define');
  const [frequency, setFrequency] = useState(5);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-refine-bg dark:bg-refine-bg-dark font-display transition-colors duration-200 text-gray-900 dark:text-white animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center bg-transparent p-4 pb-2 justify-between sticky top-0 z-20 transition-colors duration-200 backdrop-blur-sm">
        <div 
          onClick={onBack}
          className="text-refine-primary dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer transition-opacity hover:opacity-70"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 className="text-refine-primary dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Refinando o Flow
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        
        {/* Intro */}
        <div className="px-5 pt-6 pb-2 animate-fade-in-up">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
             Ajuste seu Flow
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-relaxed pt-2">
             Nossa IA analisou seus últimos 90 dias. O algoritmo sugere um aumento de proteína para o próximo ciclo. Ajuste conforme sua preferência.
          </p>
        </div>

        {/* Goal Selector */}
        <div className="px-5 mt-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 text-[11px]">Objetivo Atual</h3>
          <div className="flex p-1 bg-white dark:bg-refine-bg-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            {['Manter', 'Definir', 'Ganhar'].map((option) => {
               const val = option === 'Manter' ? 'maintain' : option === 'Definir' ? 'define' : 'gain';
               const isSelected = goal === val;
               return (
                 <label key={option} className="flex-1 cursor-pointer">
                    <input 
                      className="peer sr-only" 
                      name="goal" 
                      type="radio" 
                      checked={isSelected}
                      onChange={() => setGoal(val as any)}
                    />
                    <div className={`flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all ${isSelected ? 'bg-refine-primary text-white shadow-md' : 'text-gray-500 dark:text-gray-400'}`}>
                        {option}
                    </div>
                 </label>
               );
            })}
          </div>
        </div>

        {/* Workout Routine */}
        <div className="px-5 mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 text-[11px]">Rotina de Treinos</h3>
          <div className="bg-refine-surface dark:bg-refine-surface-dark p-5 rounded-2xl shadow-refine-elegant border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-refine-primary">fitness_center</span>
                <span className="font-medium text-gray-900 dark:text-white">Frequência Semanal</span>
              </div>
              <span className="text-refine-primary font-bold text-lg">{frequency}x</span>
            </div>
            
            <div className="relative w-full h-6 flex items-center">
              <input 
                className="w-full z-10 range-refine" 
                max="7" 
                min="1" 
                type="range" 
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
              />
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 rounded-full"></div>
              <div 
                 className="absolute top-1/2 left-0 h-1 bg-refine-primary -translate-y-1/2 rounded-full pointer-events-none"
                 style={{ width: `${((frequency - 1) / 6) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
              <span>1x</span>
              <span>7x</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between bg-refine-surface dark:bg-refine-surface-dark p-4 rounded-2xl shadow-refine-elegant border border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a3236] transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-refine-primary/10 flex items-center justify-center text-refine-primary">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 dark:text-white">Horário Preferido</span>
                <span className="text-xs text-gray-500">Ajusta o timing dos carboidratos</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
               07:00 AM
               <span className="material-symbols-outlined text-gray-400 text-sm">edit</span>
            </div>
          </div>
        </div>

        {/* Biometrics */}
        <div className="px-5 mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 text-[11px]">Atualizar Biotipo</h3>
          <div className="flex gap-4">
            <div className="flex-1 bg-refine-surface dark:bg-refine-surface-dark p-4 rounded-2xl shadow-refine-elegant border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Peso Atual</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">72.5</span>
                <span className="text-sm text-gray-400">kg</span>
              </div>
            </div>
            <div className="flex-1 bg-refine-surface dark:bg-refine-surface-dark p-4 rounded-2xl shadow-refine-elegant border border-gray-100 dark:border-gray-800 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-4 -top-4 size-16 bg-refine-primary/10 rounded-full blur-xl"></div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Gordura Corporal</span>
              <div className="flex items-baseline gap-1 relative z-10">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">18</span>
                <span className="text-sm text-gray-400">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Preview */}
        <div className="px-5 mt-8 mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-refine-surface dark:bg-refine-surface-dark rounded-[2rem] p-6 shadow-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-refine-primary/5 to-transparent opacity-50 dark:opacity-20 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preview do Plano</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-refine-primary/10 px-2 py-1 text-xs font-bold text-refine-primary tracking-wide">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                IA OTIMIZADA
              </span>
            </div>

            <div className="text-center mb-8 relative z-10">
              <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Meta Diária</span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-[3.5rem] leading-none font-black text-gray-900 dark:text-white tracking-tight">2,450</span>
                <div className="flex flex-col items-start justify-center h-full pt-3">
                  <span className="text-[10px] font-bold text-gray-400">KCAL</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 relative z-10">
              {/* Protein */}
              <div className="flex flex-col items-center">
                <div className="relative size-14 mb-2">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-gray-100 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                    <path className="text-refine-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-refine-primary text-xl">egg_alt</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">180g</span>
                <span className="text-xs font-medium text-gray-400">Proteína</span>
              </div>

              {/* Carbs */}
              <div className="flex flex-col items-center">
                <div className="relative size-14 mb-2">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-gray-100 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                    <path className="text-refine-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="55, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-refine-secondary text-xl">rice_bowl</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">220g</span>
                <span className="text-xs font-medium text-gray-400">Carbo</span>
              </div>

              {/* Fats */}
              <div className="flex flex-col items-center">
                <div className="relative size-14 mb-2">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-gray-100 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                    <path className="text-refine-accent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="30, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-refine-accent text-xl">water_drop</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">65g</span>
                <span className="text-xs font-medium text-gray-400">Gordura</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-10 pb-8 z-30">
        <button 
           onClick={() => onNavigate(AppView.PLAN)} // Reusing PLAN for now as the destination
           className="w-full bg-refine-primary hover:bg-refine-primary-hover active:scale-[0.98] transition-all duration-200 text-white font-bold text-lg rounded-xl py-4 shadow-refine-button flex items-center justify-center gap-3 border border-white/10"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          Gerar Plano (90 Dias)
        </button>
      </div>

    </div>
  );
};