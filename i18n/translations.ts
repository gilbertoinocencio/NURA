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
        feed: string;
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
            feed: 'Feed',
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
            feed: 'Feed',
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
            feed: 'Feed',
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
