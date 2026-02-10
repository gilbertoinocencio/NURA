import { supabase } from './supabase';

export interface DailyLogData {
    id?: string;
    user_id: string;
    date: string;
    energy_level?: 'Baixa' | 'Média' | 'Boa' | 'Flow';
    mood?: string;
    notes?: string;
    photo_url?: string;
    water_intake?: number;
}

export const DailyLogService = {
    // Get log for a specific date
    async getDailyLog(userId: string, date: Date = new Date()): Promise<DailyLogData | null> {
        const formattedDate = date.toISOString().split('T')[0];

        const { data, error } = await supabase
            .from('daily_logs')
            .select('*')
            .eq('user_id', userId)
            .eq('date', formattedDate)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            console.error('Error fetching daily log:', error);
            return null;
        }

        return data;
    },

    // Upsert log (Create or Update)
    async saveDailyLog(logData: Partial<DailyLogData> & { user_id: string; date: string }) {
        // Check if exists
        const existing = await this.getDailyLog(logData.user_id, new Date(logData.date));

        if (existing) {
            // Update
            const { data, error } = await supabase
                .from('daily_logs')
                .update(logData)
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert
            const { data, error } = await supabase
                .from('daily_logs')
                .insert(logData)
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    },

    async uploadJournalPhoto(userId: string, file: File): Promise<string> {
        const fileName = `${userId}/${Date.now()}_journal.jpg`;
        const { data, error } = await supabase.storage
            .from('meal-photos') // Reusing bucket for now
            .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('meal-photos')
            .getPublicUrl(fileName);

        return publicUrl;
    }
};
