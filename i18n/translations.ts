// i18n/translations.ts
// All translations for NURA app - PT-BR, EN, ES

export type Language = 'en' | 'pt' | 'es';

export interface Translations {
    // Common
    app: {
        name: string;
        slogan: string;
    };

    // Navigation
    nav: {
        home: string;
        nutri: string;
        log: string;
        data: string;
        profile: string;
    };

    // Dashboard
    dashboard: {
        welcomeBack: string;
        keepTheFlow: string;
        fuelingPotential: string;
        kcal: string;
        protein: string;
        carbs: string;
        fats: string;
        logMeal: string;
        shareMyDay: string;
    };

    // Flow Score Dashboard
    flowScore: {
        flowScore: string;
        optimized: string;
        day: string;
        week: string;
        month: string;
        insightText: string;
        weeklyRhythm: string;
        consistency: string;
        steady: string;
        metrics: string;
        viewAll: string;
        hydration: string;
        energy: string;
    };

    // Food Guide
    foodGuide: {
        title: string;
        subtitle: string;
        heroTitle: string;
        heroSubtitle: string;
        economic: string;
        balanced: string;
        premium: string;
        weeklyBudget: string;
        filteredByAi: string;
        proteins: string;
        carbohydrates: string;
        fatsLabel: string;
        aiInsightLabel: string;
        aiInsightText: string;
        insightEconomic: string;
        insightBalanced: string;
        currentMeal: string;
        completed: string;
        complexCarbs: string;
        goodFats: string;
        proteinGoal: string;
        swap: string;
        per100g: string;
        noFoods: string;
        logThis: string;
    };

    // MealLogger
    mealLogger: {
        title: string;
        online: string;
        today: string;
        describeMeal: string;
        addDetails: string;
        speakMeal: string;
        listening: string;
        analyzing: string;
        summary: string;
        kcalTotal: string;
        confirm: string;
        edit: string;
        cancel: string;
        you: string;
        connectionError: string;
        voiceNotSupported: string;
        analysisIntro: string;
        errorLogging: string;
    };

    // Profile
    profile: {
        title: string;
        settings: string;
        myGoals: string;
        integrations: string;
        quarterlyAnalysis: string;
        language: string;
        darkMode: string;
        notifications: string;
        about: string;
        logout: string;
        goals: {
            aesthetic: string;
            health: string;
            performance: string;
        };
    };

    // Social
    social: {
        shareProgress: string;
        download: string;
        copyLink: string;
        close: string;
    };

    // Macros
    macros: {
        prot: string;
        carb: string;
        fat: string;
    };

    // General
    general: {
        back: string;
        save: string;
        next: string;
        done: string;
        loading: string;
        error: string;
        success: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        app: {
            name: 'NURA',
            slogan: 'Feed the Flow',
        },
        nav: {
            home: 'Home',
            nutri: 'Nutri',
            log: 'Log',
            data: 'Data',
            profile: 'Profile',
        },
        dashboard: {
            welcomeBack: 'Welcome back',
            keepTheFlow: 'Keep the flow going.',
            fuelingPotential: 'You are fueling your potential one meal at a time.',
            kcal: 'kcal',
            protein: 'Protein',
            carbs: 'Carbs',
            fats: 'Fats',
            logMeal: 'Log Meal',
            shareMyDay: 'Share My Day',
        },
        flowScore: {
            flowScore: 'Flow Score',
            optimized: 'Optimized',
            day: 'Day',
            week: 'Week',
            month: 'Month',
            insightText: 'Your consistency is up <b>+12%</b> this week. Peak flow achieved at 2 PM.',
            weeklyRhythm: 'Weekly Rhythm',
            consistency: 'Consistency',
            steady: 'Steady',
            metrics: 'Metrics',
            viewAll: 'View all',
            hydration: 'Hydration',
            energy: 'Energy',
        },
        foodGuide: {
            title: 'Food Guide',
            subtitle: 'Personalized suggestions for your energy.',
            heroTitle: 'Nutrition for\nyour Flow',
            heroSubtitle: 'Personalized suggestions for your energy.',
            economic: 'Economic',
            balanced: 'Balanced',
            premium: 'Premium',
            weeklyBudget: 'Weekly Budget',
            filteredByAi: 'Filtered by AI',
            proteins: 'Proteins',
            carbohydrates: 'Carbs',
            fatsLabel: 'Fats',
            aiInsightLabel: 'NURA AI Insight',
            aiInsightText: 'With the <b>Premium</b> profile active, we prioritize high bioavailability sources like wild salmon to optimize your cognition today.',
            insightEconomic: 'With <b>Economic</b> focus, we prioritize cost-effective high-protein sources: eggs, sardines, and rice with beans.',
            insightBalanced: 'With the <b>Balanced</b> profile, we combine cost-benefit with nutritional quality. Chicken, sweet potato, and avocado are your allies.',
            currentMeal: 'Current Meal',
            completed: 'Completed',
            complexCarbs: 'Complex',
            goodFats: 'Good',
            proteinGoal: 'Goal: 120g',
            swap: 'Swap',
            per100g: 'Per 100g',
            noFoods: 'No items found for this filter.',
            logThis: 'Log this food',
        },
        mealLogger: {
            title: 'NURA Assistant',
            online: 'Online',
            today: 'Today',
            describeMeal: 'Describe your meal...',
            addDetails: 'Add details...',
            speakMeal: 'Speak your meal...',
            listening: 'Listening...',
            analyzing: 'Analyzing your flow...',
            summary: 'Summary',
            kcalTotal: 'kcal total',
            confirm: 'Confirm',
            edit: 'Edit',
            cancel: 'Cancel',
            you: 'You',
            connectionError: "Having trouble connecting to the flow. Try again.",
            voiceNotSupported: 'Your browser does not support voice recognition. Use Chrome for better experience.',
            analysisIntro: 'Got it. Here is the nutritional analysis of your flow:',
            errorLogging: 'Error logging meal. Please try again.',
        },
        profile: {
            title: 'Profile',
            settings: 'Settings',
            myGoals: 'My Goals',
            integrations: 'Integrations',
            quarterlyAnalysis: 'Quarterly Analysis',
            language: 'Language',
            darkMode: 'Dark Mode',
            notifications: 'Notifications',
            about: 'About',
            logout: 'Logout',
            goals: {
                aesthetic: 'Aesthetic',
                health: 'Health',
                performance: 'Performance',
            },
        },
        social: {
            shareProgress: 'Share Progress',
            download: 'Download',
            copyLink: 'Copy Link',
            close: 'Close',
        },
        macros: {
            prot: 'Prot',
            carb: 'Carb',
            fat: 'Fat',
        },
        general: {
            back: 'Back',
            save: 'Save',
            next: 'Next',
            done: 'Done',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
        },
    },

    pt: {
        app: {
            name: 'NURA',
            slogan: 'Alimente o Flow',
        },
        nav: {
            home: 'Início',
            nutri: 'Nutri',
            log: 'Registrar',
            data: 'Dados',
            profile: 'Perfil',
        },
        dashboard: {
            welcomeBack: 'Bem-vindo de volta',
            keepTheFlow: 'Mantenha o flow.',
            fuelingPotential: 'Você está alimentando seu potencial uma refeição de cada vez.',
            kcal: 'kcal',
            protein: 'Proteína',
            carbs: 'Carboidratos',
            fats: 'Gorduras',
            logMeal: 'Registrar Refeição',
            shareMyDay: 'Compartilhar Meu Dia',
        },
        flowScore: {
            flowScore: 'Flow Score',
            optimized: 'Otimizado',
            day: 'Dia',
            week: 'Semana',
            month: 'Mês',
            insightText: 'Sua consistência aumentou <b>+12%</b> esta semana. Pico de flow às 14h.',
            weeklyRhythm: 'Ritmo Semanal',
            consistency: 'Consistência',
            steady: 'Estável',
            metrics: 'Métricas',
            viewAll: 'Ver tudo',
            hydration: 'Hidratação',
            energy: 'Energia',
        },
        foodGuide: {
            title: 'Guia de Alimentos',
            subtitle: 'Sugestões personalizadas para sua energia.',
            heroTitle: 'Nutrição para\\no seu Flow',
            heroSubtitle: 'Sugestões personalizadas para sua energia.',
            economic: 'Econômico',
            balanced: 'Equilibrado',
            premium: 'Premium',
            weeklyBudget: 'Budget Semanal',
            filteredByAi: 'Filtrado por IA',
            proteins: 'Proteínas',
            carbohydrates: 'Carboidratos',
            fatsLabel: 'Gorduras',
            aiInsightLabel: 'NURA AI Insight',
            aiInsightText: 'Com o perfil <b>Premium</b> ativo, priorizamos fontes de alta biodisponibilidade como salmão selvagem para otimizar sua cognição hoje.',
            insightEconomic: 'Com foco <b>Econômico</b>, priorizamos fontes de alta densidade proteica que cabem no bolso: ovos, sardinha e arroz com feijão.',
            insightBalanced: 'Com o perfil <b>Equilibrado</b>, combinamos custo-benefício com qualidade nutricional. Frango, batata doce e abacate são seus aliados.',
            currentMeal: 'Refeição Atual',
            completed: 'Concluído',
            complexCarbs: 'Complexos',
            goodFats: 'Boas',
            proteinGoal: 'Meta: 120g',
            swap: 'Trocar',
            per100g: 'Por 100g',
            noFoods: 'Nenhum item encontrado para este filtro.',
            logThis: 'Registrar este alimento',
        },
        mealLogger: {
            title: 'Assistente NURA',
            online: 'Online',
            today: 'Hoje',
            describeMeal: 'Descreva sua refeição...',
            addDetails: 'Adicione detalhes...',
            speakMeal: 'Fale sua refeição...',
            listening: 'Ouvindo...',
            analyzing: 'Analisando seu flow...',
            summary: 'Resumo',
            kcalTotal: 'kcal total',
            confirm: 'Confirmar',
            edit: 'Editar',
            cancel: 'Cancelar',
            you: 'Você',
            connectionError: 'Estou com dificuldade para conectar ao flow. Tente novamente.',
            voiceNotSupported: 'Seu navegador não suporta reconhecimento de voz. Use Chrome para melhor experiência.',
            analysisIntro: 'Entendido. Aqui está a análise nutricional do seu flow:',
            errorLogging: 'Erro ao registrar refeição. Tente novamente.',
        },
        profile: {
            title: 'Perfil',
            settings: 'Configurações',
            myGoals: 'Minhas Metas',
            integrations: 'Integrações',
            quarterlyAnalysis: 'Análise Trimestral',
            language: 'Idioma',
            darkMode: 'Modo Escuro',
            notifications: 'Notificações',
            about: 'Sobre',
            logout: 'Sair',
            goals: {
                aesthetic: 'Estética',
                health: 'Saúde',
                performance: 'Performance',
            },
        },
        social: {
            shareProgress: 'Compartilhar Progresso',
            download: 'Baixar',
            copyLink: 'Copiar Link',
            close: 'Fechar',
        },
        macros: {
            prot: 'Prot',
            carb: 'Carb',
            fat: 'Gord',
        },
        general: {
            back: 'Voltar',
            save: 'Salvar',
            next: 'Próximo',
            done: 'Concluído',
            loading: 'Carregando...',
            error: 'Erro',
            success: 'Sucesso',
        },
    },

    es: {
        app: {
            name: 'NURA',
            slogan: 'Alimenta el Flow',
        },
        nav: {
            home: 'Inicio',
            nutri: 'Nutri',
            log: 'Registrar',
            data: 'Datos',
            profile: 'Perfil',
        },
        dashboard: {
            welcomeBack: 'Bienvenido de nuevo',
            keepTheFlow: 'Mantén el flow.',
            fuelingPotential: 'Estás alimentando tu potencial una comida a la vez.',
            kcal: 'kcal',
            protein: 'Proteína',
            carbs: 'Carbohidratos',
            fats: 'Grasas',
            logMeal: 'Registrar Comida',
            shareMyDay: 'Compartir Mi Día',
        },
        flowScore: {
            flowScore: 'Flow Score',
            optimized: 'Optimizado',
            day: 'Día',
            week: 'Semana',
            month: 'Mes',
            insightText: 'Tu consistencia subió <b>+12%</b> esta semana. Pico de flow a las 2 PM.',
            weeklyRhythm: 'Ritmo Semanal',
            consistency: 'Consistencia',
            steady: 'Estable',
            metrics: 'Métricas',
            viewAll: 'Ver todo',
            hydration: 'Hidratación',
            energy: 'Energía',
        },
        foodGuide: {
            title: 'Guía de Alimentos',
            subtitle: 'Sugerencias personalizadas para tu energía.',
            heroTitle: 'Nutrición para\\ntu Flow',
            heroSubtitle: 'Sugerencias personalizadas para tu energía.',
            economic: 'Económico',
            balanced: 'Equilibrado',
            premium: 'Premium',
            weeklyBudget: 'Budget Semanal',
            filteredByAi: 'Filtrado por IA',
            proteins: 'Proteínas',
            carbohydrates: 'Carbohidratos',
            fatsLabel: 'Grasas',
            aiInsightLabel: 'NURA AI Insight',
            aiInsightText: 'Con el perfil <b>Premium</b> activo, priorizamos fuentes de alta biodisponibilidad como salmón salvaje para optimizar tu cognición hoy.',
            insightEconomic: 'Con enfoque <b>Económico</b>, priorizamos fuentes de alta densidad proteica accesibles: huevos, sardinas y arroz con frijoles.',
            insightBalanced: 'Con el perfil <b>Equilibrado</b>, combinamos costo-beneficio con calidad nutricional. Pollo, batata y aguacate son tus aliados.',
            currentMeal: 'Comida Actual',
            completed: 'Completado',
            complexCarbs: 'Complejos',
            goodFats: 'Buenas',
            proteinGoal: 'Meta: 120g',
            swap: 'Intercambiar',
            per100g: 'Por 100g',
            noFoods: 'No se encontraron items para este filtro.',
            logThis: 'Registrar este alimento',
        },
        mealLogger: {
            title: 'Asistente NURA',
            online: 'En línea',
            today: 'Hoy',
            describeMeal: 'Describe tu comida...',
            addDetails: 'Agrega detalles...',
            speakMeal: 'Habla tu comida...',
            listening: 'Escuchando...',
            analyzing: 'Analizando tu flow...',
            summary: 'Resumen',
            kcalTotal: 'kcal total',
            confirm: 'Confirmar',
            edit: 'Editar',
            cancel: 'Cancelar',
            you: 'Tú',
            connectionError: 'Tengo dificultades para conectar al flow. Intenta de nuevo.',
            voiceNotSupported: 'Tu navegador no soporta reconocimiento de voz. Usa Chrome para mejor experiencia.',
            analysisIntro: 'Entendido. Aquí está el análisis nutricional de tu flow:',
            errorLogging: 'Error al registrar comida. Intenta de nuevo.',
        },
        profile: {
            title: 'Perfil',
            settings: 'Configuración',
            myGoals: 'Mis Metas',
            integrations: 'Integraciones',
            quarterlyAnalysis: 'Análisis Trimestral',
            language: 'Idioma',
            darkMode: 'Modo Oscuro',
            notifications: 'Notificaciones',
            about: 'Acerca de',
            logout: 'Cerrar Sesión',
            goals: {
                aesthetic: 'Estética',
                health: 'Salud',
                performance: 'Rendimiento',
            },
        },
        social: {
            shareProgress: 'Compartir Progreso',
            download: 'Descargar',
            copyLink: 'Copiar Enlace',
            close: 'Cerrar',
        },
        macros: {
            prot: 'Prot',
            carb: 'Carb',
            fat: 'Grasa',
        },
        general: {
            back: 'Volver',
            save: 'Guardar',
            next: 'Siguiente',
            done: 'Hecho',
            loading: 'Cargando...',
            error: 'Error',
            success: 'Éxito',
        },
    },
};

// Language codes for Speech Recognition
export const speechLanguageCodes: Record<Language, string> = {
    en: 'en-US',
    pt: 'pt-BR',
    es: 'es-ES',
};
