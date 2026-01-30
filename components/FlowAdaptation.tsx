import React from 'react';
import { AppView } from '../types';

interface FlowAdaptationProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

export const FlowAdaptation: React.FC<FlowAdaptationProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col mx-auto max-w-md bg-adapt-bg dark:bg-adapt-bg-dark shadow-xl text-slate-900 dark:text-white font-display animate-fade-in">
      
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-adapt-bg/90 dark:bg-adapt-bg-dark/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <div 
          onClick={onBack}
          className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Flow Adaptation</h2>
        <div className="flex size-12 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{ fontSize: '24px' }}>settings</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4">
        
        {/* Sync Status */}
        <section className="flex flex-col gap-1 px-2 pt-2 animate-fade-in-up">
          <div className="flex items-center gap-2 text-adapt-primary mb-1">
            <span className="material-symbols-outlined filled" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>sync</span>
            <span className="text-xs font-bold uppercase tracking-wider">Sync Complete</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight leading-tight">
              Activity <br/>Detected
          </h1>
        </section>

        {/* Activity Card */}
        <section className="@container animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="group flex flex-col items-stretch justify-start rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2c33] overflow-hidden transition-transform hover:scale-[1.01] duration-300">
            {/* Map/Image Area */}
            <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div 
                 className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity group-hover:opacity-100" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuUeg5VMPFMGsggXXx3-l9ItWg35ojCZlQpuUF3UPW-W3iidkgHPveoIrgDCbQ_QywSw_dNSlbOHxK116YFiNT8TlDTbArtMPT4rbDZxAz-2XoLJca4gIxSKy_Sm_2Mv6XX2Aos1hjbml-6RoJCPszTgw0ebWqbjPkNc-7EmGBSBVR32FCc_ZEcYI894D0Dbz8Y64Oj8z19_igabBNAxvGe5_bRkrNvo9kYPdKVn8OuVSRPcFF-cf7X3aO1iSuooaRwg8JsXOUhUU")' }}
              >
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="bg-[#fc4c02] text-white p-1.5 rounded-lg flex items-center justify-center shadow-lg">
                  {/* Strava-like icon representation using text for simplicity or generic icon */}
                  <span className="text-[10px] font-bold tracking-tighter">STRAVA</span>
                </div>
                <span className="text-white font-medium text-sm drop-shadow-md">Morning Run • Rio de Janeiro</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex w-full flex-col gap-4 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Workout Type</p>
                  <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">5km Tempo Run</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Duration</p>
                  <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">32:14</p>
                </div>
              </div>
              <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-adapt-primary" style={{ fontSize: '20px' }}>local_fire_department</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold text-base">400 kcal</span>
                  <span className="text-slate-400 text-sm">burned</span>
                </div>
                <button className="flex items-center gap-1 text-adapt-primary text-sm font-bold hover:text-adapt-primary/80 transition-colors">
                  <span>Details</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Flow Ring Visualization */}
        <section className="flex flex-col items-center justify-center py-6 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Background decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-adapt-primary/10 dark:bg-adapt-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Ring Container */}
            <div className="w-full h-full rounded-full ring-gradient p-[12px] shadow-xl relative z-10">
              {/* Inner Circle (Mask) */}
              <div className="w-full h-full bg-adapt-bg dark:bg-adapt-bg-dark rounded-full flex flex-col items-center justify-center relative">
                 {/* Inner Content */}
                 <div className="flex flex-col items-center gap-1 animate-pulse">
                    <span className="material-symbols-outlined text-adapt-primary mb-1" style={{ fontSize: '32px' }}>add_circle</span>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">+400</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-widest">Kcal Added</p>
                 </div>
              </div>
            </div>
            
            {/* Decorative orbit dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
               <div className="w-4 h-4 bg-adapt-primary rounded-full shadow-[0_0_12px_rgba(17,164,212,0.8)] border-2 border-white dark:border-adapt-bg-dark"></div>
            </div>
          </div>

          <div className="mt-8 text-center px-4 max-w-xs">
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                We've added <span className="font-bold text-adapt-primary">+400kcal</span> to your flow today based on your activity intensity.
            </p>
          </div>
        </section>

        {/* Macro Distribution Breakdown */}
        <section className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {/* Carbs */}
          <div className="flex flex-col gap-2 p-3 bg-white dark:bg-[#1a2c33] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Carbs</span>
            <span className="text-xl font-bold text-adapt-brown">+50g</span>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
               <div className="h-full w-[70%] bg-adapt-brown rounded-full"></div>
            </div>
          </div>
          {/* Protein */}
          <div className="flex flex-col gap-2 p-3 bg-white dark:bg-[#1a2c33] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Protein</span>
            <span className="text-xl font-bold text-adapt-petrol dark:text-slate-300">+20g</span>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
               <div className="h-full w-[45%] bg-adapt-petrol dark:bg-slate-400 rounded-full"></div>
            </div>
          </div>
          {/* Fat */}
          <div className="flex flex-col gap-2 p-3 bg-white dark:bg-[#1a2c33] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Fat</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">+10g</span>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
               <div className="h-full w-[30%] bg-slate-900 dark:bg-white rounded-full"></div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};