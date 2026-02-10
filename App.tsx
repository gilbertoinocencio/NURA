import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { FlowDashboard } from './components/FlowDashboard';
import { SocialFeed } from './components/SocialFeed';
import { MealLogger } from './components/MealLogger';
import { FoodGuide } from './components/FoodGuide';
import { SocialShare } from './components/SocialShare';
import { QuarterlyPlan } from './components/QuarterlyPlan';
import { PlanProgressShare } from './components/PlanProgressShare';
import { ProfileConfig } from './components/ProfileConfig';
import { ProfileView } from './components/ProfileView';
import { HydrationSocial } from './components/HydrationSocial';
import { QuarterlyAnalysis } from './components/QuarterlyAnalysis';
import { DailyJournal } from './components/DailyJournal';
import { PlanRenewal } from './components/PlanRenewal';
import { RefinePlan } from './components/RefinePlan';
import { FlowAdaptation } from './components/FlowAdaptation';
import { VisualEvolution } from './components/VisualEvolution';
import { VisualShare } from './components/VisualShare';
import { Integrations } from './components/Integrations';
import { AppView, DailyStats, Meal } from './types';
import { INITIAL_STATS } from './constants';

import { useAuth } from './contexts/AuthContext';
import { LoginView } from './components/LoginView';
import { MealService } from './services/mealService';
import { StatsService } from './services/statsService';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [stats, setStats] = useState<DailyStats>(INITIAL_STATS);
  const [meals, setMeals] = useState<Meal[]>([]);

  // Default to false for the Original Light Mode Theme
  const [darkMode, setDarkMode] = useState(false);

  // Handle Theme Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Fetch Stats on Load
  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;
    try {
      const dailyStats = await StatsService.getDailyStats(user.id);
      setStats(dailyStats);

      const dailyMeals = await MealService.getMeals(user.id);
      setMeals(dailyMeals);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogMeal = (meal: Meal) => {
    // Optimistic Update
    setMeals(prev => [meal, ...prev]);
    setStats(prev => ({
      ...prev,
      consumedCalories: prev.consumedCalories + meal.calories,
      macros: {
        protein: prev.macros.protein + meal.macros.protein,
        carbs: prev.macros.carbs + meal.macros.carbs,
        fats: prev.macros.fats + meal.macros.fats,
      }
    }));
    setView(AppView.HOME);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nura-bg dark:bg-background-dark">
        <div className="w-16 h-16 border-4 border-nura-petrol dark:border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  return (
    <Layout
      activeView={view}
      onChangeView={setView}
      onFabClick={() => setView(AppView.LOG)}
    >

      {view === AppView.HOME && (
        <FlowDashboard
          stats={stats}
          onFabClick={() => setView(AppView.DAILY_JOURNAL)}
          onShareClick={() => setView(AppView.SHARE)}
          onNavClick={setView}
          activeView={view}
          isDarkMode={darkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {view === AppView.FEED && (
        <SocialFeed
          onNavigate={setView}
          onFabClick={() => setView(AppView.LOG)}
          activeView={view}
          onBack={() => setView(AppView.HOME)}
        />
      )}

      {view === AppView.PLAN && (
        <QuarterlyPlan
          onBack={() => setView(AppView.HOME)}
          onNavigate={setView}
        />
      )}

      {view === AppView.PLAN_SHARE && (
        <PlanProgressShare onBack={() => setView(AppView.PLAN)} />
      )}

      {view === AppView.QUARTERLY_ANALYSIS && (
        <QuarterlyAnalysis
          onBack={() => setView(AppView.PROFILE)}
          onNavigate={setView}
        />
      )}

      {view === AppView.VISUAL_EVOLUTION && (
        <VisualEvolution
          onBack={() => setView(AppView.QUARTERLY_ANALYSIS)}
          onNavigate={setView}
        />
      )}

      {view === AppView.VISUAL_SHARE && (
        <VisualShare
          onBack={() => setView(AppView.VISUAL_EVOLUTION)}
        />
      )}

      {view === AppView.PLAN_RENEWAL && (
        <PlanRenewal
          onBack={() => setView(AppView.QUARTERLY_ANALYSIS)}
          onNavigate={setView}
        />
      )}

      {view === AppView.REFINE_PLAN && (
        <RefinePlan
          onBack={() => setView(AppView.PLAN_RENEWAL)}
          onNavigate={setView}
        />
      )}

      {view === AppView.FLOW_ADAPTATION && (
        <FlowAdaptation
          onBack={() => setView(AppView.HOME)}
          onNavigate={setView}
        />
      )}

      {view === AppView.DAILY_JOURNAL && (
        <DailyJournal
          onBack={() => setView(AppView.HOME)}
          onNavigate={setView}
        />
      )}

      {view === AppView.INTEGRATIONS && (
        <Integrations
          onBack={() => setView(AppView.PROFILE)}
        />
      )}

      {/* Main Profile View */}
      {view === AppView.PROFILE && (
        <ProfileView
          onNavClick={setView}
          onSettingsClick={() => setView(AppView.SETTINGS)}
          isDarkMode={darkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Legacy Config/Settings View */}
      {view === AppView.SETTINGS && (
        <ProfileConfig
          onBack={() => setView(AppView.PROFILE)}
          onFinish={() => setView(AppView.PROFILE)}
        />
      )}

      {/* Hydration Template View */}
      {view === AppView.HYDRATION && (
        <HydrationSocial onBack={() => setView(AppView.HOME)} />
      )}

      {/* Food Guide */}
      {view === AppView.FOOD_GUIDE && (
        <FoodGuide
          onBack={() => setView(AppView.HOME)}
          onNavigate={setView}
        />
      )}

      {/* Overlays */}
      {view === AppView.LOG && (
        <MealLogger onLog={handleLogMeal} onClose={() => setView(AppView.HOME)} />
      )}

      {view === AppView.SHARE && (
        <SocialShare stats={stats} onClose={() => setView(AppView.HOME)} />
      )}

    </Layout>
  );
};

export default App;