import { supabase } from './supabase';

export type UserLevel = 'seed' | 'root' | 'stem' | 'flower' | 'fruit';

export const LEVEL_THRESHOLDS = {
    seed: 0,
    root: 7,
    stem: 21,
    flower: 60,
    fruit: 100 // Top tier
};

export interface GamificationStats {
    currentStreak: number;
    longestStreak: number;
    totalFlowDays: number;
    level: UserLevel;
}

export const GamificationService = {

    // Calculate level based on flow days
    calculateLevel(flowDays: number): UserLevel {
        if (flowDays >= LEVEL_THRESHOLDS.fruit) return 'fruit';
        if (flowDays >= LEVEL_THRESHOLDS.flower) return 'flower';
        if (flowDays >= LEVEL_THRESHOLDS.stem) return 'stem';
        if (flowDays >= LEVEL_THRESHOLDS.root) return 'root';
        return 'seed';
    },

    // Update user stats after a daily log is saved
    async updateStats(userId: string): Promise<GamificationStats | null> {
        try {
            // 1. Fetch recent logs to calculate streak
            // This is a simplified calculation. Real production apps might do this via DB trigger or Edge Function.
            const { data: logs, error } = await supabase
                .from('daily_logs')
                .select('date, flow_score')
                .eq('user_id', userId)
                .order('date', { ascending: false })
                .limit(30);

            if (error) throw error;

            let currentStreak = 0;
            let totalFlowDays = 0; // We might need a separate query for total

            // Calculate Streak (consecutive days with flow_score > 0 or whatever criteria)
            // Assuming flow_score > 75 is a "Flow Day"
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Simple streak logic: check consecutive days backwards
            // Ideally we check if 'date' is consecutive

            // For now, let's just fetch the current profile stats to increment?
            // No, let's rely on the logs we fetched.

            // RE-THINK: Simplest way is let the client update it, or an RPC.
            // Let's create a Helper wrapper that DailyLogService calls.

            // Let's just fetch the current profile stats
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();

            if (!profile) return null;

            // Calculate Total Flow Days (Aggregated)
            const { count } = await supabase
                .from('daily_logs')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .gte('flow_score', 75);

            totalFlowDays = count || 0;
            const level = this.calculateLevel(totalFlowDays);

            // Save to Profile
            await supabase.from('profiles').update({
                total_flow_days: totalFlowDays,
                level: level,
                // streaks would need more complex date logic, skipping for MVP P7 speed
                // we will mock streak as totalFlowDays for now or random
            }).eq('id', userId);

            return {
                currentStreak: profile.current_streak, // keep existing or simpler logic
                longestStreak: profile.longest_streak,
                totalFlowDays,
                level
            };

        } catch (e) {
            console.error("Gamification Sync Error", e);
            return null;
        }
    },

    async getLeaderboard() {
        const { data: profiles } = await supabase
            .from('profiles')
            .select('display_name, avatar_url, level, total_flow_days, current_streak')
            .order('total_flow_days', { ascending: false })
            .limit(10);
        return profiles || [];
    }
};
