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

    // Calculate current streak based on flow_stats
    async calculateStreak(userId: string): Promise<number> {
        try {
            const { data: stats, error } = await supabase
                .from('flow_stats')
                .select('date, flow_score')
                .eq('user_id', userId)
                .order('date', { ascending: false });

            if (error || !stats || stats.length === 0) return 0;

            let streak = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let lastDate = new Date(stats[0].date);
            lastDate.setHours(0, 0, 0, 0);

            // If the last log is not from today or yesterday, streak is broken
            const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays > 1) return 0;

            // Simple consecutive check
            for (let i = 0; i < stats.length; i++) {
                if (stats[i].flow_score >= 75) {
                    if (i === 0) {
                        streak++;
                    } else {
                        const current = new Date(stats[i].date);
                        const prev = new Date(stats[i - 1].date);
                        current.setHours(0, 0, 0, 0);
                        prev.setHours(0, 0, 0, 0);

                        const diff = Math.floor((prev.getTime() - current.getTime()) / (1000 * 24 * 60 * 60));
                        if (diff === 1) {
                            streak++;
                        } else {
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
            return streak;
        } catch (e) {
            console.error("Streak calculation error", e);
            return 0;
        }
    },

    // Update user stats after a daily log is saved
    async updateStats(userId: string): Promise<GamificationStats | null> {
        try {
            // 1. Calculate Streak
            const currentStreak = await this.calculateStreak(userId);

            // 2. Fetch current profile to check longest streak
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
            if (!profile) return null;

            const longestStreak = Math.max(profile.longest_streak || 0, currentStreak);

            // 3. Calculate Total Flow Days
            const { count } = await supabase
                .from('flow_stats')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .gte('flow_score', 75);

            const totalFlowDays = count || 0;
            const level = this.calculateLevel(totalFlowDays);

            // 4. Update Profile
            const { error: updateError } = await supabase.from('profiles').update({
                current_streak: currentStreak,
                longest_streak: longestStreak,
                total_flow_days: totalFlowDays,
                level: level
            }).eq('id', userId);

            if (updateError) throw updateError;

            return {
                currentStreak,
                longestStreak,
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
