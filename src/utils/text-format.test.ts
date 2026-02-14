import { describe, it, expect } from 'vitest';
import { formatAsText } from './text-format';
import { defaultFormData } from './defaults';
import type { FullFormData } from '../types/form';

describe('formatAsText', () => {
  it('returns a string starting with ANAMNESE', () => {
    const text = formatAsText(defaultFormData);
    expect(text.startsWith('ANAMNESE')).toBe(true);
  });

  it('includes header field values', () => {
    const data: FullFormData = {
      ...defaultFormData,
      anamnese: { ...defaultFormData.anamnese, patientName: 'Maria Silva', education: 'Superior' },
    };
    const text = formatAsText(data);
    expect(text).toContain('Maria Silva');
    expect(text).toContain('Superior');
  });

  it('marks selected SIM/NÃO options with (X)', () => {
    const data: FullFormData = {
      ...defaultFormData,
      anamnese: { ...defaultFormData.anamnese, plannedPregnancy: 'SIM' },
    };
    const text = formatAsText(data);
    expect(text).toContain('(X) SIM');
    expect(text).toContain('(  ) NÃO');
  });

  it('marks selected TDAH frequency option with (X)', () => {
    const data: FullFormData = {
      ...defaultFormData,
      tdah: { ...defaultFormData.tdah, tdah1: 'Frequentemente' },
    };
    const text = formatAsText(data);
    expect(text).toContain('(X) Frequentemente');
    expect(text).toContain('(  ) Nunca / Raramente');
  });

  it('marks selected TEA option with (X)', () => {
    const data: FullFormData = {
      ...defaultFormData,
      tea: { ...defaultFormData.tea, tea1: 'Sim' },
    };
    const text = formatAsText(data);
    expect(text).toContain('(X) Sim');
  });

  it('includes TDAH and TEA sections', () => {
    const text = formatAsText(defaultFormData);
    expect(text).toContain('Rastreio para TDAH');
    expect(text).toContain('RASTREIO PARA TEA');
  });

  it('includes TEA sub-section labels', () => {
    const text = formatAsText(defaultFormData);
    expect(text).toContain('A. Déficits na comunicação social e interação');
    expect(text).toContain('B. Comportamentos repetitivos e interesses restritos');
    expect(text).toContain('C. Desenvolvimento e padrão de comportamento');
  });
});
