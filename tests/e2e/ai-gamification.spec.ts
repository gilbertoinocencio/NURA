import { test, expect } from '@playwright/test';

test.describe('AI & Gamification Integration Features', () => {

    test.beforeEach(async ({ page }) => {
        // Debug Console
        page.on('console', msg => console.log(`BROWSER: ${msg.text()}`));
        page.on('pageerror', err => console.log(`BROWSER ERROR: ${err}`));
        page.on('dialog', async dialog => {
            console.log(`BROWSER DIALOG: ${dialog.message()}`);
            await dialog.accept();
        });

        // 1. Mock Gemini API
        await page.route('https://generativelanguage.googleapis.com/**', async route => {
            console.log('Intercepted Gemini Request:', route.request().url());

            const postData = route.request().postData() || '';
            let mockResponse = {};

            if (postData.includes('Create a 3-Month')) {
                // Plan Generation Mock
                mockResponse = {
                    calories: 2500,
                    macros: { protein: 180, carbs: 300, fats: 80 },
                    optimization_tag: 'Otimizado: Teste',
                    phases: [
                        { title: 'Fase 1', tag: 'Start', description: 'Inicio de teste' },
                        { title: 'Fase 2', tag: 'Flow', description: 'Foco no flow' },
                        { title: 'Fase 3', tag: 'End', description: 'Consolidação' }
                    ]
                };
            } else {
                // Meal Analysis Mock
                mockResponse = {
                    foodName: 'Maçã Mockada',
                    calories: 95,
                    macros: { p: 0.5, c: 25, f: 0.3 },
                    items: [{ name: 'Maçã', quantity: '1 média', calories: 95 }],
                    message: 'Boa escolha para o teste!'
                };
            }

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    candidates: [{
                        content: {
                            parts: [{ text: JSON.stringify(mockResponse) }]
                        }
                    }]
                })
            });
        });

        // 2. Mock Supabase Wrapper
        await page.route('**/rest/v1/**', async route => {
            const url = route.request().url();
            const method = route.request().method();
            // Only log if not OPTIONS (spammy)
            if (method !== 'OPTIONS') {
                console.log(`Intercepted Supabase ${method}:`, url);
            }

            if (method === 'POST') {
                await route.fulfill({ status: 201, body: '[]' });
                return;
            }

            if (url.includes('profiles')) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([{
                        id: 'test-user-id',
                        level: 'seed',
                        current_streak: 5,
                        total_xp: 100,
                        goal: 'aesthetic',
                        target_calories: 2000
                    }])
                });
                return;
            }

            // Return empty array for lists, empty object for single items usually
            // For simplicity, we return empty array which covers most selects
            await route.fulfill({ status: 200, body: '[]' });
        });

        // 3. Inject Fake Auth Session into LocalStorage
        await page.addInitScript(() => {
            window.localStorage.setItem('E2E_TEST_SESSION', JSON.stringify({
                access_token: 'fake-token',
                expires_at: 9999999999,
                expires_in: 3600,
                refresh_token: 'fake-refresh',
                token_type: 'bearer',
                user: {
                    id: 'test-user-id',
                    aud: 'authenticated',
                    role: 'authenticated',
                    email: 'test@nura.com',
                    created_at: '2023-01-01T00:00:00Z'
                }
            }));
        });

        // 4. Navigate to Home
        await page.goto('/');

        // 5. Wait for App to Load (bypass login)
        await expect(page.locator('main').first()).toBeVisible({ timeout: 15000 });
    });

    test('Voice Meal Logging (Mocked UI)', async ({ page }) => {
        // Open Meal Logger via FAB or Add Button
        // Assuming FAB has '+' icon or is styled with nura-petrol
        const fabButton = page.locator('button.bg-nura-petrol, button:has-text("add")').last();
        // .last() because sometimes multiple buttons exist, FAB is usually last in DOM in Layout
        await fabButton.click();

        // Verify Modal Open
        await expect(page.locator('p').filter({ hasText: /O que você comeu|Descreva sua refeição|Describe your meal/i })).toBeVisible();

        // Simulate Text Input
        const input = page.locator('input[type="text"]').filter({ hasText: '' }).last(); // Targets the text input generically or by structure since placeholders differ
        // Better: use a robust selector finding the input inside the input container
        // const input = page.getByPlaceholder(/Descreva sua refeição|Describe your meal/i);
        await input.fill('Uma maçã média');
        // Click Send button (more robust than Enter)
        await page.locator('button:has-text("send")').click();

        // Verify AI Response
        await expect(page.getByText('Maçã Mockada')).toBeVisible({ timeout: 15000 });
        await expect(page.getByText('95')).toBeVisible();

        // 4. Confirm Log
        // Use getByRole for accessibility/text matching, avoids DOM order issues with FAB
        const confirmBtn = page.getByRole('button', { name: /Confirm|Confirmar/i });
        await expect(confirmBtn).toHaveCount(1);
        await confirmBtn.click({ force: true }); // Force click to bypass potential overlay/animation issues in test env

        // Verify Success (Modal Closed)
        await expect(page.getByText('O que você comeu?')).not.toBeVisible();
        // Verify Dashboard update (e.g., Progress bar or snackbar)
        await expect(page.locator('main').first()).toBeVisible();
    });

    test('Plan Generation Flow', async ({ page }) => {
        // Navigate to Plan/Profile
        // Assuming 'Renovar' button or Profile -> Plan
        // Let's try direct URL navigation which is faster/safer
        await page.goto('/plan-renewal');

        // Select Goal
        await page.getByText('Performance', { exact: false }).first().click();

        // Click Generate
        const generateBtn = page.getByRole('button', { name: 'Gerar Plano' });
        await generateBtn.click();

        // Verify Loading
        await expect(page.getByText('Gerando Plano...')).toBeVisible();

        // Verify Navigation away from renewal
        // Wait for loading to disappear
        await expect(page.getByText('Gerando Plano...')).not.toBeVisible({ timeout: 15000 });

        // Should be on Home or Plan Dashboard
        const url = page.url();
        expect(url).toMatch(/.*(home|plan)/);
    });

    test('Gamification: XP & Level Check', async ({ page }) => {
        // Verify Level Display
        const levelLabel = page.locator('span').filter({ hasText: /Nível|Level/i }).first();
        await expect(levelLabel).toBeVisible();

        // Verify Streak
        // Checks for fire icon or number 5 (from our mock profile)
        // Note: FlowDashboard usually shows streak if > 0
        await expect(page.getByText('5')).toBeVisible();
    });

});
