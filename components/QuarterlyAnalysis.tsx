import React from 'react';
import { AppView } from '../types';

interface QuarterlyAnalysisProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

export const QuarterlyAnalysis: React.FC<QuarterlyAnalysisProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-analysis-paper dark:bg-background-dark font-inter animate-fade-in text-analysis-text dark:text-white transition-colors duration-500">
      
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-analysis-paper/95 dark:bg-background-dark/95 backdrop-blur-sm transition-colors duration-300">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-analysis-text dark:text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400">Análise Trimestral</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-analysis-text dark:text-white">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-6 pb-36 pt-2">
        
        {/* Title Block */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-up">
          <h2 className="text-4xl font-light text-analysis-primary dark:text-white tracking-tight text-center">
            90 Dias <span className="font-serif italic text-analysis-text dark:text-gray-200">de Flow</span>
          </h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-px w-6 bg-gray-300 dark:bg-gray-700"></span>
            <p className="text-slate-500 dark:text-gray-400 text-xs font-semibold tracking-wider uppercase">Out — Dez 2024</p>
            <span className="h-px w-6 bg-gray-300 dark:bg-gray-700"></span>
          </div>
        </div>

        {/* Body Evolution Chart Card */}
        <div className="animate-fade-in-up bg-white dark:bg-surface-dark rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 mb-8 relative" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Evolução Corporal</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif text-analysis-text dark:text-white">68.4</span>
                <span className="text-sm font-medium text-slate-500">kg</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button 
                onClick={() => onNavigate(AppView.VISUAL_EVOLUTION)}
                className="flex items-center gap-1.5 text-primary bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 px-3 py-1.5 rounded-full transition-colors mb-2"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                <span className="text-[10px] font-bold uppercase">Ver Fotos</span>
              </button>
              <div className="flex items-center gap-1 text-analysis-primary dark:text-primary">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                <span className="text-xs font-bold">-3.2kg</span>
              </div>
            </div>
          </div>
          
          {/* Custom SVG Chart */}
          <div className="w-full h-40 relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 150">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1F4E5F" stopOpacity="0.15"></stop>
                  <stop offset="100%" stopColor="#1F4E5F" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path 
                 className="opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]" 
                 d="M0,150 L0,40 C50,45 100,30 150,60 C200,90 250,80 300,100 L300,150 Z" 
                 fill="url(#chartGradient)"
              ></path>
              <path 
                 className="chart-path" 
                 d="M0,40 C50,45 100,30 150,60 C200,90 250,80 300,100" 
                 fill="none" 
                 stroke="#1F4E5F" 
                 strokeLinecap="round" 
                 strokeWidth="2.5"
              ></path>
              <g className="opacity-0 animate-[fadeIn_0.5s_ease-out_1.5s_forwards]">
                <circle cx="0" cy="40" fill="#fff" r="3" stroke="#1F4E5F" strokeWidth="2"></circle>
                <circle cx="150" cy="60" fill="#fff" r="3" stroke="#1F4E5F" strokeWidth="2"></circle>
                <circle className="shadow-md" cx="300" cy="100" fill="#1F4E5F" r="4" stroke="#fff" strokeWidth="2"></circle>
              </g>
            </svg>
            <div className="flex justify-between mt-3 text-[10px] text-slate-400 uppercase font-bold tracking-wide">
              <span>Out</span>
              <span>Nov</span>
              <span>Dez</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-36 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-analysis-primary dark:text-primary">calendar_month</span>
            </div>
            <div className="size-10 rounded-full bg-analysis-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-analysis-primary dark:text-primary mb-2">
              <span className="material-symbols-outlined text-xl">check_circle</span>
            </div>
            <div>
              <span className="text-3xl font-display font-semibold text-analysis-text dark:text-white">94%</span>
              <p className="text-xs font-medium text-slate-500 mt-1">% de Consistência</p>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-36 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-analysis-primary dark:text-primary">data_usage</span>
            </div>
            <div className="size-10 rounded-full bg-analysis-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-analysis-primary dark:text-primary mb-2">
              <span className="material-symbols-outlined text-xl">pie_chart</span>
            </div>
            <div>
              <span className="text-3xl font-display font-semibold text-analysis-text dark:text-white">98%</span>
              <p className="text-xs font-medium text-slate-500 mt-1">Macros Atingidos</p>
            </div>
          </div>
        </div>

        {/* Badge Card */}
        <div className="animate-fade-in-up bg-analysis-primary dark:bg-primary-dark rounded-2xl p-6 shadow-xl shadow-analysis-primary/20 dark:shadow-primary/20 mb-8 relative overflow-hidden group" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="size-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
              <span className="material-symbols-outlined text-white text-3xl filled" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">Badge de Evolução</p>
              <h3 className="text-white font-serif text-xl italic tracking-wide">Elite do Flow</h3>
              <p className="text-white/80 text-xs mt-1 font-light">Desbloqueado em 15 Dez</p>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="material-symbols-outlined text-analysis-primary dark:text-primary text-xl animate-pulse">auto_awesome</span>
            <h3 className="text-analysis-text dark:text-white font-medium text-sm uppercase tracking-wide">Insights da IA</h3>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-surface-dark dark:to-background-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative">
            <span className="absolute top-4 right-4 text-gray-200 dark:text-gray-700">
              <span className="material-symbols-outlined">format_quote</span>
            </span>
            <p className="relative z-10 text-analysis-text dark:text-gray-300 text-sm leading-relaxed font-medium">
                Impressionante. Sua estabilidade metabólica aumentou <span className="text-analysis-primary dark:text-primary font-bold">15%</span> neste trimestre. A consistência nos carboidratos complexos no almoço foi a chave para sua energia sustentada.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-0.5 w-8 bg-analysis-primary/30 dark:bg-primary/30 rounded-full"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nura Intelligence</span>
            </div>
          </div>
        </div>

      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-analysis-paper via-analysis-paper to-transparent dark:from-background-dark dark:via-background-dark pt-12 pb-8 px-6 pointer-events-none flex justify-center z-40">
        <div className="w-full max-w-md pointer-events-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button 
             onClick={() => onNavigate(AppView.PLAN_RENEWAL)}
             className="w-full bg-analysis-brown hover:bg-[#3E3028] dark:bg-primary dark:hover:bg-primary-old text-white font-semibold text-base py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] group"
          >
            <span>Novo Plano para o Próximo Trimestre</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};