import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { useLanguage } from '../i18n';
import { FoodService, FoodItem as ServiceFoodItem } from '../services/foodService';

interface FoodGuideProps {
    onBack: () => void;
    onNavigate: (view: AppView) => void;
}

type BudgetTier = 'economic' | 'balanced' | 'premium';
type MacroCategory = 'proteins' | 'carbs' | 'fats';

// Adaptation of Service Schema to UI Schema
interface UiFoodItem {
    name: string;
    description: string;
    priceTier: number; // 1-3
    quality: number; // 1-4
    image: string;
    category: string;
    tier: string;
}

export const FoodGuide: React.FC<FoodGuideProps> = ({ onBack, onNavigate }) => {
    const { t } = useLanguage();
    const [budgetTier, setBudgetTier] = useState<BudgetTier>('premium');
    const [activeCategory, setActiveCategory] = useState<MacroCategory>('proteins');
    const [foods, setFoods] = useState<UiFoodItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = async () => {
        setLoading(true);
        try {
            // Seed if empty (auto-fix)
            await FoodService.seedInitialFoods();

            const data = await FoodService.getFoods();

            // Map DB items to UI items
            const mapped: UiFoodItem[] = data.map(f => ({
                name: f.name,
                description: `${f.category.toUpperCase()} • ${f.tier}`, // Simple description for now
                priceTier: f.tier === 'budget' ? 1 : f.tier === 'balanced' ? 2 : 3,
                quality: f.quality_score || 3,
                image: f.image_url || 'https://via.placeholder.com/150',
                category: f.category,   // 'protein', 'carbs', 'fats' (singular in DB?)
                tier: f.tier
            }));
            setFoods(mapped);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const priceTierDisplay = (tier: number) => '$'.repeat(tier);

    const macroIcons: Record<MacroCategory, string> = {
        proteins: 'egg_alt',
        carbs: 'grain',
        fats: 'opacity',
    };

    // Filter Logic
    const filteredFoods = foods.filter(f => {
        // Map DB category (singular) to UI category (plural keys)
        // DB: 'protein', 'carbs', 'fats'
        // UI Keys: 'proteins', 'carbs', 'fats'
        const catMatch =
            (activeCategory === 'proteins' && f.category === 'protein') ||
            (activeCategory === 'carbs' && f.category === 'carbs') || // DB usually singular 'carb'? Check seed. Seed says 'carbs'
            (activeCategory === 'fats' && f.category === 'fats');

        const tierMatch = f.tier === budgetTier;

        // Show all tiers if no strict filtering, or filter strict? UI has tier selector.
        // Let's filter strict for the tier selector.
        return catMatch && tierMatch;
    });

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-nura-bg dark:bg-background-dark font-display text-nura-main dark:text-white animate-fade-in transition-colors duration-300">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-nura-bg/90 dark:bg-background-dark/90 backdrop-blur-md px-6 py-4 flex items-center justify-between transition-colors">
                <button
                    onClick={onBack}
                    className="text-nura-petrol dark:text-white flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-nura-pastel-orange dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h1 className="text-nura-petrol dark:text-white text-lg font-bold tracking-tight">{t.foodGuide.title}</h1>
                <button className="text-nura-muted dark:text-gray-400 p-2 -mr-2 rounded-full hover:bg-nura-pastel-orange dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">tune</span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col px-6 pb-32">

                {/* Hero Text */}
                <div className="pt-4 pb-4">
                    <h2 className="text-nura-petrol dark:text-white text-[32px] font-extrabold leading-[1.1] tracking-tight mb-2">
                        {t.foodGuide.heroTitle.split('\\n').map((line: string, i: number) => (
                            <React.Fragment key={i}>
                                {i > 0 && <br />}
                                {line}
                            </React.Fragment>
                        ))}
                    </h2>
                    <p className="text-nura-muted dark:text-gray-400 text-sm font-medium">
                        {t.foodGuide.heroSubtitle}
                    </p>
                </div>

                {/* Budget Tier Selector */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2.5 px-1">
                        <span className="text-xs font-bold text-nura-petrol dark:text-white uppercase tracking-wider flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>
                            {t.foodGuide.weeklyBudget}
                        </span>
                        <span className="text-xs text-nura-muted dark:text-gray-400">{t.foodGuide.filteredByAi}</span>
                    </div>
                    <div className="flex p-1 bg-nura-pastel-orange dark:bg-gray-800 rounded-xl border border-nura-border dark:border-gray-700">
                        {(['economic', 'balanced', 'premium'] as BudgetTier[]).map((tier) => (
                            <button
                                key={tier}
                                onClick={() => setBudgetTier(tier)}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${budgetTier === tier
                                    ? 'text-nura-petrol dark:text-white bg-white dark:bg-gray-700 shadow-sm font-bold ring-1 ring-black/5 dark:ring-white/10'
                                    : 'text-nura-muted dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {t.foodGuide[tier]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Macro Category Pills */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-8 -mx-6 px-6 py-1">
                    {(['proteins', 'carbs', 'fats'] as MacroCategory[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-transform hover:scale-105 active:scale-95 ${activeCategory === cat
                                ? 'bg-nura-petrol dark:bg-primary text-white shadow-lg shadow-nura-petrol/20 dark:shadow-primary/20'
                                : 'bg-nura-pastel-orange dark:bg-gray-800 text-nura-petrol dark:text-gray-200 border border-transparent dark:border-gray-700'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{macroIcons[cat]}</span>
                            <span className={`text-sm ${activeCategory === cat ? 'font-bold' : 'font-medium'}`}>
                                {cat === 'proteins' ? t.foodGuide.proteins : cat === 'carbs' ? t.foodGuide.carbohydrates : t.foodGuide.fatsLabel}
                            </span>
                        </button>
                    ))}
                </div>

                {/* AI Insight Card */}
                <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-[#E3F2FD] to-[#F1F8E9] dark:from-[#1e3a4c] dark:to-[#1a2e22] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <span className="material-symbols-outlined text-[80px] text-nura-petrol dark:text-primary">auto_awesome</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-nura-petrol dark:text-primary text-[20px]">auto_awesome</span>
                            <span className="text-nura-petrol dark:text-primary text-xs font-bold uppercase tracking-wider">{t.foodGuide.aiInsightLabel}</span>
                        </div>
                        <p className="text-nura-petrol dark:text-white text-base font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t.foodGuide.aiInsightText.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>') }}
                        />
                    </div>
                </div>

                {/* Food List - Flat List now since we filter */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-nura-petrol dark:text-white text-xl font-bold tracking-tight capitalize">
                            {activeCategory}
                        </h3>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10"><div className="animate-spin h-6 w-6 border-2 border-primary rounded-full border-t-transparent"></div></div>
                    ) : filteredFoods.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">Nenhum item encontrado para este filtro.</div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredFoods.map((item, idx) => (
                                <div key={idx} className="group flex items-center p-2 pr-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-nura-border dark:border-gray-800 hover:shadow-md transition-all duration-300">
                                    {/* Food Image */}
                                    <div className="size-16 rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0 overflow-hidden relative mr-4">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url('${item.image}')` }}
                                        />
                                    </div>

                                    {/* Food Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-nura-petrol dark:text-white text-base font-bold truncate">{item.name}</h4>
                                            <span className="text-[10px] font-bold text-nura-petrol dark:text-white bg-nura-petrol/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-nura-petrol/10 dark:border-white/10">
                                                {priceTierDisplay(item.priceTier)}
                                            </span>
                                        </div>
                                        <p className="text-nura-muted dark:text-gray-400 text-xs mt-0.5">{item.description}</p>
                                        {/* Quality Dots */}
                                        <div className="flex gap-1 mt-2">
                                            {[1, 2, 3, 4].map((dot) => (
                                                <div
                                                    key={dot}
                                                    className={`h-1.5 w-1.5 rounded-full ${dot <= item.quality
                                                        ? 'bg-nura-petrol dark:bg-white'
                                                        : 'bg-nura-pastel-orange dark:bg-gray-700'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Swap Button */}
                                    <button className="shrink-0 ml-3 flex flex-col items-center justify-center size-10 rounded-xl bg-nura-pastel-orange dark:bg-gray-800 text-nura-petrol dark:text-white hover:bg-nura-petrol/10 hover:text-nura-petrol dark:hover:bg-primary/10 dark:hover:text-primary transition-colors group-hover:scale-105 active:scale-95">
                                        <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>

            {/* Bottom CTA */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-[360px] px-6">
                <button className="w-full flex items-center justify-between px-6 py-4 bg-nura-petrol dark:bg-primary text-white rounded-2xl shadow-xl shadow-nura-petrol/30 dark:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider">{t.foodGuide.currentMeal}</span>
                        <span className="text-lg font-bold">1/4 {t.foodGuide.completed}</span>
                    </div>
                    <div className="size-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
