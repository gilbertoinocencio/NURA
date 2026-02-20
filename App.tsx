import React, { useState, useEffect, Suspense } from 'react';
import { Layout } from './components/Layout';
import { FlowDashboard } from './components/FlowDashboard'; // Critical: Keep eager
import { LoginView } from './components/LoginView'; // Critical: Keep eager
import { AppView, DailyStats, Meal } from './types';
import { INITIAL_STATS } from './constants';
import { useAuth } from './contexts/AuthContext';
import { MealService } from './services/mealService';
import { StatsService } from './services/statsService';
import { NotificationService } from './services/notificationService';

// Lazy Load Non-Critical Views
// import { MealLogger } from './components/MealLogger';
const SocialFeed = React.lazy(() => import('./components/SocialFeed'));
const MealLogger = React.lazy(() => import('./components/MealLogger'));
const FoodGuide = React.lazy(() => import('./components/FoodGuide'));
const SocialShare = React.lazy(() => import('./components/SocialShare'));
const QuarterlyPlan = React.lazy(() => import('./components/QuarterlyPlan'));
const PlanProgressShare = React.lazy(() => import('./components/PlanProgressShare'));
const ProfileConfig = React.lazy(() => import('./components/ProfileConfig'));
const ProfileView = React.lazy(() => import('./components/ProfileView'));
const HydrationSocial = React.lazy(() => import('./components/HydrationSocial'));
const QuarterlyAnalysis = React.lazy(() => import('./components/QuarterlyAnalysis'));
const DailyJournal = React.lazy(() => import('./components/DailyJournal'));
const PlanRenewal = React.lazy(() => import('./components/PlanRenewal'));
const RefinePlan = React.lazy(() => import('./components/RefinePlan'));
const FlowAdaptation = React.lazy(() => import('./components/FlowAdaptation'));
const VisualEvolution = React.lazy(() => import('./components/VisualEvolution'));
const VisualShare = React.lazy(() => import('./components/VisualShare'));
const Integrations = React.lazy(() => import('./components/Integrations'));

const App: React.FC = () => {
  const { user, profile, loading } = useAuth();
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

  // Notification Scheduler
  useEffect(() => {
    const interval = setInterval(() => {
      NotificationService.checkReminders();
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

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

  // Loading Spinner Component for Suspense fallback
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <div className="w-10 h-10 border-4 border-nura-petrol dark:border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // Initial Auth Loading
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

  // Onboarding Flow: User exists but hasn't set up profile
  if (!profile?.goal) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileConfig
          onBack={() => { }}
          onFinish={() => window.location.reload()}
          isOnboarding={true}
        />
      </Suspense>
    );
  }

  return (
    <Layout
      activeView={view}
      onChangeView={setView}
      onFabClick={() => setView(AppView.LOG)}
    >
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>

    </Layout>
  );
};

export default App;