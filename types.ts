export interface MacroData {
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealItem {
  name: string;
  quantity: string;
  calories: number;
}

export interface Meal {
  id: string;
  name: string;
  timestamp: Date;
  calories: number;
  macros: MacroData;
  type: 'manual' | 'ai-chat' | 'ai-photo' | 'ai-voice';
  imageUri?: string; // For photo logs
  items?: MealItem[];
}

export interface DailyStats {
  consumedCalories: number;
  targetCalories: number;
  macros: MacroData;
  targetMacros: MacroData;
}

export enum AppView {
  HOME = 'HOME',
  FEED = 'FEED',
  LOG = 'LOG',
  SHARE = 'SHARE',
  SETTINGS = 'SETTINGS',
  PLAN = 'PLAN',
  PLAN_SHARE = 'PLAN_SHARE',
  PROFILE = 'PROFILE',
  HYDRATION = 'HYDRATION',
  QUARTERLY_ANALYSIS = 'QUARTERLY_ANALYSIS',
  DAILY_JOURNAL = 'DAILY_JOURNAL',
  PLAN_RENEWAL = 'PLAN_RENEWAL',
  REFINE_PLAN = 'REFINE_PLAN',
  FLOW_ADAPTATION = 'FLOW_ADAPTATION',
  VISUAL_EVOLUTION = 'VISUAL_EVOLUTION',
  VISUAL_SHARE = 'VISUAL_SHARE',
  INTEGRATIONS = 'INTEGRATIONS'
}

export type Theme = 'light' | 'dark';

export interface AIResponse {
  foodName: string;
  calories: number;
  macros: {
    p: number;
    c: number;
    f: number;
  };
  items: MealItem[];
  confidence?: number;
  message?: string; // Mensagem motivacional do coach
}