import { supabase } from './supabase';
import { DailyStats } from '../types';
import { INITIAL_STATS } from '../constants';
import { MealService } from './mealService';

export const StatsService = {
    // Calculate stats from meals for a specific day
    async getDailyStats(userId: string, date: Date = new Date()): Promise<DailyStats> {
        const meals = await MealService.getMeals(userId, date);

        // Fetch User Profile for Targets
        const { data: profile } = await supabase
            .from('profiles')
            .select('target_calories, target_protein, target_carbs, target_fats')
            .eq('id', userId)
            .single();

        const targets = profile || {
            target_calories: 2000,
            target_protein: 150,
            target_carbs: 200,
            target_fats: 65
        };

        const consumed = meals.reduce((acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.macros.protein,
            carbs: acc.carbs + meal.macros.carbs,
            fats: acc.fats + meal.macros.fats
        }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

        return {
            consumedCalories: consumed.calories,
            targetCalories: targets.target_calories,
            macros: {
                protein: consumed.protein,
                carbs: consumed.carbs,
                fats: consumed.fats
            },
            targetMacros: {
                protein: targets.target_protein,
                carbs: targets.target_carbs,
                fats: targets.target_fats
            }
        };
    }
};
