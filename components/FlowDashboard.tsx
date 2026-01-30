import React from 'react';
import { DailyStats, AppView } from '../types';
import { USER_AVATAR } from '../constants';
import { useLanguage } from '../i18n';

interface FlowDashboardProps {
  stats: DailyStats;
  onFabClick: () => void;
  onShareClick: () => void;
  onNavClick: (view: AppView) => void;
  activeView: AppView;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const FlowDashboard: React.FC<FlowDashboardProps> = ({
  stats,
  onFabClick,
  onShareClick,
  onNavClick,
  activeView,
  isDarkMode,
  onToggleTheme
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-nura-bg dark:bg-background-dark font-display text-nura-main dark:text-white animate-fade-in transition-colors duration-300">

      {/* Header */}
      <header className="flex items-center justify-between p-6 pt-8 z-10">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-nura-petrol/20 dark:border-primary/20"
              style={{ backgroundImage: `url("${USER_AVATAR}")` }}
            >
            </div>
            {/* Notification Dot for Demo */}
            <div className="absolute top-0 right-0 size-3 bg-red-500 rounded-full border-2 border-nura-bg dark:border-background-dark"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-nura-muted dark:text-slate-400 font-medium tracking-wide uppercase">{t.dashboard.welcomeBack}</span>
            <h2 className="text-nura-main dark:text-white text-lg font-bold leading-tight">Alex</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavClick(AppView.FLOW_ADAPTATION)}
            className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-surface-dark border border-nura-border dark:border-transparent hover:bg-nura-petrol-light dark:hover:bg-primary/10 transition-colors text-nura-petrol dark:text-primary relative animate-pulse shadow-sm dark:shadow-none"
            title="Simulate Activity Detected"
          >
            <span className="material-symbols-outlined text-[20px]">sync</span>
            <span className="absolute top-2 right-2 size-2 bg-nura-petrol dark:bg-primary rounded-full"></span>
          </button>
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-surface-dark border border-nura-border dark:border-transparent hover:bg-nura-petrol-light dark:hover:bg-primary/10 transition-colors text-nura-muted dark:text-slate-300 shadow-sm dark:shadow-none"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 gap-6 pb-24">

        {/* Circular Progress / Hero */}
        <div className="w-full relative flex flex-col items-center justify-center py-4">
          <div className="relative size-64">
            <svg className="circular-chart transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
              <path className="circle-bg dark:stroke-[#18282e] stroke-gray-200 light-circle-bg" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <path
                className="circle"
                strokeDasharray={`${Math.min((stats.consumedCalories / stats.targetCalories) * 100, 100)}, 100`}
                d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold tracking-tighter text-nura-main dark:text-white">
                {stats.consumedCalories.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-nura-muted dark:text-slate-400 mt-1">
                / {stats.targetCalories.toLocaleString()} {t.dashboard.kcal}
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Text */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl font-bold tracking-tight text-nura-main dark:text-white">{t.dashboard.keepTheFlow}</h2>
          <p className="text-sm text-nura-muted dark:text-slate-400 font-medium max-w-[200px] mx-auto leading-relaxed">
            {t.dashboard.fuelingPotential}
          </p>
        </div>

        {/* Macro Stats - Styled with NURA Palette */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {/* Protein */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-nura-border dark:border-transparent transition-colors duration-300">
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold text-nura-muted dark:text-slate-500 uppercase tracking-wider">{t.dashboard.protein}</span>
              <span className="text-[10px] text-nura-petrol dark:text-primary font-bold">
                {Math.round((stats.macros.protein / stats.targetMacros.protein) * 100)}%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-nura-main dark:text-white">
                {Math.round(stats.macros.protein)}
                <span className="text-xs font-normal text-nura-muted dark:text-slate-500 ml-0.5">/{stats.targetMacros.protein}g</span>
              </span>
              <div className="h-1.5 w-full bg-nura-pastel-orange dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-nura-petrol dark:bg-primary rounded-full"
                  style={{ width: `${Math.min((stats.macros.protein / stats.targetMacros.protein) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-nura-border dark:border-transparent transition-colors duration-300">
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold text-nura-muted dark:text-slate-500 uppercase tracking-wider">{t.dashboard.carbs}</span>
              <span className="text-[10px] text-orange-400 font-bold">
                {Math.round((stats.macros.carbs / stats.targetMacros.carbs) * 100)}%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-nura-main dark:text-white">
                {Math.round(stats.macros.carbs)}
                <span className="text-xs font-normal text-nura-muted dark:text-slate-500 ml-0.5">/{stats.targetMacros.carbs}g</span>
              </span>
              <div className="h-1.5 w-full bg-nura-pastel-orange dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full"
                  style={{ width: `${Math.min((stats.macros.carbs / stats.targetMacros.carbs) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Fats */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-nura-border dark:border-transparent transition-colors duration-300">
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold text-nura-muted dark:text-slate-500 uppercase tracking-wider">{t.dashboard.fats}</span>
              <span className="text-[10px] text-purple-400 font-bold">
                {Math.round((stats.macros.fats / stats.targetMacros.fats) * 100)}%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-nura-main dark:text-white">
                {Math.round(stats.macros.fats)}
                <span className="text-xs font-normal text-nura-muted dark:text-slate-500 ml-0.5">/{stats.targetMacros.fats}g</span>
              </span>
              <div className="h-1.5 w-full bg-nura-pastel-orange dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full"
                  style={{ width: `${Math.min((stats.macros.fats / stats.targetMacros.fats) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full mt-auto mb-6 flex flex-col gap-4">
          <div className="flex gap-4">
            <button
              onClick={onFabClick}
              className="flex-1 bg-nura-petrol dark:bg-primary hover:bg-nura-petrol/90 dark:hover:bg-primary/90 text-white font-bold h-14 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-nura-petrol/20 dark:shadow-primary/20 transition-all transform active:scale-[0.99]"
            >
              <span className="material-symbols-outlined">add_circle</span>
              {t.dashboard.logMeal}
            </button>
            <button
              onClick={() => onNavClick(AppView.HYDRATION)}
              className="w-14 bg-white dark:bg-surface-dark hover:bg-nura-petrol-light dark:hover:bg-white/5 text-nura-petrol dark:text-primary font-bold h-14 rounded-xl flex items-center justify-center shadow-lg shadow-black/5 transition-all transform active:scale-[0.99] border border-transparent dark:border-white/5"
            >
              <span className="material-symbols-outlined text-[24px]">water_drop</span>
            </button>
          </div>

          <button
            onClick={onShareClick}
            className="w-full bg-transparent hover:bg-white/40 dark:hover:bg-white/5 text-nura-muted dark:text-slate-400 font-semibold h-12 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            {t.dashboard.shareMyDay}
          </button>
        </div>
      </main>
    </div>
  );
};