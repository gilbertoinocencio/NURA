import React from 'react';
import { AppView } from '../types';
import { USER_AVATAR, LANGUAGES } from '../constants';
import { useLanguage } from '../i18n';
import { useAuth } from '../contexts/AuthContext';

interface ProfileViewProps {
  onNavClick: (view: AppView) => void;
  onSettingsClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavClick,
  onSettingsClick,
  isDarkMode,
  onToggleTheme
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { profile } = useAuth();

  // Generate mock heatmap data
  const renderHeatmap = () => {
    // 12 cols x 7 rows grid
    const cols = 12;
    const rows = 7;
    const grid = [];

    // Helper to get random intensity
    const getIntensity = (col: number, row: number) => {
      const rand = Math.random();
      // Using nura-petrol for intensity in light mode
      if (rand > 0.8) return 'bg-nura-petrol dark:bg-primary';
      if (rand > 0.6) return 'bg-nura-petrol/80 dark:bg-primary/80';
      if (rand > 0.4) return 'bg-nura-petrol/60 dark:bg-primary/60';
      if (rand > 0.2) return 'bg-nura-petrol/40 dark:bg-primary/40';
      if (rand > 0.1) return 'bg-nura-petrol/20 dark:bg-primary/20';
      return 'bg-nura-pastel-orange dark:bg-gray-700';
    };

    for (let c = 0; c < cols; c++) {
      const colCells = [];
      for (let r = 0; r < rows; r++) {
        colCells.push(
          <div key={`${c}-${r}`} className={`w-3 h-3 rounded-[2px] ${getIntensity(c, r)}`}></div>
        );
      }
      grid.push(
        <div key={c} className="flex flex-col gap-1.5">
          {colCells}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-nura-bg dark:bg-background-dark font-display text-nura-main dark:text-white animate-fade-in transition-colors duration-300">

      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 pb-2">
        <h2 className="text-3xl font-serif italic text-nura-main dark:text-white flex-1">{t.profile.title}</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-nura-main dark:text-white" style={{ fontSize: '24px' }}>
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            onClick={onSettingsClick}
            className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-nura-main dark:text-white" style={{ fontSize: '24px' }}>settings</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar pb-32">
        {/* Profile Info */}
        <section className="flex flex-col items-center pt-6 pb-8 px-4">
          <div className="relative mb-4">
            <div
              className="bg-center bg-no-repeat bg-cover aspect-square rounded-full h-28 w-28 ring-4 ring-white dark:ring-[#1a2630] shadow-sm transition-all"
              style={{ backgroundImage: `url("${profile?.avatar_url || USER_AVATAR}")` }}
            >
            </div>
            <div className="absolute bottom-1 right-1 bg-nura-petrol dark:bg-primary text-white rounded-full p-1 border-2 border-white dark:border-[#101a22]">
              <span className="material-symbols-outlined block text-[16px] leading-none">check</span>
            </div>
          </div>
          <h1 className="text-nura-main dark:text-white text-2xl font-bold leading-tight tracking-tight text-center">
            {profile?.display_name || 'Usuário Nura'}
          </h1>
          <p className="text-nura-muted dark:text-gray-400 text-sm font-medium mt-1">
            {profile?.goal ? t.profile.goals[profile.goal] : 'Defina seu perfil'}
          </p>
        </section>

        {/* Language Selector */}
        <section className="w-full px-6 mb-6">
          <div className="bg-white dark:bg-[#1a2630] rounded-2xl p-4 shadow-sm border border-nura-border dark:border-gray-800 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-nura-petrol dark:text-primary">translate</span>
                <span className="text-sm font-bold text-nura-main dark:text-white">{t.profile.language}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'en' | 'pt' | 'es')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${language === lang.code
                    ? 'bg-nura-petrol dark:bg-primary text-white shadow-md'
                    : 'bg-nura-bg dark:bg-white/5 text-nura-muted dark:text-gray-400 hover:bg-nura-petrol/10 dark:hover:bg-primary/10'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Heatmap Section */}
        <section className="w-full px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-nura-main dark:text-white text-lg font-bold leading-tight">Status do Flow</h3>
            <span className="text-nura-petrol dark:text-primary text-xs font-semibold uppercase tracking-wider">Últimos 3 meses</span>
          </div>
          <div className="bg-white dark:bg-[#1a2630] p-5 rounded-2xl shadow-sm border border-nura-border dark:border-gray-800 overflow-x-auto no-scrollbar transition-colors">
            <div className="flex gap-1 min-w-fit">
              {/* Labels */}
              <div className="flex flex-col justify-between pr-2 text-[10px] text-nura-muted dark:text-gray-400 font-medium h-[100px] py-1">
                <span>Seg</span>
                <span>Qua</span>
                <span>Sex</span>
              </div>
              {/* Grid */}
              <div className="flex gap-1.5 h-[100px]">
                {renderHeatmap()}
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <span className="text-[10px] text-nura-muted dark:text-gray-400 font-medium">Baixo</span>
              <div className="w-2 h-2 rounded-[1px] bg-nura-pastel-orange dark:bg-gray-700"></div>
              <div className="w-2 h-2 rounded-[1px] bg-nura-petrol/40 dark:bg-primary/40"></div>
              <div className="w-2 h-2 rounded-[1px] bg-nura-petrol dark:bg-primary"></div>
              <span className="text-[10px] text-nura-muted dark:text-gray-400 font-medium">Alto</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full px-6 mb-8">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1a2630] rounded-xl shadow-sm border border-nura-border dark:border-gray-800 h-28 transition-colors">
              <span className="material-symbols-outlined text-nura-petrol dark:text-primary mb-2" style={{ fontSize: '24px' }}>calendar_today</span>
              <p className="text-2xl font-bold text-nura-main dark:text-white leading-none">42</p>
              <p className="text-xs text-center text-nura-muted dark:text-gray-400 mt-1 font-medium">Dias em Flow</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1a2630] rounded-xl shadow-sm border border-nura-border dark:border-gray-800 h-28 transition-colors">
              <span className="material-symbols-outlined text-nura-petrol dark:text-primary mb-2" style={{ fontSize: '24px' }}>restaurant_menu</span>
              <p className="text-2xl font-bold text-nura-main dark:text-white leading-none">128</p>
              <p className="text-xs text-center text-nura-muted dark:text-gray-400 mt-1 font-medium">Refeições</p>
            </div>
            <div
              onClick={() => onNavClick(AppView.QUARTERLY_ANALYSIS)}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1a2630] rounded-xl shadow-sm border border-nura-border dark:border-gray-800 h-28 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-1 right-1">
                <span className="material-symbols-outlined text-gray-300 text-xs">arrow_outward</span>
              </div>
              <span className="material-symbols-outlined text-nura-petrol dark:text-primary mb-2" style={{ fontSize: '24px' }}>trending_up</span>
              <p className="text-2xl font-bold text-nura-main dark:text-white leading-none">85%</p>
              <p className="text-xs text-center text-nura-muted dark:text-gray-400 mt-1 font-medium">Consistência</p>
            </div>
          </div>
        </section>

        {/* Quick Actions / Integration */}
        <section className="w-full px-6 mb-8">
          <div
            onClick={() => onNavClick(AppView.INTEGRATIONS)}
            className="w-full bg-gradient-to-r from-nura-petrol/5 to-transparent dark:from-primary/20 dark:to-transparent rounded-2xl p-4 flex items-center justify-between border border-nura-petrol/10 dark:border-primary/20 cursor-pointer hover:bg-nura-petrol/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-nura-petrol dark:text-primary shadow-sm border border-nura-border dark:border-transparent">
                <span className="material-symbols-outlined filled" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-nura-main dark:text-white">{t.profile.integrations}</span>
                <span className="text-xs text-nura-muted dark:text-gray-400">Strava, Apple Health, Garmin...</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-nura-petrol dark:text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="w-full px-6 flex-1">
          <h3 className="text-nura-main dark:text-white text-lg font-bold leading-tight mb-4">Conquistas Recentes</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a2630] rounded-xl border border-nura-border dark:border-gray-800 transition-colors shadow-sm dark:shadow-none">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined">wb_twilight</span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-nura-main dark:text-white">Early Bird</h4>
                <p className="text-sm text-nura-muted dark:text-gray-400">5 Cafés da manhã seguidos</p>
              </div>
              <span className="text-xs font-medium text-gray-400">Ontem</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a2630] rounded-xl border border-nura-border dark:border-gray-800 transition-colors shadow-sm dark:shadow-none">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined">water_drop</span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-nura-main dark:text-white">Hydration Hero</h4>
                <p className="text-sm text-nura-muted dark:text-gray-400">Meta de água batida</p>
              </div>
              <span className="text-xs font-medium text-gray-400">2d atrás</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a2630] rounded-xl border border-nura-border dark:border-gray-800 transition-colors shadow-sm dark:shadow-none">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-nura-main dark:text-white">Green Flow</h4>
                <p className="text-sm text-nura-muted dark:text-gray-400">10 refeições com vegetais</p>
              </div>
              <span className="text-xs font-medium text-gray-400">1 sem</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};