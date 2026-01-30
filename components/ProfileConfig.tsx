import React, { useState } from 'react';

interface ProfileConfigProps {
  onBack: () => void;
  onFinish: () => void;
}

export const ProfileConfig: React.FC<ProfileConfigProps> = ({ onBack, onFinish }) => {
  const [activityLevel, setActivityLevel] = useState(2);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-[#FDFBF7] dark:bg-[#1C1917] font-display text-[#44403C] dark:text-stone-200 animate-fade-in">
      
      {/* Decorative Blur Backgrounds */}
      <div className="fixed top-[-10%] right-[-20%] w-[300px] h-[300px] bg-profile-primary/10 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-overlay"></div>
      <div className="fixed bottom-[-10%] left-[-20%] w-[250px] h-[250px] bg-stone-400/10 rounded-full blur-[60px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-overlay"></div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4 z-10 relative">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#44403C] dark:text-stone-300"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold tracking-[0.2em] text-profile-primary uppercase">Nura</span>
        </div>
        <button className="flex items-center justify-center size-10 text-profile-muted cursor-default">
          <span className="text-xs font-medium">1/3</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-8 pb-32 overflow-y-auto relative z-10">
        
        {/* Title Section */}
        <div className="mt-4 mb-10 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mb-2">Perfil Biométrico</h1>
          <p className="text-sm text-profile-muted dark:text-stone-400 font-medium leading-relaxed">
            Feed the Flow. Personalize a inteligência da NURA para o seu metabolismo.
          </p>
        </div>

        <form className="flex flex-col gap-10">
          
          {/* Biotype Selection */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-bold uppercase tracking-wider text-profile-muted dark:text-stone-500">Seu Biotipo</label>
              <button className="text-xs text-profile-primary underline decoration-profile-primary/30 underline-offset-4" type="button">Ajuda</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'ecto', title: 'Ectomorfo', desc: 'Estrutura leve, metabolismo acelerado.' },
                { id: 'meso', title: 'Mesomorfo', desc: 'Atlético, ganha músculos facilmente.', default: true },
                { id: 'endo', title: 'Endomorfo', desc: 'Estrutura larga, metabolismo lento.' }
              ].map((bio) => (
                <label key={bio.id} className="relative cursor-pointer group">
                  <input 
                    className="peer sr-only" 
                    name="biotype" 
                    type="radio" 
                    value={bio.id} 
                    defaultChecked={bio.default} 
                  />
                  <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-profile-surface transition-all duration-300 hover:border-profile-primary/50 flex items-center gap-4">
                    <div className="radio-indicator size-5 rounded-full border-2 border-stone-300 dark:border-stone-600 transition-colors shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-label text-base font-bold text-stone-900 dark:text-stone-200 transition-colors">{bio.title}</span>
                      <span className="text-xs text-profile-muted">{bio.desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Goal Selection (Horizontal Scroll) */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <label className="text-sm font-bold uppercase tracking-wider text-profile-muted dark:text-stone-500">Objetivo Principal</label>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 snap-x hide-scrollbar">
              {['Estética', 'Saúde', 'Performance'].map((goal) => (
                <label key={goal} className="cursor-pointer flex-1 min-w-[100px] snap-center">
                  <input className="peer sr-only" name="goal" type="radio" value={goal.toLowerCase()} />
                  <div className="h-12 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-profile-surface flex items-center justify-center transition-all peer-checked:bg-profile-primary peer-checked:text-white peer-checked:border-profile-primary hover:border-profile-primary/30">
                    <span className="text-sm font-semibold">{goal}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Activity Level Slider */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-bold uppercase tracking-wider text-profile-muted dark:text-stone-500">Nível de Atividade</label>
            </div>
            <div className="relative pt-6 pb-2">
              <input 
                className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-profile-primary" 
                max="3" 
                min="1" 
                step="1" 
                type="range" 
                value={activityLevel}
                onChange={(e) => setActivityLevel(Number(e.target.value))}
              />
              <div className="flex justify-between mt-4 text-xs font-medium text-profile-muted dark:text-stone-500">
                <span className={`flex flex-col items-center gap-1 transition-colors ${activityLevel === 1 ? 'text-profile-primary font-bold' : ''}`}>
                  <span>Sedentário</span>
                </span>
                <span className={`flex flex-col items-center gap-1 transition-colors ${activityLevel === 2 ? 'text-profile-primary font-bold' : ''}`}>
                  <span>Moderado</span>
                </span>
                <span className={`flex flex-col items-center gap-1 transition-colors ${activityLevel === 3 ? 'text-profile-primary font-bold' : ''}`}>
                  <span>Intenso</span>
                </span>
              </div>
            </div>
          </div>

        </form>
      </main>

      {/* Footer Actions */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent dark:from-[#1C1917] dark:via-[#1C1917] pt-12 pb-8 px-8 z-20">
        <button 
          onClick={onFinish}
          className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-profile-primary dark:hover:bg-profile-primary text-white dark:text-stone-900 font-bold h-14 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all transform active:scale-[0.98]"
        >
          <span>Calcular Macros</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>

    </div>
  );
};