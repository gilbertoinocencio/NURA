import { supabase } from './supabase';
import { Meal, DailyStats } from '../types';
import { INITIAL_STATS } from '../constants';

export const MealService = {
    // Save a meal to Supabase
    async logMeal(meal: Meal, userId: string): Promise<void> {
        const { error } = await supabase
            .from('meals')
            .insert({
                user_id: userId,
                name: meal.name,
                calories: meal.calories,
                protein: meal.macros.protein,
                carbs: meal.macros.carbs,
                fats: meal.macros.fats,
                type: meal.type,
                items: meal.items,
                image_url: meal.imageUri, // Note: We should upload image first in a real scenario
            });

        if (error) throw error;

        // Also upsert daily log for faster stat retrieval
        await this.updateDailyLog(userId, meal);
    },

    // Get meals for a specific date
    async getMeals(userId: string, date: Date = new Date()): Promise<Meal[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const { data, error } = await supabase
            .from('meals')
            .select('*')
            .eq('user_id', userId)
            .gte('created_at', startOfDay.toISOString())
            .lte('created_at', endOfDay.toISOString())
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            timestamp: new Date(item.created_at),
            calories: item.calories,
            macros: {
                protein: item.protein,
                carbs: item.carbs,
                fats: item.fats
            },
            type: item.type,
            items: item.items,
            imageUri: item.image_url
        }));
    },

    // Helper to update daily aggregation
    async updateDailyLog(userId: string, meal: Meal) {
        // This is a simplified approach. Ideally we'd have a trigger or edge function.
        // For now, we just rely on client re-fetching or optimistic updates.
        // We will implement a proper DailyLog upsert if needed for hydration/notes.
        return;
    }
};
