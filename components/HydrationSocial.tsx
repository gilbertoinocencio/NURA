import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface HydrationSocialProps {
  onBack: () => void;
}

type TemplateStyle = 'Photo' | 'Gradient' | 'Minimal' | 'Dark';
type ViewOption = 'Meta' | 'Frase';

export const HydrationSocial: React.FC<HydrationSocialProps> = ({ onBack }) => {
  const [template, setTemplate] = useState<TemplateStyle>('Gradient');
  const [viewOption, setViewOption] = useState<ViewOption>('Meta');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
      });
      const link = document.createElement('a');
      link.download = `nura-hydration-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Template Styles Configuration
  const getTemplateStyles = (type: TemplateStyle) => {
    switch (type) {
      case 'Photo':
        return {
          bg: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChM2tXonuf-O9q5XBChK6E-si0BUZmrZy06Bv40sCpK_ttBtqEm2xrSKVxdrR4na08ye1CY29Sq5K6y9B9lUVYUNvqKSR2_I1-ZTCwov4gJPFH9REtUZoORr4km3DYK38qqQLmebKLdKLmfNa1T1XGUFiFqzHzoJI9gNUuhgZhC00ncrmngemBabk7pt3qw3dBWxchcVy9KV6dI0ggrZT1FaKIVe1byFI6GGZTQDQ41D2dvtpvvZxTKCe9Prnb4z96xR6VeTKM6gA')",
          overlay: "bg-black/40",
          text: "text-white",
          subtext: "text-white/80",
          accent: "text-white",
          iconFill: "white",
          iconStroke: "white"
        };
      case 'Gradient':
        return {
          bg: "linear-gradient(135deg, #103e4a 0%, #487380 50%, #eaddcf 100%)",
          overlay: "bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 mix-blend-overlay",
          text: "text-white",
          subtext: "text-white/80",
          accent: "text-white",
          iconFill: "white",
          iconStroke: "white"
        };
      case 'Minimal':
        return {
          bg: "#ffffff",
          overlay: "",
          text: "text-[#181411]",
          subtext: "text-[#897561]",
          accent: "text-hydro-primary",
          iconFill: "#d47311",
          iconStroke: "#d47311"
        };
      case 'Dark':
        return {
          bg: "#103e4a",
          overlay: "",
          text: "text-white",
          subtext: "text-white/60",
          accent: "text-hydro-beige",
          iconFill: "#eaddcf",
          iconStroke: "#eaddcf"
        };
    }
  };

  const currentStyles = getTemplateStyles(template);

  const WaterIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
    <svg className="drop-shadow-sm" fill="none" height="30" viewBox="0 0 20 28" width="22" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M2.5 2V18C2.5 22.1421 5.85786 25.5 10 25.5C14.1421 25.5 17.5 22.1421 17.5 18V2H2.5Z" 
        fill={filled ? currentStyles.iconFill : 'none'}
        stroke={!filled ? currentStyles.iconStroke : 'none'}
        strokeWidth={!filled ? "1.5" : "0"}
        strokeOpacity={!filled ? "0.7" : "1"}
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f7f6] dark:bg-[#221910] text-[#181411] dark:text-[#f8f7f6] flex flex-col font-spline animate-fade-in">
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 sticky top-0 z-20 bg-[#f8f7f6]/95 dark:bg-[#221910]/95 backdrop-blur-sm transition-colors border-b border-black/5 dark:border-white/5">
        <button 
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#181411] dark:text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Hidratação Social</h1>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-md mx-auto px-4 pb-28 overflow-y-auto no-scrollbar">
        
        {/* Title */}
        <div className="py-4 text-center">
          <h2 className="text-[#181411] dark:text-[#f8f7f6] tracking-tight text-2xl font-bold leading-tight">Acompanhe o Fluxo</h2>
          <p className="text-sm text-[#897561] dark:text-[#b09b85] mt-1">Compartilhe sua meta diária de água</p>
        </div>

        {/* Card Preview */}
        <div 
          ref={cardRef}
          className="w-full relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 group mb-6 transition-all duration-300"
        >
          {/* Background */}
          <div 
             className="absolute inset-0 bg-cover bg-center transition-all duration-500"
             style={{ background: currentStyles.bg }}
          ></div>
          <div className={`absolute inset-0 ${currentStyles.overlay}`}></div>

          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
            <div className="flex-1"></div>
            
            <div className="flex flex-col items-center w-full gap-8">
              {viewOption === 'Meta' && (
                <div className="text-center">
                  <p className={`text-xs font-bold tracking-[0.2em] uppercase opacity-70 mb-3 ${currentStyles.subtext}`}>Meta de hoje</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <h3 className={`text-[56px] font-light leading-none tracking-tight drop-shadow-sm ${currentStyles.text}`}>2.5L</h3>
                    <span className={`text-3xl font-light opacity-50 leading-none ${currentStyles.subtext}`}>/ 3.0L</span>
                  </div>
                </div>
              )}

              {/* Water Visuals */}
              <div className="flex items-center gap-3">
                 {[1,2,3,4,5].map(i => <WaterIcon key={i} filled={true} />)}
                 <WaterIcon filled={false} />
              </div>

              {(viewOption === 'Frase' || viewOption === 'Meta') && (
                <div className="mt-4 text-center">
                  <p className={`font-display text-xl italic font-light tracking-wide opacity-90 drop-shadow-sm ${currentStyles.text}`}>
                    "Stay fluid. Keep the flow."
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1"></div>
            
            <div className="w-full flex justify-center items-end pb-2">
              <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${currentStyles.subtext} opacity-60`}>NURA — Feed the Flow</span>
            </div>
          </div>
        </div>

        {/* View Options */}
        <div className="flex justify-between items-center mb-6 px-1">
          <span className="text-sm font-semibold text-[#181411] dark:text-white">Opções de visualização</span>
          <div className="flex bg-white dark:bg-[#2c241b] rounded-full p-1 shadow-sm border border-black/5 dark:border-white/5">
            <button 
              onClick={() => setViewOption('Meta')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${viewOption === 'Meta' ? 'bg-hydro-primary text-white shadow-sm' : 'text-[#897561] hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined text-[18px]">water_drop</span>
              <span className="text-xs font-bold">Meta</span>
            </button>
            <button 
              onClick={() => setViewOption('Frase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${viewOption === 'Frase' ? 'bg-hydro-primary text-white shadow-sm' : 'text-[#897561] hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined text-[18px]">format_quote</span>
              <span className="text-xs font-medium">Frase</span>
            </button>
          </div>
        </div>

        {/* Template Style Selector */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <span className="text-sm font-semibold text-[#181411] dark:text-white">Estilo do Template</span>
            <span className="text-xs text-hydro-primary font-medium cursor-pointer">Ver todos</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x no-scrollbar">
            {/* Photo Option */}
            <div onClick={() => setTemplate('Photo')} className="snap-center shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`relative w-20 h-32 rounded-xl border overflow-hidden transition-all active:scale-95 ${template === 'Photo' ? 'border-2 border-hydro-primary shadow-lg shadow-hydro-primary/20' : 'border-black/10 dark:border-white/10 opacity-80 hover:opacity-100'}`}>
                <div className="absolute inset-0 bg-cover bg-center grayscale opacity-50" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChM2tXonuf-O9q5XBChK6E-si0BUZmrZy06Bv40sCpK_ttBtqEm2xrSKVxdrR4na08ye1CY29Sq5K6y9B9lUVYUNvqKSR2_I1-ZTCwov4gJPFH9REtUZoORr4km3DYK38qqQLmebKLdKLmfNa1T1XGUFiFqzHzoJI9gNUuhgZhC00ncrmngemBabk7pt3qw3dBWxchcVy9KV6dI0ggrZT1FaKIVe1byFI6GGZTQDQ41D2dvtpvvZxTKCe9Prnb4z96xR6VeTKM6gA')" }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/80 text-2xl">image</span>
                </div>
                {template === 'Photo' && <div className="absolute top-1 right-1 bg-hydro-primary rounded-full p-0.5"><span className="material-symbols-outlined text-white text-[12px] block">check</span></div>}
              </div>
              <span className={`text-xs font-medium ${template === 'Photo' ? 'text-hydro-primary font-bold' : 'text-[#897561]'}`}>Foto</span>
            </div>

            {/* Gradient Option */}
            <div onClick={() => setTemplate('Gradient')} className="snap-center shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`relative w-20 h-32 rounded-xl border overflow-hidden transition-all active:scale-95 ${template === 'Gradient' ? 'border-2 border-hydro-primary shadow-lg shadow-hydro-primary/20' : 'border-black/10 dark:border-white/10 opacity-80 hover:opacity-100'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#103e4a] to-[#eaddcf]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">water_full</span>
                </div>
                {template === 'Gradient' && <div className="absolute top-1 right-1 bg-hydro-primary rounded-full p-0.5"><span className="material-symbols-outlined text-white text-[12px] block">check</span></div>}
              </div>
              <span className={`text-xs font-medium ${template === 'Gradient' ? 'text-hydro-primary font-bold' : 'text-[#897561]'}`}>Gradiente</span>
            </div>

             {/* Minimal Option */}
             <div onClick={() => setTemplate('Minimal')} className="snap-center shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`relative w-20 h-32 rounded-xl border overflow-hidden transition-all active:scale-95 bg-white ${template === 'Minimal' ? 'border-2 border-hydro-primary shadow-lg shadow-hydro-primary/20' : 'border-black/10 dark:border-white/10 opacity-80 hover:opacity-100'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-black/50 text-2xl">crop_portrait</span>
                </div>
                {template === 'Minimal' && <div className="absolute top-1 right-1 bg-hydro-primary rounded-full p-0.5"><span className="material-symbols-outlined text-white text-[12px] block">check</span></div>}
              </div>
              <span className={`text-xs font-medium ${template === 'Minimal' ? 'text-hydro-primary font-bold' : 'text-[#897561]'}`}>Minimal</span>
            </div>

             {/* Dark Option */}
             <div onClick={() => setTemplate('Dark')} className="snap-center shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`relative w-20 h-32 rounded-xl border overflow-hidden transition-all active:scale-95 bg-[#103e4a] ${template === 'Dark' ? 'border-2 border-hydro-primary shadow-lg shadow-hydro-primary/20' : 'border-black/10 dark:border-white/10 opacity-80 hover:opacity-100'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/50 text-2xl">dark_mode</span>
                </div>
                {template === 'Dark' && <div className="absolute top-1 right-1 bg-hydro-primary rounded-full p-0.5"><span className="material-symbols-outlined text-white text-[12px] block">check</span></div>}
              </div>
              <span className={`text-xs font-medium ${template === 'Dark' ? 'text-hydro-primary font-bold' : 'text-[#897561]'}`}>Dark</span>
            </div>
          </div>
        </div>

      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f8f7f6] via-[#f8f7f6]/95 to-transparent dark:from-[#221910] dark:via-[#221910]/95 pt-8 pointer-events-none z-30">
        <button 
           onClick={handleShare}
           className="pointer-events-auto w-full bg-hydro-primary hover:bg-[#b8620e] text-white text-lg font-bold py-4 rounded-xl shadow-[0_8px_20px_rgba(212,115,17,0.3)] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span>Compartilhar Meta</span>
          <span className="material-symbols-outlined">ios_share</span>
        </button>
      </div>

    </div>
  );
};