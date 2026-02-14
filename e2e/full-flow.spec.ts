import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('shows the home screen with two options', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Anamnese' })).toBeVisible();
    await expect(page.getByText('Nova Anamnese')).toBeVisible();
    await expect(page.getByText('Importar JSON')).toBeVisible();
  });
});

test.describe('Form Flow', () => {
  test('completes full form flow: fill, review, export', async ({ page }) => {
    await page.goto('/');

    // Start new form
    await page.getByText('Nova Anamnese').click();

    // Step 0: Fill header data
    await expect(page.getByText('Dados do avaliado')).toBeVisible();
    await page.getByLabel('Nome do avaliado(a)').fill('Maria Teste');
    await page.getByLabel('Data de nascimento').fill('1990-05-15');
    await page.getByLabel('Idade em anos e meses').fill('35 anos e 9 meses');
    await page.getByLabel('Escolaridade').fill('Ensino Superior');
    await page.getByLabel('Gênero').fill('Feminino');

    // Go to step 1
    await page.getByRole('button', { name: 'Próximo' }).click();
    await expect(page.getByText('Histórico clínico e desenvolvimento')).toBeVisible();

    // Verify some anamnese questions are visible
    await expect(page.getByText('Nasceu de gestação planejada?')).toBeVisible();

    // Go to step 2 (TDAH)
    await page.getByRole('button', { name: 'Próximo' }).click();
    await expect(page.getByText('Rastreio para TDAH')).toBeVisible();

    // Select an option for TDAH question 1
    await expect(page.getByText('Tem dificuldade em prestar atenção a detalhes')).toBeVisible();
    await page.getByText('Frequentemente').first().click();

    // Go to step 3 (TEA)
    await page.getByRole('button', { name: 'Próximo' }).click();
    await expect(page.getByText('Rastreio para TEA')).toBeVisible();

    // Finish and go to review
    await page.getByRole('button', { name: 'Revisar e Finalizar' }).click();
    await expect(page.getByText('Revisão das Respostas')).toBeVisible();

    // Verify header data appears in review
    await expect(page.getByText('Maria Teste')).toBeVisible();

    // Check export buttons are visible
    await expect(page.getByRole('button', { name: 'Baixar PDF' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Exportar JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Copiar como Texto' })).toBeVisible();
  });

  test('navigates back between steps', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Nova Anamnese').click();

    // Fill required fields
    await page.getByLabel('Nome do avaliado(a)').fill('Teste');
    await page.getByLabel('Data de nascimento').fill('2000-01-01');
    await page.getByLabel('Idade em anos e meses').fill('25 anos');
    await page.getByLabel('Escolaridade').fill('Superior');
    await page.getByLabel('Gênero').fill('M');

    // Go forward to step 1
    await page.getByRole('button', { name: 'Próximo' }).click();
    await expect(page.getByText('Histórico clínico')).toBeVisible();

    // Go back to step 0
    await page.getByRole('button', { name: 'Voltar' }).click();
    await expect(page.getByText('Dados do avaliado')).toBeVisible();

    // Data should still be there
    await expect(page.getByLabel('Nome do avaliado(a)')).toHaveValue('Teste');
  });

  test('shows conditional fields when parent is SIM', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Nova Anamnese').click();

    // Go to anamnese step
    await page.getByRole('button', { name: 'Próximo' }).click();

    // Find "Possui Irmãos?" and click SIM
    const siblingSection = page.getByText('Possui Irmãos?').locator('..');
    await siblingSection.scrollIntoViewIfNeeded();
    await siblingSection.getByText('SIM').click();

    // Conditional field should appear
    await expect(page.getByText('Se sim, quantos?')).toBeVisible();
  });
});

test.describe('Review Page', () => {
  test('can go back to edit from review', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Nova Anamnese').click();

    // Fill minimal data and navigate to review
    await page.getByLabel('Nome do avaliado(a)').fill('Teste Review');
    await page.getByLabel('Data de nascimento').fill('2000-01-01');
    await page.getByLabel('Idade em anos e meses').fill('25');
    await page.getByLabel('Escolaridade').fill('Superior');
    await page.getByLabel('Gênero').fill('M');

    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByRole('button', { name: 'Revisar e Finalizar' }).click();

    await expect(page.getByText('Revisão das Respostas')).toBeVisible();

    // Go back to form
    await page.getByRole('button', { name: 'Editar Respostas' }).click();
    // Should be back on the form (step 0 - header data)
    await expect(page.getByLabel('Nome do avaliado(a)')).toHaveValue('Teste Review');
  });
});

test.describe('JSON Import', () => {
  test('import button triggers file input', async ({ page }) => {
    await page.goto('/');

    // The file input should exist but be hidden
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeHidden();

    // Clicking Import JSON button should be available
    await expect(page.getByText('Importar JSON')).toBeVisible();
  });
});

test.describe('Session Persistence', () => {
  test('preserves data after page reload', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Nova Anamnese').click();

    // Fill some data
    await page.getByLabel('Nome do avaliado(a)').fill('Persistência Teste');
    await page.getByLabel('Data de nascimento').fill('1995-06-20');
    await page.getByLabel('Idade em anos e meses').fill('30 anos');
    await page.getByLabel('Escolaridade').fill('Médio');
    await page.getByLabel('Gênero').fill('F');

    // Reload the page
    await page.reload();

    // Should still be on the form page with data preserved
    await expect(page.getByLabel('Nome do avaliado(a)')).toHaveValue('Persistência Teste');
    await expect(page.getByLabel('Escolaridade')).toHaveValue('Médio');
  });
});
