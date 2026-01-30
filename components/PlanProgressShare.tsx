import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

interface PlanProgressShareProps {
  onBack: () => void;
}

export const PlanProgressShare: React.FC<PlanProgressShareProps> = ({ onBack }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (cardRef.current) {
      // Wait for image load stability
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#101e22' // Ensure dark background is captured
      });
      const link = document.createElement('a');
      link.download = `nura-progress-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Helper to render heatmap dots
  const renderHeatmapDots = () => {
    const totalDots = 28; // 4 weeks
    const dots = [];
    for (let i = 0; i < totalDots; i++) {
      // Mock pattern: 1 = Active, 0 = Missed, 2 = Perfect
      const status = Math.random() > 0.8 ? 0 : Math.random() > 0.9 ? 2 : 1;
      
      let className = "w-2.5 h-2.5 rounded-full ";
      if (status === 1) className += "bg-primary shadow-[0_0_8px_rgba(10,144,189,0.6)]";
      else if (status === 2) className += "bg-[#1a2c32] border border-white/10"; // Missed/Rest
      else className += "bg-primary shadow-[0_0_8px_rgba(10,144,189,0.6)]"; // Default mostly active for demo
      
      dots.push(<div key={i} className={className}></div>);
    }
    return dots;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05080a] flex justify-center items-center overflow-y-auto animate-fade-in font-display">
      
      {/* Phone Container / Capture Target */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-[430px] h-full min-h-screen flex flex-col bg-[#101e22] overflow-hidden shadow-2xl"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10, 144, 189, 0.15) 0%, rgba(16, 30, 34, 0) 70%)' }}></div>
        
        {/* Back Button (Visible only to user, typically handled by overlay actions but nice to have in-flow if needed) */}
        <div className="absolute top-4 left-4 z-50">
           <button 
             onClick={onBack}
             className="flex items-center justify-center size-10 rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-white/10 transition-colors"
           >
             <span className="material-symbols-outlined">arrow_back</span>
           </button>
        </div>

        {/* Content Scroll Area */}
        <div className="relative z-10 flex flex-col w-full h-full pb-24">
          
          {/* Header Section */}
          <header className="pt-12 pb-2 px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">water_drop</span>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">My NURA Flow</p>
            </div>
            <h1 className="text-white text-3xl font-bold tracking-tight leading-tight">Resumo de<br/>Novembro</h1>
          </header>

          {/* Consistency Heatmap */}
          <section className="px-6 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end px-1">
                <span className="text-gray-400 text-xs font-medium">Consistência do Flow</span>
                <span className="text-white text-xs font-bold bg-primary/20 px-2 py-0.5 rounded-full text-primary">30 Dias</span>
              </div>
              {/* Heatmap Grid */}
              <div className="bg-[#1a2c32]/60 backdrop-blur-md border border-white/5 p-4 rounded-xl">
                <div className="grid grid-cols-7 gap-x-2 gap-y-3 justify-items-center">
                  {renderHeatmapDots()}
                </div>
              </div>
            </div>
          </section>

          {/* Visual Evidence */}
          <section className="px-6 pb-2">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg group">
              {/* Image */}
              <div 
                 className="absolute inset-0 bg-cover bg-center" 
                 style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAR3d8vl93IP_TL8K76TVki9p4v-Bmpwv0wEqY8xBn3zNquRM13rhrIaBNEJiyPDCOdPH53eiEqj3NSQv1HijgITNWTV5in-t4KFzS6Q0xw-C0my0nMcJxryb98tI3Wmnoc-6rhE3zyXCLtdQ11vkrgXUHnlbdpbTEsT1K-oo12Urn32jImTmo_bFQ7GZ3HO6kcOBKWfjz-0jqWTSbuiZ9O7DAQthB8iHTbu5NvJMKQ95yfsOX3Ks43_PXqHzvp5OCCBMNn2x_Jziw')" }}
              ></div>
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-white font-bold text-lg">Check-in Visual</p>
                <p className="text-gray-300 text-sm">28 Nov 2023</p>
              </div>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="px-6 py-4">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {/* Stat 1 */}
              <div className="flex-1 min-w-[100px] bg-[#1a2c32]/60 backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-1 text-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-1">monitoring</span>
                <p className="text-2xl font-bold text-white leading-none">92%</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Flow</p>
              </div>
              {/* Stat 2 (Highlight) */}
              <div className="flex-1 min-w-[100px] bg-[#1a2c32]/60 backdrop-blur-md border border-primary/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5"></div>
                <span className="material-symbols-outlined text-[#0bda57] text-2xl mb-1">local_fire_department</span>
                <p className="text-2xl font-bold text-white leading-none">12</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Streak</p>
              </div>
              {/* Stat 3 */}
              <div className="flex-1 min-w-[100px] bg-[#1a2c32]/60 backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-1 text-center">
                <span className="material-symbols-outlined text-blue-400 text-2xl mb-1">water_full</span>
                <p className="text-2xl font-bold text-white leading-none">2.5L</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Daily Avg</p>
              </div>
            </div>
          </section>

          {/* Quarterly Goal */}
          <section className="px-6 pb-8">
            <div className="bg-[#1a2c32]/60 backdrop-blur-md border border-white/5 p-5 rounded-xl flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm font-semibold">Meta Trimestral</span>
                <span className="text-primary text-sm font-bold">65%</span>
              </div>
              <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-[#06b6d4] rounded-full w-[65%] shadow-[0_0_10px_rgba(10,144,189,0.5)]"></div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">Você está no caminho certo para atingir sua melhor versão até o final do Q4.</p>
            </div>
          </section>

          {/* Footer Brand */}
          <div className="mt-auto pb-8 pt-4 flex flex-col items-center justify-center gap-2 opacity-60">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-white font-bold tracking-widest text-sm">NURA</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Feed the Flow</p>
          </div>

        </div>
      </div>

      {/* Floating Action Buttons Overlay (Outside capture area if desired, or inside if we want it hidden during capture? Usually inside to be clickable, hidden via logic if capturing) */}
      <div className="absolute bottom-6 left-0 w-full px-6 z-50 flex justify-center pointer-events-none">
        <div className="w-full max-w-[430px] pointer-events-auto">
             <button 
                onClick={handleShare}
                className="w-full bg-white text-[#101e22] font-bold text-base py-4 rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 group"
             >
                <span className="material-symbols-outlined group-hover:-translate-y-0.5 transition-transform">ios_share</span>
                Compartilhar Progresso
             </button>
        </div>
      </div>

    </div>
  );
};