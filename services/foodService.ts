import { supabase } from './supabase';

export interface FoodItem {
    id?: string;
    name: string;
    category: 'protein' | 'carbs' | 'fats';
    tier: 'budget' | 'balanced' | 'premium';
    calories?: number;
    macros?: { p: number; c: number; f: number };
    image_url?: string;
    quality_score?: number; // 1-3
}

export const FoodService = {
    async getFoods(): Promise<FoodItem[]> {
        const { data, error } = await supabase
            .from('food_guide_items')
            .select('*');

        if (error) {
            console.error('Error fetching foods:', error);
            return [];
        }
        return data;
    },

    // Seed function to populate DB if empty
    async seedInitialFoods() {
        const initialFoods: FoodItem[] = [
            // Proteins
            { name: 'Ovos', category: 'protein', tier: 'budget', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400' },
            { name: 'Frango', category: 'protein', tier: 'balanced', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400' },
            { name: 'Salmão', category: 'protein', tier: 'premium', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400' },
            // Carbs
            { name: 'Arroz Branco', category: 'carbs', tier: 'budget', quality_score: 2, image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
            { name: 'Batata Doce', category: 'carbs', tier: 'balanced', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1596097635121-14b63b7a7c19?w=400' },
            { name: 'Quinoa', category: 'carbs', tier: 'premium', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
            // Fats
            { name: 'Azeite', category: 'fats', tier: 'budget', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcdbf41?w=400' },
            { name: 'Abacate', category: 'fats', tier: 'balanced', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1523049673856-356ccc615d82?w=400' },
            { name: 'Nozes', category: 'fats', tier: 'premium', quality_score: 3, image_url: 'https://images.unsplash.com/photo-1533230678252-c65f97371131?w=400' },
        ];

        // Check if empty
        const { count } = await supabase.from('food_guide_items').select('*', { count: 'exact', head: true });

        if (count === 0) {
            const { error } = await supabase.from('food_guide_items').insert(initialFoods);
            if (error) console.error("Error seeding foods:", error);
        }
    }
};
