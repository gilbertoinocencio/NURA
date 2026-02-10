import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { DailyLogService } from '../services/dailyLogService';
import { useAuth } from '../contexts/AuthContext';

interface DailyJournalProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

type EnergyLevel = 'Baixa' | 'Média' | 'Boa' | 'Flow';

export const DailyJournal: React.FC<DailyJournalProps> = ({ onBack, onNavigate }) => {
  const { user } = useAuth();
  const [energy, setEnergy] = useState<EnergyLevel | null>(null);
  const [notes, setNotes] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [shareToFeed, setShareToFeed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) loadLog();
  }, [user]);

  const loadLog = async () => {
    if (!user) return;
    const log = await DailyLogService.getDailyLog(user.id);
    if (log) {
      setEnergy(log.energy_level as EnergyLevel || null);
      setNotes(log.notes || '');
      setImagePreview(log.photo_url || null);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await DailyLogService.saveDailyLog({
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
        energy_level: energy || undefined,
        notes,
        photo_url: imagePreview || undefined
      }, shareToFeed); // Pass share checkbox state

      onNavigate(AppView.SHARE);
    } catch (e) {
      console.error(e);
      alert('Erro ao salvar diário');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      // Local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload in background (simple version)
      try {
        const publicUrl = await DailyLogService.uploadJournalPhoto(user.id, file);
        setImagePreview(publicUrl); // Update with real URL
      } catch (e) {
        console.error("Upload failed", e);
      }
    }
  };

  const todayDate = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-journal-bg dark:bg-journal-bg-dark font-display text-journal-text dark:text-white animate-fade-in transition-colors duration-500">

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-journal-bg/95 dark:bg-journal-bg-dark/95 backdrop-blur-sm transition-colors duration-300">
        <button
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-journal-text dark:text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-sm font-semibold tracking-widest uppercase text-center flex-1 text-journal-text dark:text-white opacity-90">Diário NURA</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-end text-sm font-medium text-journal-accent hover:text-journal-accent/80 transition-colors">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </header>

      <main className="flex-1 flex flex-col px-6 pb-32 pt-4">

        {/* Date & Title */}
        <div className="flex flex-col items-center mb-10 animate-fade-in-up">
          <p className="text-journal-sub dark:text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2 capitalize">{todayDate}</p>
          <h2 className="text-4xl font-light text-journal-text dark:text-white tracking-tight text-center leading-tight">
            <span className="font-normal text-journal-accent italic font-serif">Meu Flow</span>
          </h2>
        </div>

        {/* Flow Status Card (Visual Mock for now, could be real stats) */}
        <div className="bg-journal-surface dark:bg-journal-surface-dark rounded-2xl p-6 mb-10 shadow-soft border border-black/5 dark:border-white/5 transition-colors animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-journal-sub dark:text-gray-500 uppercase tracking-widest">Flow Status</span>
              <span className="text-xl font-medium text-journal-primary dark:text-white">Em Progresso</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-journal-sub dark:text-gray-400 text-right font-medium">Continue registrando para calcular.</p>
        </div>

        {/* Energy Selector */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-journal-text dark:text-white text-lg font-medium mb-5 px-1 flex items-center gap-2">
            Energia do Dia
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800 ml-2"></span>
          </h3>
          <div className="flex justify-between items-center gap-3">
            {[
              { label: 'Baixa', icon: 'battery_low' },
              { label: 'Média', icon: 'sentiment_neutral' },
              { label: 'Boa', icon: 'sentiment_satisfied' },
              { label: 'Flow', icon: 'bolt', special: true }
            ].map((item) => {
              const isActive = energy === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setEnergy(item.label as EnergyLevel)}
                  className="group flex flex-col items-center gap-3 w-1/4 transition-all"
                >
                  <div className={`size-14 rounded-full flex items-center justify-center border transition-all duration-300 shadow-sm
                    ${item.special
                      ? isActive
                        ? 'bg-journal-primary border-journal-primary text-white scale-110 shadow-journal-glow'
                        : 'bg-journal-surface dark:bg-journal-surface-dark border-journal-primary/50 text-journal-primary hover:bg-journal-primary hover:text-white'
                      : isActive
                        ? 'bg-journal-accent border-journal-accent text-white scale-105'
                        : 'bg-journal-surface dark:bg-journal-surface-dark border-gray-200 dark:border-gray-700 text-gray-400 hover:border-journal-accent hover:text-journal-accent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isActive ? (item.special ? 'text-journal-primary dark:text-primary font-bold' : 'text-journal-accent') : 'text-journal-sub dark:text-gray-500'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Record */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center mb-5 px-1">
            <h3 className="text-journal-text dark:text-white text-lg font-medium">Registro Visual</h3>
            <span className="text-[10px] uppercase tracking-wider text-journal-accent font-bold bg-journal-accent/10 px-3 py-1.5 rounded-full">Feed the Flow</span>
          </div>

          <label className={`relative block w-full aspect-[4/3] rounded-2xl border border-dashed hover:border-journal-accent dark:hover:border-journal-accent transition-all cursor-pointer group overflow-hidden bg-journal-surface dark:bg-journal-surface-dark shadow-sm ${imagePreview ? 'border-transparent' : 'border-gray-300 dark:border-gray-700 hover:bg-journal-accent-light/30 dark:hover:bg-journal-accent/10'}`}>
            <input
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleImageUpload}
            />

            {imagePreview ? (
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imagePreview})` }}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-white text-4xl">edit</span>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity group-hover:opacity-90">
                <div className="size-16 rounded-full bg-journal-bg dark:bg-journal-bg-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100 dark:border-gray-800">
                  <span className="material-symbols-outlined text-journal-accent text-3xl font-light">add_a_photo</span>
                </div>
                <h1 className="text-xl font-serif italic text-nura-main dark:text-white mb-1">Capture seu Flow</h1>
                <p className="text-xs text-journal-sub dark:text-gray-500 max-w-[160px] leading-relaxed">Registre a estética da sua nutrição de hoje.</p>
              </div>
            )}
          </label>
        </div>

        {/* Notes */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-journal-text dark:text-white text-lg font-medium mb-3 px-1">Notas do Dia</h3>
          <div className="relative group">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-transparent text-journal-text dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-base leading-relaxed border-0 border-b border-gray-200 dark:border-gray-700 focus:ring-0 focus:border-journal-accent px-1 py-3 resize-none transition-colors"
              placeholder="Como você alimentou seu flow hoje? Escreva brevemente..."
              rows={3}
            ></textarea>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-journal-accent transition-all duration-500 group-focus-within:w-full"></div>
          </div>
        </div>

        {/* Share Checkbox */}
        <div className="mb-6 animate-fade-in-up flex items-center gap-3 px-1" style={{ animationDelay: '0.45s' }}>
          <div
            onClick={() => setShareToFeed(!shareToFeed)}
            className={`size-6 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${shareToFeed ? 'bg-journal-primary border-journal-primary' : 'border-gray-300 dark:border-gray-600'}`}
          >
            {shareToFeed && <span className="material-symbols-outlined text-white text-sm">check</span>}
          </div>
          <label onClick={() => setShareToFeed(!shareToFeed)} className="text-journal-text dark:text-white text-sm cursor-pointer select-none">
            Compartilhar no Feed da Comunidade
          </label>
        </div>

      </main>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-journal-bg via-journal-bg/95 to-transparent dark:from-journal-bg-dark dark:via-journal-bg-dark/95 pt-16 pb-8 px-6 pointer-events-none flex justify-center z-40">
        <div className="w-full max-w-md pointer-events-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-journal-primary hover:bg-[#16454D] dark:bg-primary dark:hover:bg-primary-old active:scale-[0.98] text-white font-medium text-lg py-4 rounded-xl shadow-journal-glow flex items-center justify-center gap-3 transition-all duration-300"
          >
            {saving ? (
              <span className="animate-spin material-symbols-outlined">sync</span>
            ) : (
              <span className="material-symbols-outlined text-xl">ios_share</span>
            )}
            <span>{saving ? 'Registrando...' : 'Salvar Diário'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};